import { XIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { getUserProfile } from "../Slices/userAction";
import { sendMassageAgain, userVerify } from "../api/userApi";
import { useDispatch } from "react-redux";
import { authPending, authFail } from "../Slices/authSlice";
import { useRouter } from "next/router";

function NewValid({ userEmail, setIsValid, setIsError, isError }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userTFO, setUserTFO] = useState("");

  const reSendMessage = async () => {
    await sendMassageAgain({ email: userEmail });
  };

  const verification = async (e) => {
    e.preventDefault();
    if (userTFO.length === 6) {
      try {
        dispatch(authPending());
        const verify = await userVerify({
          email: userEmail,
          key: userTFO,
        });
        localStorage.setItem("token", verify.accessToken);
        localStorage.setItem("userID", verify._id);
        dispatch(getUserProfile());
        router.push("/");
      } catch (error) {
        dispatch(authFail("הקוד שהזנת שגוי או פג תוקפו"));
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
    } else {
      e.preventDefault();
      dispatch(authFail("בעיה עם הקוד"));
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 5000);
    }
  };

  const returnBut = () => {
    setIsValid(false);
    dispatch(authFail("בחרת לצאת מהאימות"));
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  };

  return (
    <div className="absolute top-0 w-full h-full bg-per/80 grid grid-rows-18 grid-cols-1 justify-center backdrop-blur-[4px]">
      <div className="relative w-full mt-4 h-full col-start-1 row-start-3 row-span-16 flex flex-col items-center space-y-[32px] xl:flex-row-reverse xl:row-start-1 xl:row-span-18 xl:mt-0 xl:space-y-0">
        <div className="w-full h-min space-y-[32px] flex flex-col">
          <p className="text-[30px] text-center md:text-[50px] text-white xl:mt-10">
            אימות
          </p>
          <form
            className={`w-full h-max space-y-[32px] flex flex-col items-center`}
          >
            <input
              type="text"
              onChange={(e) => setUserTFO(e.target.value)}
              value={userTFO}
              placeholder="....הכניסו את הקוד כאן"
              className={`w-[92%] h-[63px] rounded-[5px] text-right px-3 placeholder-black/60 shadow-25 md:w-[75%]`}
            />
            <p className="text-center text-white w-[92%] self-center tracking-[0.3em] md:text-[24px] xl:w-[75%] xl:text-right">
              בזה הרגע נשלח אלייכם למייל קוד אימות, הכניסו אותו בזריזות מפני
              שהקוד הוא זמני!
              <br></br>במידה והקוד אינו עובד לחצו על הכפתור “קוד חדש” כדי שנישלח
              קוד זמני חדש.
            </p>
            <div className="w-full h-max space-y-[32px] flex flex-col items-center justify-center md:flex-row-reverse md:space-y-0 md:px-[4%] md:justify-between xl:flex-row xl:justify-start xl:space-x-[40px] xl:px-[12.5%]">
              <div
                onClick={(e) => verification(e)}
                className="w-[70%] bg-white h-[63px] rounded-t-[5px] flex items-center justify-center tracking-[0.3em] cursor-pointer md:w-[35%] md:rounded-none md:rounded-l-[5px] xl:rounded-none xl:rounded-r-[5px]"
              >
                <p>כניסה</p>
              </div>
              <div
                onClick={() => reSendMessage()}
                className="w-[70%] bg-white h-[42px] flex items-center justify-center tracking-[0.3em] cursor-pointer md:h-[63px] md:rounded-[5px] md:w-[20%] xl:rounded-none xl:rounded-l-[5px]"
              >
                <p className="pointer-events-none">קוד חדש</p>
              </div>
              <div
                onClick={() => returnBut()}
                className="w-[70%] bg-black/60 text-white h-[63px] rounded-b-[5px] flex items-center justify-center tracking-[0.3em] cursor-pointer md:w-[35%] md:rounded-none md:rounded-r-[5px] xl:absolute xl:w-[193px] xl:h-[193px] xl:rounded-full xl:top-[45%] xl:left-40 xl:flex-col"
              >
                <XIcon className="hidden xl:block xl:w-[50px] pointer-events-none" />
                <p className="xl:text-center xl:font-bold pointer-events-none">
                  יציאה משלב האימות
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden xl:block w-[55%]"></div>
      </div>
    </div>
  );
}

export default NewValid;
