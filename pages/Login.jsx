import React, { useEffect, useState } from "react";
import NewMenu from "../components/Menu";
import { motion } from "framer-motion";
import NewValid from "../components/Valid";
import { useDispatch, useSelector } from "react-redux";
import { authPending, authFail } from "../Slices/authSlice";
import { userLogin, userRegister } from "../api/userApi";
import { useRouter } from "next/router";

function Login() {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    var localUser = localStorage.getItem("userID");
    var localToken = localStorage.getItem("token");
    if (isAuth) {
      router.push("/");
    }
    if (localUser && localToken) {
      try {
        dispatch(getUserProfile());
      } catch (error) {
        console.log(error);
      }
    }
  }, [isAuth]);

  const [isRegister, setIsRegister] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showInput, setSowInput] = useState(false);
  const [showGenderList, setSowGenderList] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isValid, setIsValid] = useState(false);

  const clearAllStates = () => {
    setName("");
    setLastName("");
    setEmail("");
    setGender("");
    setBirthDate("");
    setSowInput(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(authPending());
    if (!isRegister) {
      if (name === "" || email === "") {
        dispatch(authFail("חסרים אחד או יותר משדות המילוי"));
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
        return;
      }
      if (!email.match("@")) {
        dispatch(authFail("חסרים אחד או יותר משדות המילוי"));
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
        return;
      }
      try {
        await userLogin({ fullName: name, email });
        setIsValid(true);
      } catch (error) {
        dispatch(authFail("הפרטים המזהים אינם נכונים"));
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
      return;
    } else {
      if (
        name === "" ||
        email === "" ||
        lastName === "" ||
        birthDate === "" ||
        gender === ""
      ) {
        dispatch(authFail("חסרים אחד או יותר משדות המילוי"));
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
        return;
      }
      var fullName = name + " " + lastName;
      var fixedDate = birthDate.split("-").reverse().join("/");
      try {
        await userRegister({ fullName, email, gender, birthDate: fixedDate });
        setIsValid(true);
      } catch (error) {
        dispatch(authFail("משתמש עם אימייל זה כבר קיים במערכת"));
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
      return;
    }
  };

  return (
    <div className="w-full h-screen relative bg-[#EFA332] font-rubik">
      <NewMenu place="user" isError={isError} />
      <div className="w-full h-full overflow-y-auto grid grid-rows-18 grid-cols-1 justify-center relative md:overflow-hidden">
        {/* First section */}

        <div className="relative w-full mt-4 h-full col-start-1 row-start-3 row-span-16 flex flex-col items-center space-y-[32px] xl:flex-row-reverse xl:row-start-1 xl:row-span-18 xl:mt-0 xl:space-y-0">
          <div className="w-full h-min space-y-[32px]">
            <p className="text-[30px] text-center md:text-[50px]">
              {isRegister ? "הרשמה" : "התחברות"}
            </p>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className={`${
                isRegister ? "xl:space-y-[30px]" : "md:space-y-[51px]"
              } w-full h-full space-y-[18px] flex flex-col items-center`}
            >
              <div
                className={`flex ${
                  isRegister ? "flex-row-reverse" : "flex-row"
                } w-[92%] h-[63px] justify-between md:w-[75%]`}
              >
                <input
                  type="text"
                  placeholder={isRegister ? "....שם פרטי" : "....שם מלא"}
                  onChange={(e) => setName(e.target.value)}
                  value={isRegister ? lastName : name}
                  className={`${
                    isRegister ? "w-[48%]" : "w-full"
                  }  h-full rounded-[5px] text-right px-3 placeholder-black/60 shadow-25`}
                />
                <input
                  type="text"
                  placeholder="....שם משפחה"
                  onChange={(e) => setLastName(e.target.value)}
                  value={name}
                  className={`${
                    isRegister ? "block" : "hidden"
                  }  w-[48%] h-full rounded-[5px] text-right px-3 placeholder-black/60 shadow-25`}
                />
              </div>
              <div
                className={`flex ${
                  isRegister ? "flex-row-reverse" : "flex-row"
                } w-[92%] h-[63px] justify-between md:w-[75%]`}
              >
                <div
                  className={`${
                    isRegister ? "w-[48%] relative" : "w-full"
                  } h-full`}
                >
                  <input
                    type={isRegister ? "date" : "email"}
                    placeholder={isRegister ? "" : "....אימייל"}
                    onChange={(e) =>
                      isRegister
                        ? setBirthDate(e.target.value)
                        : setEmail(e.target.value)
                    }
                    onFocus={() => isRegister && setSowInput(true)}
                    onBlur={() => !birthDate && setSowInput(false)}
                    value={isRegister ? birthDate : email}
                    className={`w-full h-full min-w-full rounded-[5px] text-right px-3 placeholder-black/60 shadow-25`}
                  />
                  <motion.div
                    animate={showInput ? { opacity: 0 } : { opacity: 1 }}
                    className={`${
                      isRegister ? "flex" : "hidden"
                    } w-full h-full absolute top-0 bg-white rounded-[5px] text-right flex items-center px-3 text-black/60 pointer-events-none`}
                  >
                    <p className="w-full">....תאריך לידה</p>
                  </motion.div>
                </div>
                <div
                  className={`${
                    isRegister ? "block" : "hidden"
                  } w-[48%] relative`}
                >
                  <input
                    type="text"
                    placeholder="....מין"
                    readOnly
                    onFocus={() => setSowGenderList(true)}
                    onBlur={() =>
                      setTimeout(() => {
                        setSowGenderList(false);
                      }, 400)
                    }
                    value={gender}
                    className={`w-full h-full rounded-[5px] text-right px-3 placeholder-black/60 shadow-25 `}
                  />
                  <motion.div
                    animate={
                      showGenderList
                        ? { height: "126px", opacity: 1, pointerEvents: "auto" }
                        : { height: "0px", opacity: 0, pointerEvents: "none" }
                    }
                    transition={
                      showGenderList
                        ? {
                            opacity: { duration: 0 },
                            height: { type: "spring" },
                          }
                        : { opacity: { delay: 0.1, duration: 0.2 } }
                    }
                    className=" w-full h-[126px] bg-per-a absolute rounded-b-[5px] flex flex-col items-center justify-evenly text-white tracking-[0.3em]"
                  >
                    <motion.p
                      className="cursor-pointer"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setGender("גבר")}
                    >
                      גבר
                    </motion.p>
                    <motion.p
                      className="cursor-pointer"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setGender("אישה")}
                    >
                      אישה
                    </motion.p>
                  </motion.div>
                </div>
              </div>
              <input
                type="email"
                placeholder="....אימייל"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={`${
                  isRegister ? "block" : "hidden"
                }  w-[92%] h-[63px] rounded-[5px] text-right px-3 placeholder-black/60 shadow-25 md:w-[75%]`}
              />
              <motion.button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                whileHover={{ scale: 1.2 }}
                className="cursor-pointer w-[211px] h-[63px] self-start ml-[4%] flex items-center justify-center bg-per text-white shadow-25 rounded-[5px] tracking-[0.3em] md:ml-[12.5%]"
              >
                {isRegister ? "הרשמה" : "כניסה"}
              </motion.button>
            </form>
          </div>
          <div
            className={`absolute bottom-0 py-8 h-max w-full bg-per md:rounded-t-[35px] xl:w-[55%] xl:h-full xl:rounded-none xl:static xl:flex xl:items-center xl:justify-center`}
          >
            <div
              className={`${
                isRegister ? "space-y-[15px]" : "space-y-[32px]"
              } h-max w-full text-white flex flex-col items-center justify-center xl:w-fit xl:border-r-4 xl:border-white/60 xl:px-3 xl:space-y-[55px]`}
            >
              <p className="text-[30px] border-t-4 border-white/60 w-[92%] text-center pt-2 md:border-t-0 md:pt-0 md:text-[50px] xl:w-max">
                {isRegister ? "?כבר יש לך משתמש" : "?עדיין לא רשום"}
              </p>
              <p
                className={`${
                  isRegister && "hidden"
                } w-[86vw] text-center xl:w-[30vw]`}
              >
                אז למה בעצם כדאי להירשם?
                <br></br> אנחנו מציעים לכם את האפשרות הכי נוחה ליצור הזמנות
                אישיות ומעוצבות
                <br></br> ובכך להזמין את כל מי שאתם מכירים בלחיצת כפרות מבלי
                לצאת מהבית!
              </p>
              <p
                className={`${
                  !isRegister && "hidden"
                } w-[86vw] text-center xl:w-[30vw]`}
              >
                תלחצו על הכפתור למטה
                <br></br> ותתחילו להיות בשליטה על האירועים שלכם!
              </p>
              <motion.div
                onClick={() => {
                  setIsRegister(!isRegister);
                  clearAllStates();
                }}
                whileHover={{ scale: 1.2 }}
                className="bg-white cursor-pointer text-black shadow-25 w-[92%] h-[65px] rounded-[5px] flex items-center justify-center tracking-[0.3em] md:w-[335px]"
              >
                <p className="pointer-events-none">
                  {isRegister ? "לחץ כאן כדי להיתחבר" : "לחץ כאן כדי להירשם"}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div
          animate={
            isValid
              ? { display: "block", opacity: 1 }
              : { display: "none", opacity: 0 }
          }
          className="absolute top-0 w-full h-full hidden opacity-0"
        >
          <NewValid
            userEmail={email}
            setIsValid={setIsValid}
            setIsError={setIsError}
            isError={isError}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
