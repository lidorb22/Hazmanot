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
import Template from "../components/Template";
import Head from "next/head";

function Create() {
  const { isAuth, error } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
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

  const variants = {
    firstLoad: { opacity: 1, scale: 1 },
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
          if (isTamplateWatched === false && errorWas === false) {
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
          if (isTamplateWatched === false && errorWas === false) {
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
          if (isTamplateWatched === false && errorWas === false) {
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

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(invitePending());
    try {
      const invite = await newInvite({
        invRison,
        names,
        age,
        place,
        time,
        date,
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
    if (e.target.id === "accept") {
      setErrorTrigger(false);
      setShowTemplate(true);
      setTamplateWatched(true);
    } else if (e.target.id === "exit") {
      setErrorTrigger(false);
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
    <div className="h-screen flex flex-col font-sans overflow-hidden">
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
      <div
        className="h-2/6 flex flex-col 
            justify-center align-center text-center z-10
            "
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={"firstLoad"}
          variants={variants}
          className="shadow-try space-y-2 w-5/6 px-10 h-max grid bg-yellow-col self-center rounded-2xl mb-3 md:py-8"
        >
          <p className="tracking-widest font-bold text-2xl">יצירת האירוע</p>
          <p className="">כעת תצרו את המודעה שלכם אל תשכחו</p>
          <p className="">להוסיף את כל הפרטים כדי שהמוזמנים ידעו</p>
          <p className="">!למה הם מצפים</p>
        </motion.div>
      </div>
      <div className="h-full grid grid-cols-1 grid-rows-1 text-center">
        <div className="h-full w-full row-start-1 col-start-1 grid grid-rows-6 grid-cols-1">
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
            className="text-lg tracking-widest text-yellow-col font-bold col-start-1 row-start-2 self-center md:self-start"
          >
            ?מהו סוג האירוע
          </motion.p>
          <form
            method="post"
            onSubmit={(e) => handleSubmit(e)}
            className="z-20 row-start-1 row-span-6 col-start-1 w-full h-full grid grid-rows-6"
          >
            <motion.select
              animate={isSelected ? "open" : "closed"}
              variants={selectionAction}
              transition={{
                duration: 1,
              }}
              onChange={(e) => selectionE(e)}
              className="text-center text-lg font-bold row-start-3 col-start-1 focus:outline-none shadow-lg bg-gray-100 rounded-t-2xl border-b-4 border-yellow-col w-2/3 h-2/3 justify-self-center md:w-80 md:row-start-2 md:self-end"
            >
              <option value="default"></option>
              <option value="Bday">יום הולדת</option>
              <option value="Hatona">חתונה</option>
              <option value="Hina">חינה</option>
              <option value="Bar">בר מצווה</option>
              <option value="Bat">בת מצווה</option>
              <option value="Brit">ברית</option>
            </motion.select>
            {/* QNA */}
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
              className="pointer-events-none row-start-2 row-span-4 col-start-1 flex flex-col items-center justify-evenly self-center h-5/6"
            >
              {invRison != "default" && (
                <>
                  <label>{qnaOBJ[invRison].first}</label>
                  <input
                    name={qnaOBJ[invRison].names.f}
                    onChange={
                      invRison === "Brit"
                        ? (e) => setPlace(e.target.value)
                        : (e) => setName(e.target.value)
                    }
                    value={invRison === "Brit" ? place : names}
                    type={qnaOBJ[invRison].type.f}
                    className="w-2/3 bg-transparent border-b-2 border-black focus:outline-none md:w-2/6 text-center focus:text-center"
                  />
                  <label>{qnaOBJ[invRison].second}</label>
                  <input
                    name={qnaOBJ[invRison].names.s}
                    onChange={
                      invRison === "Brit"
                        ? (e) => setTime(e.target.value)
                        : (e) => setPlace(e.target.value)
                    }
                    value={invRison === "Brit" ? time : place}
                    type={qnaOBJ[invRison].type.s}
                    className="w-2/3 bg-transparent border-b-2 border-black focus:outline-none md:w-2/6 text-center focus:text-center"
                  />
                  <label>{qnaOBJ[invRison].third}</label>
                  <input
                    name={qnaOBJ[invRison].names.t}
                    onChange={
                      invRison === "Brit"
                        ? (e) => setDate(e.target.value)
                        : (e) => setTime(e.target.value)
                    }
                    value={invRison === "Brit" ? date : time}
                    type={qnaOBJ[invRison].type.t}
                    className="w-2/3 bg-transparent border-b-2 border-black focus:outline-none md:w-2/6 text-center focus:text-center"
                  />
                </>
              )}
              {qnaOBJ[invRison].forth != undefined && (
                <>
                  <label>{qnaOBJ[invRison].forth}</label>
                  <input
                    name={qnaOBJ[invRison].names.fo}
                    onChange={
                      invRison === "Bday"
                        ? (e) => setAge(e.target.value)
                        : (e) => setDate(e.target.value)
                    }
                    value={invRison === "Bday" ? age : date}
                    type={qnaOBJ[invRison].type.fo}
                    className="w-2/3 bg-transparent border-b-2 border-black focus:outline-none md:w-2/6 text-center focus:text-center"
                  />
                </>
              )}
              {qnaOBJ[invRison].five != undefined && (
                <>
                  <label>{qnaOBJ[invRison].five}</label>
                  <input
                    name={qnaOBJ[invRison].names.fiv}
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    type={qnaOBJ[invRison].type.fiv}
                    className="w-2/3 bg-transparent border-b-2 border-black focus:outline-none md:w-2/6 text-center focus:text-center"
                  />
                </>
              )}
            </motion.div>
            <motion.button
              animate={
                invRison === "Bday" &&
                names !== "" &&
                age !== "" &&
                time !== "" &&
                date !== "" &&
                place !== ""
                  ? { backgroundColor: "#FFA800" }
                  : invRison === "Hatona" &&
                    names !== "" &&
                    time !== "" &&
                    date !== "" &&
                    place !== ""
                  ? { backgroundColor: "#FFA800" }
                  : invRison === "Hina" &&
                    names !== "" &&
                    time !== "" &&
                    date !== "" &&
                    place !== ""
                  ? { backgroundColor: "#FFA800" }
                  : invRison === "Bar" &&
                    names !== "" &&
                    time !== "" &&
                    date !== "" &&
                    place !== ""
                  ? { backgroundColor: "#FFA800" }
                  : invRison === "Bat" &&
                    names !== "" &&
                    time !== "" &&
                    date !== "" &&
                    place !== ""
                  ? { backgroundColor: "#FFA800" }
                  : invRison === "Brit" &&
                    time !== "" &&
                    date !== "" &&
                    place !== ""
                  ? { backgroundColor: "#FFA800" }
                  : { backgroundColor: "rgb(209 213 219)" }
              }
              type="submit"
              onClick={submitButtHandler}
              className="absolute bottom-8 right-0 text-lg font-bold w-full text-center h-10 bg-yellow-col border-t-2 border-b-2 border-black md:bottom-40"
            >
              המשך
            </motion.button>
          </form>
          <motion.div
            animate={
              invRison === "default"
                ? { width: "5rem", height: "5rem", opacity: 0 }
                : invRison === "Bday" &&
                  names !== "" &&
                  age !== "" &&
                  time !== "" &&
                  date !== "" &&
                  place !== ""
                ? { backgroundColor: "#FFA800", width: "5rem", height: "5rem" }
                : invRison === "Hatona" &&
                  names !== "" &&
                  time !== "" &&
                  date !== "" &&
                  place !== ""
                ? { backgroundColor: "#FFA800", width: "5rem", height: "5rem" }
                : invRison === "Hina" &&
                  names !== "" &&
                  time !== "" &&
                  date !== "" &&
                  place !== ""
                ? { backgroundColor: "#FFA800", width: "5rem", height: "5rem" }
                : invRison === "Bar" &&
                  names !== "" &&
                  time !== "" &&
                  date !== "" &&
                  place !== ""
                ? { backgroundColor: "#FFA800", width: "5rem", height: "5rem" }
                : invRison === "Bat" &&
                  names !== "" &&
                  time !== "" &&
                  date !== "" &&
                  place !== ""
                ? { backgroundColor: "#FFA800", width: "5rem", height: "5rem" }
                : invRison === "Brit" &&
                  time !== "" &&
                  date !== "" &&
                  place !== ""
                ? { backgroundColor: "#FFA800", width: "5rem", height: "5rem" }
                : {
                    backgroundColor: "rgb(209 213 219)",
                    width: "5rem",
                    height: "5rem",
                  }
            }
            id="tamplateButt"
            onClick={submitButtHandler}
            className="absolute bottom-4 left-0 rounded-r-xl shadow-1 bg-gray-300 w-20 h-20 flex flex-col justify-center items-center z-20"
          >
            <EyeIcon className="w-6 pointer-events-none" />
            <p className="pointer-events-none">צפייה בהזמנה</p>
          </motion.div>
          <Template
            closeEvent={setShowTemplate}
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
            className="opacity-0 absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center z-50 space-y-3"
          >
            <motion.div
              animate={errorTrigger ? { scale: 1 } : { scale: 0.7 }}
              className="w-4/6 h-max p-3 bg-gray-200 shadow-1 rounded-xl font-bold"
            >
              <p>{errorMessege}</p>
            </motion.div>
            <motion.div
              animate={errorTrigger ? { scale: 1 } : { scale: 0.7 }}
              className="flex flex-wrap space-x-7"
            >
              <div
                onClick={(e) => errorHandler(e)}
                id="exit"
                className="bg-red-700  shadow-1 w-24 px-2 rounded-md text-white"
              >
                <p className="pointer-events-none">אני בטוח</p>
              </div>
              <div
                onClick={(e) => errorHandler(e)}
                id="accept"
                className="bg-green-600 shadow-1 w-24 px-2 rounded-md text-white"
              >
                <p className="pointer-events-none">אני לא בטוח</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Create;
