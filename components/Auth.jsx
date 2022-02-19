import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authPending, authSuccess, authFail } from "../Slices/authSlice";
import { getUserProfile, getUserVerified } from "../Slices/userAction";
import { userLogin, userRegister } from "../api/userApi";
import { useSelector, useDispatch } from "react-redux";

function Auth({ acces }) {
  const [userFullName, setFullName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userTFO, setUserTFO] = useState("");
  const [login, setLogin] = useState(true);
  const [authP, setAuthP] = useState(false);

  const { error, isAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSumbit = async (e) => {
    e.preventDefault();
    dispatch(authPending());
    if (login) {
      try {
        await userLogin({ fullName: userFullName, email: userEmail });
        setAuthP(true);
        //
        /*acces(false);*/
      } catch (error) {
        console.log(error);
        dispatch(authFail("הפרטים המזהים אינם נכונים"));
      }
      return;
    } else {
      try {
        await userRegister({ fullName: userFullName, email: userEmail });
        setAuthP(true);
      } catch (error) {
        console.log(error);
        dispatch(authFail("האימייל כבר קיים במערכת"));
      }
      return;
    }
  };

  const verification = (event) => {
    event.preventDefault();
    if (userTFO.length === 6) {
      try {
        dispatch(getUserVerified(userEmail, userTFO));
      } catch (error) {
        console.log(error);
        dispatch(authFail("תקלה עם הנתונים"));
      }
    }
  };

  useEffect(() => {
    if (isAuth) {
      acces(false);
    }
  }, [isAuth]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        scale: { type: "spring", stiffness: 100 },
      }}
      className={`${
        login ? "text-yellow-col" : "text-white"
      } z-50 backdrop-blur-sm overflow-hidden absolute top-0 bg-opacity-90 text-yellow-col text-center bg-black w-full h-full grid grid-rows-6 grid-cols-1 pointer-events-auto`}
    >
      <p className="font-bold tracking-widest row-start-2 col-start-1 text-xl">
        {login ? "התחברות" : "הרשמה"}
      </p>
      <p className="row-start-2 col-start-1 self-center">
        ההרשמה לאתר היא כדי לספק אך ורק לכם
      </p>
      <p className="row-start-2 col-start-1 self-center pt-12">
        גישה לאזור האישי אז תזכרו את הפרטים
      </p>
      <p className="row-start-2 col-start-1 self-end pb-2">שאתם ממלאים</p>
      <form
        method="post"
        onSubmit={(e) => handleSumbit(e)}
        className="row-start-4 row-span-2 col-start-1 w-full h-full grid grid-rows-4"
      >
        <div className="row-start-1 row-span-2 col-start-1 flex flex-col text-black bg-white w-2/3 sm:w-72 justify-self-center h-3/4 rounded-3xl z-10">
          <div className="w-full h-1/2 flex">
            <input
              value={userFullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="focus:outline-none text-right ml-4 sm:ml-7 bg-transparent h-7 self-center w-40 border-b border-black"
            />
            <label className="self-center pl-2">:שם מלא</label>
          </div>
          <div className="w-full h-1/2 flex">
            <input
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="focus:outline-none ml-4 sm:ml-7 bg-transparent h-7 self-center w-40 border-b border-black"
            />
            <label className="self-center pl-3">:אימייל</label>
          </div>
        </div>
        <button
          className={`${
            login
              ? "bg-yellow-col text-black border-black"
              : "bg-cyan-700 text-white border-white"
          } row-start-4 col-start-1 w-full font-bold tracking-widest border-t-2 border-b-2 h-10 z-10`}
        >
          {login ? "התחבר" : "הרשם"}
        </button>
        <p
          onClick={() => setLogin(!login)}
          className={`${
            login ? "bg-yellow-col text-black" : "bg-cyan-600 text-white"
          } col-start-1 row-start-4 self-end text-sm text-white cursor-pointer w-max px-5 rounded-lg justify-self-center`}
        >
          {login
            ? "אין לך משתמש? לחץ כאן להרשמה"
            : "יש לי כבר משתמש. לחץ כאן להתחברות"}
        </p>
      </form>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 90 }}
          transition={{
            y: { type: "spring", stiffness: 60 },
          }}
          className="flex flex-row items-center justify-center col-start-1 row-start-4 w-72 rounded-lg justify-self-center h-10 self-end mb-14 border-2 border-black bg-red-600 z-20 shadow-try2"
        >
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              scale: { type: "spring", stiffness: 30 },
            }}
            className="font-bold tracking-widest text-black"
          >
            {error}
          </motion.p>
        </motion.div>
      )}
      <div
        className={`${
          login
            ? "bg-yellow-col text-black border-black"
            : "bg-cyan-700 text-white border-white"
        } opacity-0 sm:opacity-100 absolute top-0 right-20 col-start-1 w-10 border-l-2 border-r-2 h-full`}
      ></div>
      {authP && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="opacity-0 absolute bg-black bg-opacity-70 w-full h-screen z-10 flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              y: { type: "spring", stiffness: 70 },
              opacity: { type: "spring", stiffness: 70 },
            }}
            className="opacity-0 relative w-[300px] h-[500px] bg-white rounded-1 text-black grid grid-rows-3 justify-center"
          >
            <div className="text-4xl row-start-1 col-start-1 self-center">
              <h1>אימות</h1>
            </div>
            <form
              action="post"
              className="pt-4 row-start-1 row-span-2 col-start-1 self-center flex flex-col w-full items-center my-5"
            >
              <input
                type="number"
                maxLength={6}
                value={userTFO}
                placeholder="הקוד לכאן"
                onChange={(e) => setUserTFO(e.target.value)}
                className="shadow-1 bg-yellow-col w-5/6 h-10 rounded-lg text-center placeholder-white tracking-widest text-lg text-white"
              />
              <motion.button
                animate={
                  userTFO.length === 6
                    ? { backgroundColor: "#FFA800" }
                    : { backgroundColor: "rgb(209 213 219)" }
                }
                onClick={verification}
                className="shadow-1 absolute bottom-10 rounded-2 w-[150px] h-[30px] bg-gray-300 text-lg text-white tracking-widest"
              >
                כניסה
              </motion.button>
            </form>
            <p className="row-start-2 col-start-1 self-center pb-16 text-sm text-yellow-col">
              הקוד לא עובד או שלא קיבלת?{" "}
              <span className="underline font-bold">שלח שוב</span>
            </p>
            <div className="text-lg row-start-2 row-span-2 col-start-1 self-center pb-4">
              <p>ברגע זה נשלח אלייך</p>
              <p>לאימייל הודעה עם קוד לצורך</p>
              <p>אימות המשתמש שלך באתר</p>
              <p>יש לך בערך שלוש דקות</p>
              <p>עד שהקוד כבר לא יהיה ניתן לשימוש</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Auth;
