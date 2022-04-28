import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { newInvite } from "../api/inviteApi";
import { invitePending, inviteLink, inviteFail } from "../Slices/inviteSlice";
import { EyeIcon } from "@heroicons/react/solid";
import { getUserProfile } from "../Slices/userAction";
import WebLogo from "../vectors/webLogo.svg";
import Template from "../components/Template";
import Head from "next/head";

function Create() {
  const [windowWidth, setWindowWidth] = useState(500);
  const { isAuth, error } = useSelector((state) => state.auth);
  const { _id, fullName } = useSelector((state) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    var localUser = localStorage.getItem("userID");
    var localToken = localStorage.getItem("token");
    if (isAuth) {
      return;
    }
    if (error === "invalid token" || (!localUser && !localToken)) {
      return router.push("/");
    }
    try {
      dispatch(getUserProfile());
    } catch (error) {
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isSelected, setIsSelected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [isTamplateWatched, setTamplateWatched] = useState(false);
  const [errorTrigger, setErrorTrigger] = useState(false);
  const [errorWas, setErrorWas] = useState(false);
  const [errorMessege, setErrorMessege] = useState("");
  const [invRison, setQName] = useState("default");
  const [names, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [backgroundCol, setBackgroundCol] = useState("#FFA800");
  const [textCol, setTextCol] = useState("rgb(0 0 0)");
  const [fillsCol, setFillsCol] = useState("rgb(255 255 255)");
  const [titleText, setTitleText] = useState(
    "הנכם מוזמנים לחגוג אימנו את אירוע"
  );

  const selectionAction = {
    open: { y: -180 },
    closed: { y: 0 },
  };

  const qnaAction = {
    open: { opacity: 1, scale: 1, pointerEvents: "auto" },
    closed: { opacity: 0, scale: 0.7, pointerEvents: "none" },
  };

  const submitButtHandler = (e) => {
    switch (invRison) {
      case "Bday":
        if (
          names !== "" &&
          age !== "" &&
          place !== "" &&
          time !== "" &&
          date !== ""
        ) {
          if (e.target.id === "tamplateButt") {
            setShowTemplate(true);
            setTamplateWatched(true);
            return;
          }
          if (
            isTamplateWatched === false &&
            errorWas === false &&
            windowWidth < 1536
          ) {
            e.preventDefault();
            setErrorTrigger(true);
            setErrorWas(true);
            setErrorMessege(
              "אתה בטוח שברצונך להמשיך בלי לראות איך ההזמנה נראת"
            );
            return;
          }
        } else {
          e.preventDefault();
        }
        break;
      case "Hatona":
      case "Hina":
      case "Bar":
      case "Bat":
        if (names !== "" && place !== "" && time !== "" && date !== "") {
          if (e.target.id === "tamplateButt") {
            setShowTemplate(true);
            setTamplateWatched(true);
            return;
          }
          if (
            isTamplateWatched === false &&
            errorWas === false &&
            windowWidth < 1536
          ) {
            e.preventDefault();
            setErrorTrigger(true);
            setErrorWas(true);
            setErrorMessege(
              "אתה בטוח שברצונך להמשיך בלי לראות איך ההזמנה נראת"
            );
            return;
          }
        } else {
          e.preventDefault();
        }
        break;
      case "Brit":
        if (place !== "" && time !== "" && date !== "") {
          if (e.target.id === "tamplateButt") {
            setShowTemplate(true);
            setTamplateWatched(true);
            return;
          }
          if (
            isTamplateWatched === false &&
            errorWas === false &&
            windowWidth < 1536
          ) {
            e.preventDefault();
            setErrorTrigger(true);
            setErrorWas(true);
            setErrorMessege(
              "אתה בטוח שברצונך להמשיך בלי לראות איך ההזמנה נראת"
            );
            return;
          }
        } else {
          e.preventDefault();
        }
        break;
      default:
        e.preventDefault();
        break;
    }
  };

  function selectionE(e) {
    setQName(e.target.value);
    setName("");
    setAge("");
    setDate("");
    setPlace("");
    setTime("");
    if (e.target.value !== "default") {
      setIsSelected(true);
      setIsRefreshing(false);
      setTimeout(() => {
        setIsRefreshing(true);
      }, 600);
      return;
    }
    if (isSelected) {
      setIsSelected(false);
      setIsRefreshing(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(invitePending());
    var fixedDate = date.split("-").reverse().join("-");
    try {
      const invite = await newInvite({
        invRison,
        names,
        age,
        place,
        time,
        date: fixedDate,
        _id,
        background: backgroundCol,
        text: textCol,
        fills: fillsCol,
        title: titleText,
      });
      dispatch(inviteLink(invite));
      router.push("/Links");
    } catch (error) {
      console.log(error);
      dispatch(inviteFail("תקלה ביצירת המודעה"));
    }
  }

  const errorHandler = (e) => {
    if (e.target.id === "accept" || e.target.id === "accept2") {
      setErrorTrigger(false);
      setShowTemplate(true);
      setTamplateWatched(true);
    } else if (e.target.id === "exit") {
      setErrorTrigger(false);
      handleSubmit(e);
    }
  };

  const qnaOBJ = {
    default: "",
    Bday: {
      first: ":שם החוגג/ת",
      second: ":מיקום ושם האולם",
      third: ":הוספת שעות האירוע",
      forth: ":גיל החוגג/ת",
      five: ":תאריך האירוע",
      type: {
        f: "text",
        s: "text",
        t: "time",
        fo: "number",
        fiv: "date",
      },
      names: {
        f: "name",
        s: "place",
        t: "time",
        fo: "age",
        fiv: "date",
      },
    },
    Hatona: {
      first: ":שמות הזוג המאושר",
      second: ":מיקום ושם האולם",
      third: ":הוספת שעות האירוע",
      forth: ":תאריך האירוע",
      type: {
        f: "text",
        s: "text",
        t: "time",
        fo: "date",
      },
      names: {
        f: "name",
        s: "place",
        t: "time",
        fo: "date",
      },
    },
    Hina: {
      first: ":שמות הזוג המאושר",
      second: ":מיקום ושם האולם",
      third: ":הוספת שעות האירוע",
      forth: ":תאריך האירוע",
      type: {
        f: "text",
        s: "text",
        t: "time",
        fo: "date",
      },
      names: {
        f: "name",
        s: "place",
        t: "time",
        fo: "date",
      },
    },
    Bar: {
      first: ":שם הבוגר",
      second: ":מיקום ושם האולם",
      third: ":הוספת שעות האירוע",
      forth: ":תאריך האירוע",
      type: {
        f: "text",
        s: "text",
        t: "time",
        fo: "date",
      },
      names: {
        f: "name",
        s: "place",
        t: "time",
        fo: "date",
      },
    },
    Bat: {
      first: ":שם החוגגת",
      second: ":מיקום ושם האולם",
      third: ":הוספת שעות האירוע",
      forth: ":תאריך האירוע",
      type: {
        f: "text",
        s: "text",
        t: "time",
        fo: "date",
      },
      names: {
        f: "name",
        s: "place",
        t: "time",
        fo: "date",
      },
    },
    Brit: {
      first: ":מיקום ושם האולם",
      second: ":הוספת שעות האירוע",
      third: ":תאריך האירוע",
      type: {
        f: "text",
        s: "time",
        t: "date",
      },
      names: {
        f: "place",
        s: "time",
        t: "date",
      },
    },
  };

  return (
    <div
      className={`${
        windowWidth >= 1536
          ? "bg-gradient-to-r from-white to-yellow-col/80"
          : "bg-yellow-col"
      } h-screen w-full relative flex text-white flex-col font-sans overflow-hidden`}
    >
      <Head>
        <title>יצירת הזמנה</title>
        <meta name="title" content="יצירת הזמנה" />
        <meta
          name="description"
          content="יצירת הזמנה יחודית ומעוצבת משלכם ואתם היחידים ששולטים בעיצוב"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hazmanot.netlify.app/" />
        <meta property="og:title" content="יצירת הזמנה" />
        <meta
          property="og:description"
          content="יצירת הזמנה יחודית ומעוצבת משלכם ואתם היחידים ששולטים בעיצוב"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hazmanot.netlify.app/" />
        <meta property="twitter:title" content="יצירת הזמנה" />
        <meta
          property="twitter:description"
          content="יצירת הזמנה יחודית ומעוצבת משלכם ואתם היחידים ששולטים בעיצוב"
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />
      </Head>
      <Menu Page="Invite" />
      <img
        alt=""
        src={WebLogo}
        style={{
          filter: "brightness(0) invert(1)",
        }}
        className="w-[80px] absolute bottom-[10px] left-[10px] md:w-[180px] 2xl:opacity-0 pointer-events-none"
      />
      <img
        alt=""
        src={WebLogo}
        style={{
          filter: "brightness(0) invert(1)",
        }}
        className="w-[180px] absolute bottom-[10px] right-[10px] opacity-0 pointer-events-none 2xl:opacity-100 2xl:pointer-events-auto"
      />
      <div className="h-full grid grid-cols-1 grid-rows-1 text-center">
        <div className="h-full w-full row-start-1 col-start-1 grid grid-rows-6 grid-cols-1 2xl:grid-cols-2">
          <p className="font-bold text-[40px] col-start-1 row-start-1 row-span-2 self-center md:text-[72px] md:mb-16 2xl:self-end 2xl:col-start-2">
            יצירת האירוע
          </p>
          {/* event selection */}
          <motion.p
            animate={
              isSelected ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }
            }
            transition={
              isSelected
                ? {
                    duration: 0.8,
                  }
                : {
                    duration: 1.2,
                  }
            }
            className="text-[20px] tracking-widest font-bold col-start-1 row-start-3 self-center pb-4 md:text-[48px] md:self-center md:row-start-2 md:row-span-2 2xl:row-start-3 2xl:self-start 2xl:mt-8 2xl:col-start-2"
          >
            ?מהו סוג האירוע
          </motion.p>
          <form
            method="post"
            onSubmit={(e) => handleSubmit(e)}
            className="z-20 row-start-2 row-span-5 col-start-1 w-full h-full grid grid-rows-6  2xl:col-start-2"
          >
            <motion.select
              animate={isSelected ? "open" : "closed"}
              variants={selectionAction}
              transition={{
                duration: 1,
              }}
              onChange={(e) => selectionE(e)}
              className="text-center text-lg text-black font-bold row-start-3 col-start-1 focus:outline-none shadow-1 bg-white rounded-t-2xl w-[280px] h-[50px] justify-self-center md:w-[538px] md:h-[75px] md:row-start-2 md:self-end 2xl:self-start 2xl:row-start-3"
            >
              <option value="default"></option>
              <option value="Bday">יום הולדת</option>
              <option value="Hatona">חתונה</option>
              <option value="Hina">חינה</option>
              <option value="Bar">בר מצווה</option>
              <option value="Bat">בת מצווה</option>
              <option value="Brit">ברית</option>
            </motion.select>
            <motion.p
              animate={
                isSelected
                  ? { opacity: 0, scale: 0.7 }
                  : { opacity: 1, scale: 1 }
              }
              transition={
                isSelected
                  ? {
                      duration: 0.8,
                    }
                  : {
                      duration: 1.2,
                    }
              }
              className="row-start-4 col-start-1 leading-[179.99%] w-[328px] justify-self-center md:text-[40px] md:w-[633px] md:leading-[52px] md:row-start-4 md:row-span-2 md:self-center"
            >
              {fullName}, כאן תוכל לראות וליצור את ההזמנה האישית לאירוע שלך
              ולבסוף תקבל מאיתנו קישור להזמנה שלך
            </motion.p>
            {/* QNA */}
            <div className="pointer-events-none relative row-start-2 row-span-4 col-start-1 w-full h-full py-2 flex flex-col text-black 2xl:mt-8">
              <motion.div
                animate={isRefreshing ? "open" : "closed"}
                variants={qnaAction}
                transition={{
                  scale: { type: "spring", bounce: 1, stiffness: 30 },
                  opacity: { type: "spring", bounce: 1, stiffness: 100 },
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                }}
                className="pointer-events-none flex flex-col items-center justify-evenly h-full"
              >
                {invRison != "default" && (
                  <>
                    <div className="w-[320px] h-[40px] flex items-center justify-center relative md:h-[50px] md:w-[557px]">
                      <input
                        name={qnaOBJ[invRison].names.f}
                        onChange={
                          invRison === "Brit"
                            ? (e) => setPlace(e.target.value)
                            : (e) => setName(e.target.value)
                        }
                        value={invRison === "Brit" ? place : names}
                        type={qnaOBJ[invRison].type.f}
                        className="cursor-pointer focus:outline-none w-full h-full px-2 text-right rounded-lg border-2 border-black shadow-1"
                      />
                      <label className="absolute text-black -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg md:text-[20px]">
                        {qnaOBJ[invRison].first}
                      </label>
                    </div>
                    <div className="w-[320px] h-[40px] flex items-center justify-center relative md:h-[50px] md:w-[557px]">
                      <input
                        name={qnaOBJ[invRison].names.s}
                        onChange={
                          invRison === "Brit"
                            ? (e) => setTime(e.target.value)
                            : (e) => setPlace(e.target.value)
                        }
                        value={invRison === "Brit" ? time : place}
                        type={qnaOBJ[invRison].type.s}
                        className="cursor-pointer focus:outline-none w-full h-full px-2 text-right rounded-lg border-2 border-black shadow-1"
                      />
                      <label className="absolute text-black -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg md:text-[20px]">
                        {qnaOBJ[invRison].second}
                      </label>
                    </div>
                    <div className="w-[320px] h-[40px] flex items-center justify-center relative md:h-[50px] md:w-[557px]">
                      <input
                        name={qnaOBJ[invRison].names.t}
                        onChange={
                          invRison === "Brit"
                            ? (e) => setDate(e.target.value)
                            : (e) => setTime(e.target.value)
                        }
                        value={invRison === "Brit" ? date : time}
                        type={qnaOBJ[invRison].type.t}
                        className="cursor-pointer focus:outline-none w-full h-full px-2 text-right rounded-lg border-2 border-black shadow-1"
                      />
                      <label className="absolute text-black -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg md:text-[20px]">
                        {qnaOBJ[invRison].third}
                      </label>
                    </div>
                    {qnaOBJ[invRison].forth != undefined && (
                      <div className="w-[320px] h-[40px] flex items-center justify-center relative md:h-[50px] md:w-[557px]">
                        <input
                          name={qnaOBJ[invRison].names.fo}
                          onChange={
                            invRison === "Bday"
                              ? (e) => setAge(e.target.value)
                              : (e) => setDate(e.target.value)
                          }
                          value={invRison === "Bday" ? age : date}
                          type={qnaOBJ[invRison].type.fo}
                          className="cursor-pointer focus:outline-none w-full h-full px-2 text-right rounded-lg border-2 border-black shadow-1"
                        />
                        <label className="absolute text-black -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg md:text-[20px]">
                          {qnaOBJ[invRison].forth}
                        </label>
                      </div>
                    )}
                    {qnaOBJ[invRison].five != undefined && (
                      <div className="w-[320px] h-[40px] flex items-center justify-center relative md:h-[50px] md:w-[557px]">
                        <input
                          name={qnaOBJ[invRison].names.fiv}
                          onChange={(e) => setDate(e.target.value)}
                          value={date}
                          type={qnaOBJ[invRison].type.fiv}
                          className="cursor-pointer focus:outline-none w-full h-full px-2 text-right rounded-lg border-2 border-black shadow-1"
                        />
                        <label className="absolute text-black -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg md:text-[20px]">
                          {qnaOBJ[invRison].five}
                        </label>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
              <motion.button
                animate={
                  isSelected
                    ? { opacity: 1, pointerEvents: "auto" }
                    : { opacity: 0, pointerEvents: "none" }
                }
                type="submit"
                onClick={(e) => submitButtHandler(e)}
                className={`w-[162px] pointer-events-none opacity-0 self-center font-bold tracking-widest bg-gray-600 h-[23px] rounded-md text-white shadow-1 md:w-[290px] md:h-[50px] md:text-[32px]`}
              >
                יצירת הזמנה
              </motion.button>
              <motion.div
                animate={
                  isSelected && windowWidth < 1536
                    ? { opacity: 1, pointerEvents: "auto" }
                    : { opacity: 0, pointerEvents: "none" }
                }
                id="tamplateButt"
                onClick={(e) => submitButtHandler(e)}
                className="w-[145px] h-[20px] text-white pointer-events-none opacity-0 self-center mt-8 flex justify-around items-center md:w-[250px] cursor-pointer"
              >
                <p className="pointer-events-none md:text-[24px]">
                  צפייה בהזמנה
                </p>
                <EyeIcon className="w-[15px] pointer-events-none md:w-[30px]" />
              </motion.div>
            </div>
          </form>
          <Template
            closeEvent={setShowTemplate}
            windowWidth={windowWidth}
            eventBool={showTemplate}
            pName={names}
            age={age}
            place={place}
            date={date}
            time={time}
            eventName={invRison}
            setBackgroundCol={setBackgroundCol}
            setTextCol={setTextCol}
            setFillsCol={setFillsCol}
            setTitleText={setTitleText}
          />

          <motion.div
            animate={
              errorTrigger
                ? { opacity: 1, pointerEvents: "auto" }
                : { opacity: 0, pointerEvents: "none" }
            }
            className="opacity-0 absolute top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-sm flex flex-col justify-center items-center z-50 space-y-3"
          >
            <motion.div
              animate={errorTrigger ? { scale: 1 } : { scale: 0.7 }}
              className="w-4/6 h-[400px] p-3 bg-[#FF0000] shadow-1 rounded-xl flex flex-col items-center md:w-[251px]"
            >
              <p className="font-bold underline text-[40px]">אזהרה</p>
              <p className="text-[20px] w-[200px] leading-[39px]">
                אתה בטוח שברצונך להמשיך לשלב הסופי של יצירת ההזמנה בלי לראות איך
                היא נראת? אם תלחץ על “המשך” לא יהיה ניתן לשנות אותה אחר כך{" "}
              </p>
              <div className="w-full h-full flex relative">
                <div
                  onClick={(e) => errorHandler(e)}
                  id="accept"
                  className="w-[56px] z-10 h-[56px] bg-[#AC0000] rounded-full self-end shadow-1 flex items-center justify-center"
                >
                  <EyeIcon className="w-[30px] pointer-events-none" />
                </div>
                <div
                  onClick={(e) => errorHandler(e)}
                  id="accept2"
                  className="w-[157px] h-[26px] text-[20px] bg-[#AC0000] rounded-r-md bottom-0 left-9 absolute"
                >
                  <p className="pointer-events-none">צפייה בהזמנה</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={errorTrigger ? { scale: 1 } : { scale: 0.7 }}
              className="pt-20"
            >
              <p
                onClick={(e) => errorHandler(e)}
                id="exit"
                className="text-[40px]"
              >
                המשך
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Create;
