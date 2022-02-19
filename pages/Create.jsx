import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { newInvite } from "../api/inviteApi";
import { invitePending, inviteLink, inviteFail } from "../Slices/inviteSlice";
import { PlusIcon } from "@heroicons/react/solid";

function Create() {
  const { isAuth } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.user.user);
  const router = useRouter();

  const [isSelected, setIsSelected] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [invRison, setQName] = useState("default");
  const [names, setName] = useState("");
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const selectionAction = {
    open: { y: -200 },
    closed: { y: 0 },
  };

  const qnaAction = {
    open: { opacity: 1, scale: 1, pointerEvents: "auto" },
    closed: { opacity: 0, scale: 0, pointerEvents: "none" },
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
        } else {
          e.preventDefault();
        }
        break;
      case "Hatona":
      case "Hina":
      case "Bar":
      case "Bat":
        if (names !== "" && place !== "" && time !== "" && date !== "") {
        } else {
          e.preventDefault();
        }
        break;
      case "Brit":
        if (place !== "" && time !== "" && date !== "") {
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
      });
      dispatch(inviteLink(invite));
      router.push("/Links");
    } catch (error) {
      console.log(error);
      dispatch(inviteFail("תקלה ביצירת המודעה"));
    }
  }

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

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    }
  });

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden">
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
              isSelected ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }
            }
            className="text-lg tracking-widest text-yellow-col font-bold col-start-1 row-start-2 self-center md:self-start"
          >
            ?מהו סוג האירוע
          </motion.p>
          <form
            method="post"
            onSubmit={(e) => handleSubmit(e)}
            className=" z-20 row-start-1 row-span-6 col-start-1 w-full h-full grid grid-rows-6"
          >
            <motion.select
              animate={isSelected ? "open" : "closed"}
              variants={selectionAction}
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
              className="pointer-events-none space-y-2 row-start-2 row-span-4 col-start-1 flex flex-col items-center"
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
                    type={qnaOBJ[invRison].type.fiv}
                    className="w-2/3 bg-transparent border-b-2 border-black focus:outline-none md:w-2/6 text-center focus:text-center"
                  />
                </>
              )}
            </motion.div>
            <button
              type="submit"
              onClick={submitButtHandler}
              className="absolute bottom-8 right-0 text-lg font-bold w-full text-center h-10 bg-yellow-col border-t-2 border-b-2 border-black md:bottom-40"
            >
              המשך
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
