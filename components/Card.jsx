import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TrashIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import { XIcon, LinkIcon } from "@heroicons/react/solid";
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
  const [isCopyed, setIsCopyed] = useState(false);
  const dispatch = useDispatch();
  const { invInfo } = useSelector((state) => state.invite);
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
      let arr = [...invInfo];
      arr.splice(cardIndex, 1);
      dispatch(inviteResetList(arr));
      setIsLookingCard(false);
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
  useEffect(async () => {
    const invInfo = await InvObj({ _id: invId });
    setComming(invInfo.comming);
  }, [invId]);

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
        <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
          {invInfo[cardIndex] !== undefined &&
            invInfo[cardIndex].invRison === "Bday" &&
            "יום ההולדת של"}
        </p>
        <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
          {invInfo[cardIndex] !== undefined &&
            invInfo[cardIndex].invRison === "Hatona" &&
            "החתונה של"}
        </p>
        <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
          {invInfo[cardIndex] !== undefined &&
            invInfo[cardIndex].invRison === "Hina" &&
            "החינה של"}
        </p>
        <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
          {invInfo[cardIndex] !== undefined &&
            invInfo[cardIndex].invRison === "Bar" &&
            "הבר מצווה של"}
        </p>
        <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
          {invInfo[cardIndex] !== undefined &&
            invInfo[cardIndex].invRison === "Bat" &&
            "הבת מצווה של"}
        </p>
        <p className="justify-self-center self-center row-start-1 col-start-1 text-xl font-bold tracking-widest">
          {invInfo[cardIndex] !== undefined &&
            invInfo[cardIndex].invRison === "Brit" &&
            "ברית"}
        </p>
        <p
          className={`${
            invInfo[cardIndex] !== undefined &&
            invInfo[cardIndex].invRison === "Bday"
              ? "justify-self-end mr-16"
              : "justify-self-center"
          } self-center mt-5 row-start-1 col-start-1 border-b-2 border-yellow-col`}
        >
          {invInfo[cardIndex] !== undefined && invInfo[cardIndex].names}
        </p>
        {invInfo[cardIndex] !== undefined && invInfo[cardIndex].age !== null && (
          <div className="flex flex-col items-center justify-center ml-16 justify-self-start self-center row-start-1 col-start-1 w-10 text-center h-10 border-yellow-col border-2 rounded-full mt-5">
            <p className="">{invInfo[cardIndex].age}</p>
          </div>
        )}
        <p
          className={`${
            invInfo[cardIndex] !== undefined &&
            invInfo[cardIndex].invRison === "Brit"
              ? "mb-3"
              : ""
          } text-xl  self-center justify-self-center row-start-1 row-span-2 col-start-1 tracking-widest`}
        >
          {invInfo[cardIndex] !== undefined && invInfo[cardIndex].place}
        </p>
        <p className="mr-5 justify-self-end self-center row-start-2 col-start-1">
          {invInfo[cardIndex] !== undefined && invInfo[cardIndex].date}
        </p>
        <p className="ml-5 justify-self-start self-center row-start-2 col-start-1">
          {invInfo[cardIndex] !== undefined && invInfo[cardIndex].time}
        </p>
        <div className="relative shadow-xl border-b-2 border-t-2 border-yellow-col justify-self-center self-start row-start-3 col-start-1 w-5/6 h-full flex flex-row items-center justify-center rounded-xl">
          <p className="break-all p-4 text-center">
            https://hazmanot.netlify.app/Invite/
            {invInfo[cardIndex] !== undefined && invInfo[cardIndex]._id}
          </p>
          <motion.div
            animate={
              isCopyed
                ? {
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
            className="absolute text-white font-bold bg-black/80 rounded-md w-full h-full flex items-center justify-center"
          >
            <motion.p animate={isCopyed ? { scale: 1 } : { scale: 0 }}>
              הקישור הועתק בהצלחה
            </motion.p>
          </motion.div>
        </div>
        <Link
          href={`/Invite/${
            invInfo[cardIndex] !== undefined && invInfo[cardIndex]._id
          }`}
        >
          <div className="row-start-3 z-10 row-span-2 mr-24 self-center justify-self-center col-start-1 bg-white border-2 border-yellow-col rounded-full p-2">
            <ClipboardCopyIcon className="w-6" />
          </div>
        </Link>
        <div
          onClick={() => copyHandler()}
          className="row-start-3 z-10 row-span-2 ml-24 self-center justify-self-center col-start-1 bg-white border-2 border-yellow-col rounded-full p-2"
        >
          <LinkIcon className="w-6" />
        </div>
        <motion.div
          animate={
            comming !== null && comming.numbers <= 0
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.7 }
          }
          className="absolute pointer-events-none -bottom-10 w-full h-4/6 flex items-center justify-center"
        >
          <div className="w-5/6 h-20 bg-white rounded-xl flex items-center text-center border-t-2 border-b-2 shadow-2xl border-yellow-col">
            <p className="w-full font-bold">עדיין אין אישורי הגעה</p>
          </div>
        </motion.div>
        <motion.div
          animate={
            comming !== null && comming.numbers > 0
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.7 }
          }
          className="justify-self-center self-center row-start-4 row-span-3 col-start-1 w-full h-4/6 grid grid-cols-6"
        >
          <p className="font-bold border-b-2 border-yellow-col self-start justify-self-center row-start-1 col-start-1 ml-3 mt-6 xl:mt-2">
            מגיעים
          </p>
          <div className="font-bold shadow-xl border-b-2 border-t-2 border-yellow-col self-center justify-self-center row-start-1 ml-3 col-start-1 bg-white w-10 h-16 rounded-2xl flex items-center justify-center">
            <p>
              {comming !== undefined && comming !== null && comming.numbers}
            </p>
          </div>
          <div className="shadow-xl border-b-2 border-t-2 border-yellow-col row-start-1 col-start-2 col-span-5 w-5/6 h-5/6 self-center justify-self-center rounded-xl flex flex-col items-center justify-center overflow-y-auto p-3 space-y-3">
            {comming !== undefined &&
              comming !== null &&
              comming.names.map((name, index) => (
                <div
                  key={index}
                  className="w-full h-10 bg-yellow-col rounded-md text-center"
                >
                  {name}
                </div>
              ))}
          </div>
        </motion.div>
        <div
          onClick={() => setIsLookingCard(false)}
          className="bg-black rounded-l-xl self-end justify-center items-end flex row-start-6 col-start-1 w-4/6 h-1/2"
        >
          <XIcon className="pointer-events-none mb-2 w-6 text-white" />
        </div>
        <div
          onClick={() => delHandeling()}
          className="bg-orange-700 rounded-r-xl self-end justify-self-end justify-center items-end flex row-start-6 col-start-1 w-2/6 h-1/2"
        >
          <TrashIcon className="pointer-events-none mb-2 w-6 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Card;
