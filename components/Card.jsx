import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import {
  XIcon,
  CogIcon,
  TrashIcon,
  LinkIcon,
  ChevronLeftIcon,
} from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { InvDelete, InvObj } from "../api/inviteApi";
import {
  invitePending,
  inviteFail,
  inviteResetList,
} from "../Slices/inviteSlice";
import { useSelector } from "react-redux";

function Card({ setIsLookingCard, isLookingCard, invId, userId, cardIndex }) {
  const [comming, setComming] = useState(null);
  const [option, setOption] = useState("");
  const [isCopyed, setIsCopyed] = useState(false);
  const dispatch = useDispatch();
  const { invInfo, isLoading } = useSelector((state) => state.invite);
  const lookingCard = {
    open: { filter: "blur(0px)", opacity: 1, pointerEvents: "auto" },
    closed: { filter: "blur(4px)", opacity: 0, pointerEvents: "none" },
    cardIn: { scale: 1, opacity: 1 },
    cardOut: { scale: 0.5, opacity: 0 },
  };
  async function delHandeling() {
    dispatch(invitePending());
    try {
      await InvDelete({
        invId,
        userId,
      });
      setIsLookingCard(false);
      let arr = [...invInfo];
      arr.splice(cardIndex, 1);
      setTimeout(() => {
        dispatch(inviteResetList(arr));
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch(inviteFail("תקלה בניסיון מחיקת ההזמנה"));
    }
  }

  const copyHandler = () => {
    setIsCopyed(true);
    navigator.clipboard.writeText(
      `https://hazmanot.netlify.app/Invite/${
        invInfo[cardIndex] !== undefined && invInfo[cardIndex]._id
      }`
    );
    setTimeout(() => setIsCopyed(false), 1200);
  };

  const cardOptionsHandler = (e) => {
    switch (option) {
      case "":
        setOption("open");
        break;
      case "open":
        if (e.target.id === "exit") {
          setIsLookingCard(false);
        }
        if (e.target.id === "del") {
          setOption("del");
          return;
        }
        setOption("");
        break;
      case "del":
        if (e.target.id === "exit") {
          setOption("open");
        }
        break;
    }
  };

  useEffect(async () => {
    if (isLookingCard) {
      const invInfo = await InvObj({ _id: invId });
      setComming(invInfo.comming);
    }
  }, []);

  return (
    <motion.div
      animate={isLookingCard ? "open" : "closed"}
      transition={{
        filter: { type: "spring", bounce: 1, stiffness: 50 },
        opacity: { type: "spring", bounce: 1, stiffness: 50 },
        duration: 2,
      }}
      variants={lookingCard}
      className="opacity-0 pointer-events-none bg-black bg-opacity-70 w-full h-screen absolute top-0 right-0 z-50 flex flex-col items-center justify-center xl:bg-opacity-20"
    >
      <motion.div
        animate={isLookingCard ? "cardIn" : "cardOut"}
        transition={{
          scale: { type: "spring", bounce: 1, stiffness: 50 },
          opacity: { type: "spring", bounce: 1, stiffness: 50 },
          duration: 2,
        }}
        variants={lookingCard}
        className="relative bg-white w-5/6 h-4/6 rounded-2xl grid grid-rows-6 xl:w-96 xl:h-2/4 xl:mr-96 xl:mt-32"
      >
        <p className="w-full text-center text-xl col-start-1 row-start-1 self-center">
          {invInfo[cardIndex].names}
        </p>
        <p className="w-full text-center text-3xl col-start-1 row-start-1 self-end font-bold underline">
          {invInfo[cardIndex].invRison === "Bday"
            ? "חוגג יום הולדת"
            : invInfo[cardIndex].invRison === "Hatona"
            ? "אירוע החתונה"
            : invInfo[cardIndex].invRison === "Hina"
            ? "אירוע החינה"
            : invInfo[cardIndex].invRison === "Bar"
            ? "אירוע בר המצווה"
            : invInfo[cardIndex].invRison === "Bat"
            ? "אירוע בת המצווה"
            : invInfo[cardIndex].invRison === "Brit" && "אירוע הברית"}
        </p>
        <div className="text-center col-start-1 row-start-2 self-center justify-self-end pr-10">
          <p className="font-bold">בתאריך</p>
          <p>{invInfo[cardIndex].date}</p>
        </div>
        <div className="text-center col-start-1 row-start-2 self-center justify-self-start pl-10">
          <p className="font-bold">מקום האירוע</p>
          <p>{invInfo[cardIndex].place}</p>
        </div>
        <div className="bg-yellow-col p-2 relative w-5/6 h-[120px] col-start-1 row-start-3 row-span-2 self-center justify-self-center rounded-xl flex flex-col">
          <div className="relative w-full h-full rounded-xl bg-white overflow-hidden px-10 flex items-center justify-center">
            <p className="w-full break-all text-center pt-4">
              https://hazmanot.netlify.app/Invite/{invInfo[cardIndex]._id}
            </p>
            <motion.div
              animate={
                isCopyed
                  ? { opacity: 1, pointerEvents: "auto" }
                  : { opacity: 0, pointerEvents: "none" }
              }
              className="absolute opacity-0 pointer-events-none w-full h-full bg-white/75 flex items-center justify-center"
            >
              <motion.p
                animate={
                  isCopyed
                    ? { scale: 1, pointerEvents: "auto" }
                    : { scale: 0.7, pointerEvents: "none" }
                }
                className="pointer-events-none bg-black text-white px-10 py-2 rounded-md"
              >
                הקישור הועתק
              </motion.p>
            </motion.div>
          </div>
          <p className="bg-yellow-col absolute -top-4 text-xl self-center p-2 rounded-md">
            הקישור למוזמנים שלכם
          </p>
          <div
            onClick={() => copyHandler()}
            className="bg-yellow-col absolute -bottom-3 left-5 w-14 h-8 rounded-md flex items-center justify-center"
          >
            <LinkIcon className="w-5 pointer-events-none" />
          </div>
        </div>
        <div className="bg-sky-500 p-2 relative w-5/6 h-[120px] col-start-1 row-start-5 row-span-2 self-center justify-self-center rounded-xl grid grid-cols-8 ">
          <div className="overflow-hidden pt-5 pb-2 px-2 col-start-3 col-span-6 row-start-1 w-full h-full rounded-r-xl bg-sky-200">
            <div className="w-full h-full overflow-y-auto flex flex-col items-end py-1 px-3">
              {comming !== null &&
                comming.names.map((name) => {
                  return <p key={name}>{name}</p>;
                })}
            </div>
          </div>
          <div className="col-start-1 col-span-2 row-start-1 w-full h-full rounded-l-xl bg-white flex items-center justify-center text-xl text-gray-500">
            <p>{comming !== null && comming.numbers}</p>
          </div>
          <div className="absolute w-full -top-4 left-0 flex items-center justify-center">
            <p className="bg-sky-500 text-xl self-center p-2 rounded-md">
              מי אישר הגעה
            </p>
          </div>
        </div>
        <motion.div
          animate={
            option !== ""
              ? { opacity: 1, pointerEvents: "auto" }
              : { opacity: 0, pointerEvents: "none" }
          }
          style={
            option === "del"
              ? {
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.59) 0%, rgba(255, 0, 0, 0.59) 73.96%)",
                }
              : null
          }
          className="absolute w-full h-full bg-white/75 rounded-xl"
        ></motion.div>
        <motion.div
          animate={
            option === "del"
              ? { opacity: 1, pointerEvents: "auto" }
              : { opacity: 0, pointerEvents: "none" }
          }
          className="opacity-0 pointer-events-none absolute w-full h-1/2 top-0 right-0 px-2 flex items-end justify-center"
        >
          <div className="bg-red-800 w-full h-40 px-3 py-1 shadow-1 relative flex items-center justify-center rounded-xl">
            <div className="bg-white w-full h-full rounded-xl px-9 flex items-center justify-center">
              <p className="font-bold text-lg text-center">
                בטוח שברצונך למחוק את הזמנת{" "}
                {invInfo[cardIndex].invRison === "Bday"
                  ? "יום ההולדת"
                  : invInfo[cardIndex].invRison === "Hatona"
                  ? "החתונה"
                  : invInfo[cardIndex].invRison === "Hina"
                  ? "החינה"
                  : invInfo[cardIndex].invRison === "Bar"
                  ? "בר המצווה"
                  : invInfo[cardIndex].invRison === "Bat"
                  ? "בת המצווה"
                  : invInfo[cardIndex].invRison === "Brit" && "הברית"}{" "}
                של
                <span>
                  {invInfo[cardIndex] !== undefined &&
                  invInfo[cardIndex].invRison === "Brit"
                    ? null
                    : " " + invInfo[cardIndex].names}
                </span>
              </p>
            </div>
            <div
              style={{ background: "#FF0000" }}
              onClick={() => delHandeling()}
              className="absolute -bottom-5 w-1/2 h-10 shadow-1 flex items-center justify-center rounded-md"
            >
              <p className="text-white font-bold text-lg pointer-events-none">
                כן אני בטוח
              </p>
            </div>
          </div>
        </motion.div>
        <div className="w-16 h-16  absolute -top-5 -left-5 md:opacity-0 md:pointer-events-none">
          <motion.div
            animate={
              option === "open" || option === "del"
                ? { opacity: 1, x: 20, y: 60, pointerEvents: "auto" }
                : { opacity: 0, x: 0, y: 0, pointerEvents: "none" }
            }
            transition={{ duration: 0.8 }}
            onClick={(e) => cardOptionsHandler(e)}
            id="exit"
            className="bg-white w-10 h-10 absolute top-2 left-2 rounded-full flex items-center justify-center shadow-1"
          >
            <XIcon className="pointer-events-none w-6" />
          </motion.div>
          <motion.div
            animate={
              option === "open"
                ? { opacity: 1, x: 60, y: 20, pointerEvents: "auto" }
                : { opacity: 0, x: 0, y: 0, pointerEvents: "none" }
            }
            transition={{ duration: 0.8 }}
            onClick={(e) => cardOptionsHandler(e)}
            id="del"
            className="bg-red-500 w-10 h-10 absolute top-2 left-2 rounded-full flex items-center justify-center shadow-1"
          >
            <TrashIcon className="pointer-events-none w-6" />
          </motion.div>
          <div
            onClick={(e) => cardOptionsHandler(e)}
            className={`${
              option === "del" ? "bg-red-500" : "bg-yellow-col"
            } shadow-1 rounded-full w-full h-full flex items-center justify-center relative`}
          >
            <motion.div
              animate={option === "" ? { opacity: 1 } : { opacity: 0 }}
              className="w-10 h-10 absolute"
            >
              <CogIcon className="w-10 text-white pointer-events-none" />
            </motion.div>
            <motion.div
              animate={option === "open" ? { opacity: 1 } : { opacity: 0 }}
              className="w-10 h-10 absolute opacity-0"
            >
              <ChevronLeftIcon className="w-10 text-white pointer-events-none" />
            </motion.div>
            <motion.div
              animate={option === "del" ? { opacity: 1 } : { opacity: 0 }}
              className="w-10 h-10 absolute opacity-0"
            >
              <TrashIcon className="w-10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
        <div
          onClick={() => setIsLookingCard(false)}
          className="opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto bg-black rounded-l-xl self-end justify-center items-end flex row-start-6 col-start-1 w-4/6 h-1/2"
        >
          <XIcon className="pointer-events-none mb-2 w-6 text-white" />
        </div>
        <div
          onClick={() => delHandeling()}
          className="opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto bg-orange-700 rounded-r-xl self-end justify-self-end justify-center items-end flex row-start-6 col-start-1 w-2/6 h-1/2"
        >
          <TrashIcon className="pointer-events-none mb-2 w-6 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Card;
