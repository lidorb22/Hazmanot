import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { authPending, authFail } from "../Slices/authSlice";
import { getUserProfile } from "../Slices/userAction";
import {
  userLogin,
  userRegister,
  sendMassageAgain,
  userVerify,
} from "../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import WebLogo from "../vectors/webLogo.svg";

function Auth({ acces }) {
  const [windowWidth, setWindowWidth] = useState(500);
  const [userFullName, setFullName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userTFO, setUserTFO] = useState("");
  const [login, setLogin] = useState(true);
  const [authP, setAuthP] = useState(false);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const { error, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [errorTrigger, setErrorTrigger] = useState(false);
  const [errorTip, setErrorTip] = useState(null);
  const [timerInf, setTimerInf] = useState(null);

  const errorFunc = (errorText) => {
    let timer;
    if (errorTrigger) {
      clearTimeout(timerInf);
      setErrorTrigger(false);
      setTimeout(() => {
        setErrorTrigger(true);
        setErrorTip(`${errorText}`);
      }, 2500);
    } else {
      setErrorTrigger(true);
      setErrorTip(`${errorText}`);
    }
    timer = setTimeout(() => {
      setErrorTrigger(false);
    }, 15500);
    setTimerInf(timer);
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    dispatch(authPending());
    if (userFullName === "" || userEmail === "") {
      dispatch(authFail("חסרים אחד או יותר משדות המילוי"));
      errorFunc(
        `נא וודאו כי כל שדות המילוי מלאים, אחר כך לחצו על ${
          login ? "התחבר" : "הרשם"
        }`
      );
      return;
    }
    if (login) {
      try {
        await userLogin({ fullName: userFullName, email: userEmail });
        setAuthP(true);
      } catch (error) {
        dispatch(authFail("הפרטים המזהים אינם נכונים"));
        errorFunc(`נא וודאו כי הפרטים שהכנסתם הם אותם הפרטים שאיתם נרשמתם`);
      }
      return;
    } else {
      try {
        await userRegister({ fullName: userFullName, email: userEmail });
        setAuthP(true);
      } catch (error) {
        dispatch(authFail("משתמש עם אימייל זה כבר קיים במערכת"));
        errorFunc(`מסתבר שלאימייל זה כבר קיים משתמש נסו אימייל אחר או התחברו`);
      }
      return;
    }
  };

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
        acces(false);
      } catch (error) {
        dispatch(authFail("הקוד שהזנת שגוי או פג תוקפו"));
        errorFunc(`לחצו על "קוד אימות חדש" ונסו שוב`);
      }
    } else {
      e.preventDefault();
      dispatch(authFail("בעיה עם הקוד"));
      errorFunc(`קוד האימות חייב להכיל 6 מספרים`);
    }
  };

  useEffect(() => {
    handleResize();
    if (isAuth) {
      acces(false);
    }
  }, [isAuth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        scale: { type: "spring", stiffness: 100 },
      }}
      className={`z-50 backdrop-blur-sm overflow-hidden absolute top-0 text-center bg-black/60 w-full h-full grid grid-rows-6 grid-cols-1 pointer-events-auto`}
    >
      <p className="font-bold row-start-2 col-start-1 text-[40px] self-start text-white md:text-[72px] md:row-start-1 md:self-end 2xl:row-start-2 2xl:self-start">
        כניסה לאתר
      </p>
      <form
        method="post"
        onSubmit={(e) => handleSumbit(e)}
        className="z-10 row-start-1 row-span-6 col-start-1 w-full h-full flex flex-col items-center justify-center"
      >
        <div className="relative flex flex-col justify-center space-y-8 text-black bg-white w-[325px] justify-self-center h-[290px] rounded-3xl mb-32 md:mb-48 md:w-[620px] md:h-[355px] 2xl:w-[690px] 2xl:mb-0">
          <div className=" w-full h-max flex items-center justify-center relative">
            <input
              value={userFullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="focus:outline-none w-[250px] h-[40px] text-center rounded-lg border-2 border-black shadow-1 md:w-[530px] md:h-[50px]"
            />
            <label className="absolute -top-4 right-12 bg-white px-2 border-2 border-black rounded-lg md:text-[20px] md:-top-5 md:right-14 2xl:right-24">
              שמך המלא
            </label>
          </div>
          <div className="w-full h-max flex items-center justify-center relative">
            <input
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="focus:outline-none w-[250px] h-[40px] text-center rounded-lg border-2 border-black shadow-1 md:w-[530px] md:h-[50px]"
            />
            <label className="absolute -top-4 right-12 bg-white px-2 border-2 border-black rounded-lg md:text-[20px] md:-top-5 md:right-14 2xl:right-24">
              כתובת אימייל
            </label>
          </div>
          <div className="w-[250px] md:w-[530px] self-center flex">
            <button
              className={`w-[130px] self-start font-bold tracking-widest text-[24px] bg-gray-600 h-[50px] rounded-xl text-white shadow-1 z-10`}
            >
              {login ? "התחבר" : "הרשם"}
            </button>
          </div>
          <p
            onClick={() => setLogin(!login)}
            className={`z-10 absolute -bottom-20 text-[24px] text-white cursor-pointer w-full font-bold`}
          >
            {login ? "אין לך משתמש? " : "כבר יש לך משתמש? "}
            <span className="underline">{login ? "הירשם" : "התחבר"}</span>
          </p>
        </div>
      </form>
      <div className="w-full absolute bottom-[10px] flex justify-center">
        <img
          alt=""
          src={WebLogo}
          style={{
            filter: "brightness(0) invert(1)",
          }}
          className="w-[180px]"
        />
      </div>
      <div className="relative col-start-1 tracking-[0.2em] row-start-5 row-span-2 w-full h-full flex items-center justify-center 2xl:row-start-2 2xl:row-span-4 2xl:justify-start">
        <motion.div
          animate={
            errorTrigger && windowWidth >= 1536
              ? { height: "355px", y: "0px", width: "243px", opacity: 1 }
              : errorTrigger && windowWidth < 1536 && windowWidth >= 768
              ? { height: "129px", x: "0px", width: "477px", opacity: 1 }
              : errorTrigger && windowWidth < 768
              ? { height: "129px", x: "0px", width: "83.333333%", opacity: 1 }
              : !errorTrigger && windowWidth >= 1536
              ? { height: "0px", y: "-169px", width: "243px", opacity: 0 }
              : !errorTrigger && windowWidth < 1536 && windowWidth >= 768
              ? {
                  x: "-169px",
                  width: "0px",
                  height: "129px",
                  opacity: 0,
                }
              : !errorTrigger &&
                windowWidth < 768 && {
                  height: "129px",
                  x: windowWidth / -2 + 15,
                  width: "0%",
                  opacity: 0,
                }
          }
          transition={
            errorTrigger && windowWidth >= 1536
              ? {
                  height: { duration: 1.5 },
                  y: { duration: 1.5 },
                }
              : errorTrigger && windowWidth < 1536
              ? {
                  width: { duration: 1.5 },
                  x: { duration: 1.5 },
                }
              : !errorTrigger && windowWidth >= 1536
              ? {
                  height: { delay: 0.8, duration: 1.1 },
                  y: { delay: 0.8, duration: 1.1 },
                  opacity: { delay: 1.5 },
                }
              : !errorTrigger && windowWidth < 1536 && windowWidth >= 768
              ? {
                  width: { delay: 0.8, duration: 1.1 },
                  x: { delay: 0.8, duration: 1.1 },
                  opacity: { delay: 1.5 },
                }
              : !errorTrigger &&
                windowWidth < 768 && {
                  width: { delay: 0.8, duration: 1.1 },
                  x: { delay: 0.8, duration: 1.1 },
                  opacity: { delay: 1.5 },
                }
          }
          className={`${
            authP ? "z-[50]" : ""
          } opacity-0 w-[337px] h-[129px] bg-[#FF0000] rounded-xl mb-20 md:w-[477px] 2xl:w-[243px] 2xl:h-[355px] 2xl:mb-0 2xl:ml-44`}
        >
          <div className="w-full h-full px-3 text-white flex items-center justify-around 2xl:flex-col-reverse 2xl:text-[20px]">
            <motion.p
              animate={errorTrigger ? { opacity: 1 } : { opacity: 0 }}
              transition={
                errorTrigger ? { delay: 1, duration: 1 } : { duration: 0.7 }
              }
              className="text-center w-[137px] break-word md:w-[211px] leading-[18px] 2xl:leading-[23px]"
            >
              {errorTip}
            </motion.p>
            <motion.div
              animate={
                errorTrigger && windowWidth >= 1536
                  ? { opacity: 1, y: "0px", scale: 1 }
                  : errorTrigger && windowWidth < 1536
                  ? { opacity: 1, x: "0px", scale: 1 }
                  : !errorTrigger && windowWidth >= 1536
                  ? { opacity: 0, y: "169px", scale: 1.3 }
                  : !errorTrigger &&
                    windowWidth < 1536 && { opacity: 0, x: "-169px", scale: 1 }
              }
              transition={
                errorTrigger && windowWidth >= 1536
                  ? {
                      y: { delay: 1, duration: 1 },
                      opacity: { delay: 0.5, duration: 1 },
                      scale: { delay: 0.9, duration: 0.6 },
                    }
                  : errorTrigger && windowWidth < 1536
                  ? {
                      x: { delay: 1, duration: 1 },
                      opacity: { delay: 0.5, duration: 1 },
                      scale: { delay: 0.9, duration: 0.6 },
                    }
                  : !errorTrigger && windowWidth >= 1536
                  ? {
                      y: { duration: 1 },
                      opacity: { delay: 0.5, duration: 1 },
                      scale: { delay: 0.5, duration: 0.6 },
                    }
                  : !errorTrigger &&
                    windowWidth < 1536 && {
                      x: { duration: 1 },
                      opacity: { delay: 0.5, duration: 1 },
                      scale: { delay: 0.5, duration: 0.6 },
                    }
              }
              className="w-[166px] h-[104px] rounded-xl bg-[#AC0000] shadow-1 md:w-[222px] 2xl:h-[189px]"
            >
              <motion.div
                animate={errorTrigger ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  errorTrigger ? { delay: 1, duration: 1 } : { duration: 1 }
                }
                className="w-full h-full flex flex-col"
              >
                <p className="font-bold underline text-[24px] 2xl:text-[36px]">
                  שגיאה
                </p>
                <div className="w-full h-full flex items-center justify-center">
                  <p className="break-word md:w-[211px] leading-[18px] 2xl:leading-[23px]">
                    {error}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
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
            className="opacity-0 relative w-[300px] h-[500px] bg-white rounded-2xl text-black grid grid-rows-3 justify-center"
          >
            <div className="text-4xl row-start-1 col-start-1 self-center">
              <h1>אימות</h1>
            </div>
            <form
              action="post"
              className="row-start-1 row-span-2 col-start-1 self-center flex flex-col w-full items-center my-5"
            >
              <div className="w-full h-max flex items-center justify-center relative">
                <input
                  type="number"
                  maxLength={6}
                  value={userTFO}
                  onChange={(e) => setUserTFO(e.target.value)}
                  className="focus:outline-none w-[250px] h-[40px] text-center rounded-lg border-2 border-black shadow-1"
                />
                <label className="absolute -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg ">
                  קוד האימות שלך
                </label>
              </div>
              <button
                onClick={(e) => verification(e)}
                className={`w-[130px] absolute bottom-5 self-center font-bold tracking-widest text-[24px] bg-gray-600 h-[50px] rounded-xl text-white shadow-1 z-10`}
              >
                התחבר
              </button>
            </form>
            <div className="row-start-2 col-start-1 self-center pb-16 text-sm text-yellow-col">
              <p
                onClick={() => reSendMessage()}
                className="cursor-pointer tracking-widest text-gray-500 font-bold text-[16px]"
              >
                קוד אימות חדש
              </p>
            </div>
            <div className="text-lg row-start-2 row-span-2 col-start-1 self-center pb-4">
              <p>ברגע זה נשלח אלייך</p>
              <p>לאימייל הודעה עם קוד לצורך</p>
              <p>אימות המשתמש שלך באתר</p>
              <p>יש לך מספר דקות</p>
              <p>עד שהקוד כבר לא יהיה ניתן לשימוש</p>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div className="absolute top-20 left-0 w-[50px] h-[35px] md:w-[115px] 2xl:w-[120px] 2xl:h-[120px] 2xl:left-20">
        <div
          onClick={() => acces(false)}
          className="bg-white w-full h-full rounded-r-lg flex items-center justify-center md:flex-row-reverse md:justify-around md:px-2 2xl:rounded-full 2xl:flex-col 2xl:justify-center"
        >
          <p className="pointer-events-none absolute opacity-0 md:opacity-100 md:static md:font-bold md:text-[24px]">
            בחזרה
          </p>
          <ArrowLeftIcon className="pointer-events-none h-[20px] text-black" />
        </div>
      </div>
    </motion.div>
  );
}

export default Auth;
