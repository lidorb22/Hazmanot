import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  XIcon,
  TrashIcon,
  LinkIcon,
  DotsVerticalIcon,
  AdjustmentsIcon,
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
  const [isCopyed, setIsCopyed] = useState(false);
  const [commingNum, setCommingNum] = useState(0);
  const [delWarning, setDelWarning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [infoIndex, setInfoIndex] = useState(null);
  const dispatch = useDispatch();
  const { invInfo } = useSelector((state) => state.invite);
  const lookingCard = {
    open: { filter: "blur(0px)", opacity: 1, pointerEvents: "auto" },
    closed: { filter: "blur(4px)", opacity: 0, pointerEvents: "none" },
    cardIn: { scale: 1, opacity: 1 },
    cardOut: { scale: 0.5, opacity: 0 },
  };

  async function delHandeling() {
    if (!delWarning) {
      setDelWarning(true);
      return;
    }
    setDelWarning(false);
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

  useEffect(async () => {
    if (isLookingCard) {
      const invInfo = await InvObj({ _id: invId });
      if (JSON.stringify(comming) === JSON.stringify(invInfo.comming)) {
        return;
      }
      setComming(invInfo.comming);
      if (invInfo) {
        invInfo.comming.accepted.forEach((arr) => {
          setCommingNum((commingNum += arr.number));
        });
      }
    }
  }, [comming]);

  return (
    <motion.div
      animate={isLookingCard ? "open" : "closed"}
      transition={{
        filter: { type: "spring", bounce: 1, stiffness: 50 },
        opacity: { type: "spring", bounce: 1, stiffness: 50 },
        duration: 2,
      }}
      variants={lookingCard}
      className="opacity-0 pointer-events-none backdrop-blur-sm bg-yellow-col/90 w-full h-full absolute top-0 right-0 z-50 flex flex-col items-center justify-evenly text-white overflow-hidden 2xl:grid 2xl:grid-cols-2 2xl:bg-gradient-to-l from-white to-yellow-col"
    >
      <div className="space-y-5 w-full 2xl:col-start-2 2xl:row-start-1 2xl:flex 2xl:flex-col 2xl:space-y-32">
        <div className="w-full text-center font-bold text-[40px] md:text-[72px] 2xl:bg-yellow-col/80 rounded-xl 2xl:w-max 2xl:self-center">
          <p className="cursor-default 2xl:px-3">
            {invInfo && invInfo[cardIndex].names}
          </p>
          {invInfo && (
            <p className="cursor-default 2xl:px-3">
              {invInfo[cardIndex].invRison === "Brit"
                ? "אירוע הברית"
                : invInfo[cardIndex].invRison === "Bday"
                ? "חוגג יום הולדת"
                : invInfo[cardIndex].invRison === "Bar"
                ? "עולה למצוות"
                : invInfo[cardIndex].invRison === "Bat"
                ? "חוגגת בת מצווה"
                : invInfo[cardIndex].invRison === "Hatona"
                ? "מתחתנים"
                : invInfo[cardIndex].invRison === "Hina"
                ? "חוגגים חינה"
                : ""}
            </p>
          )}
        </div>
        <div className="w-full text-center flex 2xl:text-black">
          <div className="w-full flex flex-col items-center">
            <p className="cursor-default font-bold text-[20px] md:text-[36px]">
              מקום האירוע
            </p>
            <p className="cursor-default text-center w-[104px] md:text-[24px]">
              {invInfo && invInfo[cardIndex].place}
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <p className="cursor-default font-bold text-[20px] md:text-[36px]">
              תאריך
            </p>
            <p className="cursor-default md:text-[24px]">
              {invInfo && invInfo[cardIndex].date}
            </p>
          </div>
        </div>
      </div>
      <motion.div
        animate={
          showInfo
            ? { opacity: 1, pointerEvents: "auto" }
            : { opacity: 0, pointerEvents: "none" }
        }
        className="opacity-0 pointer-events-none absolute top-0 right-0 bg-yellow-col/80 backdrop-blur-sm w-full h-full grid grid-rows-6 items-center 2xl:grid-cols-2 2xl:bg-gradient-to-l from-white to-yellow-col"
      >
        <div className="w-full h-full row-start-1 row-span-3 flex flex-col items-center justify-center text-white 2xl:col-start-2 2xl:row-span-6 2xl:text-black 2xl:space-y-10">
          <p className="text-[40px] font-bold md:text-[72px] bg-yellow-col px-10 rounded-xl 2xl:text-white">
            {invInfo[cardIndex].comming.accepted[infoIndex] !== undefined &&
              invInfo[cardIndex].comming.accepted[infoIndex].fullName}
          </p>
          {invInfo[cardIndex].comming.accepted[infoIndex] !== undefined &&
            invInfo[cardIndex].comming.accepted[infoIndex].side !== "" && (
              <div className="text-center  md:text-[24px]">
                <p className="text-[20px] font-bold  md:text-[36px]">
                  צד המוזמן
                </p>
                <p>{invInfo[cardIndex].comming.accepted[infoIndex].side}</p>
              </div>
            )}
          <div className="text-center  md:text-[24px]">
            <p className="text-[20px] font-bold  md:text-[36px]">סוג ההגעה</p>
            <p>
              {invInfo[cardIndex].comming.accepted[infoIndex] !== undefined &&
                invInfo[cardIndex].comming.accepted[infoIndex].option}
            </p>
          </div>
          <div className="text-center  md:text-[24px]">
            <p className="text-[20px] font-bold  md:text-[36px]">
              מספר המגיעים
            </p>
            <p>
              {invInfo[cardIndex].comming.accepted[infoIndex] !== undefined &&
                invInfo[cardIndex].comming.accepted[infoIndex].number}
            </p>
          </div>
        </div>
      </motion.div>
      <div className="space-y-8 2xl:col-start-1 2xl:row-start-1 2xl:justify-self-center 2xl:self-start 2xl:mt-[150px] 2xl:space-y-12">
        <div className="w-[320px] h-[80px] text-black flex items-center justify-center relative md:w-[583px]">
          <div className="w-full h-full text-center bg-white rounded-lg border-2 border-black shadow-1 flex items-center justify-center px-10 overflow-y-auto relative">
            <p className="break-all md:text-[20px] cursor-default">
              https://hazmanot.netlify.app/Invite/
              {invInfo[cardIndex] !== undefined && invInfo[cardIndex]._id}
            </p>

            <motion.p
              animate={showInfo ? { opacity: 1 } : { opacity: 0 }}
              className="opacity-0 bg-white absolute top-0 right-0 w-full h-full pt-3 overflow-y-auto  md:text-[20px]"
            >
              {invInfo[cardIndex].comming.accepted[infoIndex] !== undefined &&
                invInfo[cardIndex].comming.accepted[infoIndex].massage}
            </motion.p>
            <motion.div
              animate={
                isCopyed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }
              }
              className="opacity-0 cursor-default absolute bg-black/90 w-5/6 h-5/6 rounded-xl flex items-center justify-center text-white font-bold tracking-widest"
            >
              <p>הקישור הועתק בהצלחה</p>
            </motion.div>
          </div>
          <p className="absolute cursor-default -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg  md:text-[24px] md:-top-7">
            {showInfo
              ? `הודעה מ${invInfo[cardIndex].comming.accepted[infoIndex].fullName}`
              : "קישור להזמנה"}
          </p>
        </div>
        <div className="w-[320px] h-[141px] text-black flex items-center justify-center relative md:w-[583px] md:h-[141px] 2xl:h-[416px]">
          <p className="absolute cursor-default -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg md:text-[24px] md:-top-7">
            אישורי הגעה
          </p>
          <div className="w-[230px] cursor-default h-[43px] text-[20px] absolute -bottom-[43px] bg-gray-500 text-white rounded-b-lg flex items-center justify-center md:text-[24px] md:w-[266px]">
            <p>סך הכל אישרו הגעה: {commingNum}</p>
          </div>
          <div className="w-full h-full text-center bg-white rounded-lg border-2 border-black shadow-1 flex flex-col space-y-2 py-4 px-3 overflow-y-auto">
            {invInfo &&
              invInfo[cardIndex].comming.accepted.map((inv, index) => (
                <div
                  key={inv._id}
                  className="cursor-default w-full h-[25px] px-2 rounded-md text-white bg-gray-500 flex items-center justify-between md:text-[24px] 2xl:h-[37px]"
                >
                  <div className="flex space-x-4">
                    <DotsVerticalIcon
                      onClick={() => (setInfoIndex(index), setShowInfo(true))}
                      className="w-[20px] cursor-pointer"
                    />
                    <p className="text-center w-[50px] md:w-[100px]">
                      {inv.option}
                    </p>
                  </div>
                  <p>{inv.fullName}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-[250px] h-[40px] relative md:h-[75px] 2xl:w-[680px] 2xl:h-[68px] 2xl:col-start-1 2xl:row-start-1 2xl:self-end 2xl:mb-[100px] 2xl:justify-self-center">
        <motion.div
          animate={delWarning ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          className="-z-10 w-full absolute -bottom-[41px] bg-[#FF0000] h-[40px] rounded-md flex items-center justify-center tracking-widest font-bold text-black 2xl:-top-[41px]"
        >
          <p>לחץ שוב כדי למחוק</p>
        </motion.div>
        <div className="bg-white w-full h-full rounded-md text-black flex items-center justify-around shadow-1 ">
          <div
            onClick={() =>
              showInfo
                ? setShowInfo(false)
                : delWarning
                ? setDelWarning(false)
                : setIsLookingCard(false)
            }
            className="cursor-pointer w-full flex flex-col items-center 2xl:w-max 2xl:flex-row-reverse 2xl:justify-center 2xl:text-[24px]"
          >
            <XIcon className="pointer-events-none w-[20px] 2xl:w-[24px] 2xl:ml-2" />
            <p className="pointer-events-none opacity-0 absolute md:opacity-100 md:static">
              יציאה
            </p>
          </div>
          {!showInfo && (
            <div
              onClick={() => copyHandler()}
              className="cursor-pointer w-full flex flex-col items-center 2xl:w-max 2xl:flex-row-reverse 2xl:justify-center 2xl:text-[24px]"
            >
              <LinkIcon className="pointer-events-none w-[20px] 2xl:w-[24px] 2xl:ml-2" />
              <p className="pointer-events-none opacity-0 absolute md:opacity-100 md:static md:text-center">
                העתקת קישור
              </p>
            </div>
          )}
          {!showInfo && (
            <div className="relative cursor-pointer w-full flex flex-col items-center 2xl:w-max 2xl:flex-row-reverse 2xl:justify-center 2xl:text-[24px]">
              <AdjustmentsIcon className="pointer-events-none w-[20px] 2xl:w-[24px] 2xl:ml-2" />
              <p className="pointer-events-none opacity-0 absolute md:opacity-100 md:static md:text-center">
                סינון מוזמנים
              </p>
              <div className="absolute w-full h-full bg-black/70 backdrop-blur-[1.5px] rounded-xl flex items-center justify-center">
                <p className="font-bold rotate-[5deg] text-white">בקרוב</p>
              </div>
            </div>
          )}
          {!showInfo && (
            <div
              onClick={() => delHandeling()}
              className="cursor-pointer w-full flex flex-col items-center 2xl:w-max 2xl:flex-row-reverse 2xl:justify-center 2xl:text-[24px]"
            >
              <TrashIcon
                className={`${
                  delWarning ? "text-red-600" : "text-black"
                } w-[20px] pointer-events-none 2xl:w-[24px] 2xl:ml-2`}
              />
              <p className="pointer-events-none opacity-0 absolute md:opacity-100 md:static md:text-center">
                מחיקת הזמנה
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
