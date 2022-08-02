import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { getUserClear } from "../Slices/userSlice";
import { inviteClear } from "../Slices/inviteSlice";
import { authClear } from "../Slices/authSlice";

function ErrorSystem() {
  const dispatch = useDispatch();
  const { aError } = useSelector((state) => state.auth);
  const { iError } = useSelector((state) => state.invite);
  const { uError } = useSelector((state) => state.user);
  const [errorArr, setErrorArr] = useState([]);
  const [errorIndex, setErrorIndex] = useState(0);
  useEffect(() => {
    if (aError !== "" || iError !== "" || uError !== "") {
      setErrorIndex(errorIndex + 1);
      if (aError) {
        setErrorArr([...errorArr, aError]);

        dispatch(authClear());
      }
    }
  }, [aError, iError, uError]);

  console.log(errorArr);

  return (
    <motion.div
      layout="position"
      className="absolute pointer-events-none bottom-[30px] z-[100] flex flex-col w-full h-max flex items-center gap-[10px] md:top-0 md:flex-col-reverse md:w-[450px] md:max-h-screen md:overflow-hidden md:pt-[100px]"
    >
      {errorArr.map((error, index) => (
        <motion.div
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 2.5 }}
          key={index}
          className="bg-[#E42B2B] text-center text-white rounded-[5px] shadow-25 w-[92%] h-max break-word tracking-[0.3em] flex flex-col items-center justify-center py-[10px] md:w-full"
        >
          <ExclamationCircleIcon className="w-[40px]" />
          <p>{error}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ErrorSystem;
