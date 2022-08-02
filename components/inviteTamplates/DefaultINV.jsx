import { BellIcon, ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import NewInvCon from "../InvCon";
import { motion } from "framer-motion";

function DefaultINV({ info, active }) {
  let ts = Math.floor(info.titleSize);
  let fs = Math.floor(info.fontSize);
  var fixedDate = info.date.split("-").reverse().join("/");

  const [isHolding, setIsHolding] = useState(false);
  const [controllerSwitch, setControllerSwitch] = useState("");

  return (
    <div
      style={{
        backgroundColor: `rgba(${info.bgColor.red}, ${info.bgColor.green}, ${info.bgColor.blue}, 0.7)`,
      }}
      className="w-full h-full min-h-max overflow-y-auto break-words rounded-[5px] relative flex flex-col justify-between"
    >
      <div
        style={{
          color: `rgb(${info.textColor.red} ${info.textColor.green} ${info.textColor.blue})`,
        }}
        className="pt-[55px] text-center space-y-[25px]"
      >
        <div style={{ fontSize: ts }} className={`tracking-[0.3em] font-bold`}>
          <p className={`${info.type === "ברית" && "hidden"}`}>{info.name}</p>
          <p>
            {info.type === "יום הולדת" &&
              `חוגג${!info.isMale ? "ת" : ""} ${info.age !== 0 && info.age}`}
            {info.type === "חתונה" && `החתונה`}
            {info.type === "חינה" && `החינה`}
            {info.type === "בר מצווה" && `עולה למצוות`}
            {info.type === "בת מצווה" && `חוגגת בת מצווה`}
            {info.type === "ברית" && `קיום הברית`}
          </p>
        </div>
        <p style={{ fontSize: fs }} className={`tracking-[0.3em] `}>
          הנכם מוזמנים לחגוג איתי את יום הולדתי שיערך ב{info.addres}
        </p>
        <div
          className={`${
            info.type === "חתונה" || info.type === "חינה"
              ? "flex flex-col-reverse"
              : "flex flex-col"
          }`}
        >
          <p style={{ fontSize: fs }}>בתאריך</p>
          <p style={{ fontSize: ts }} className={`font-bold`}>
            {fixedDate}
          </p>
        </div>
        <div
          className={`${
            info.type === "חתונה" || info.type === "חינה"
              ? "grid grid-cols-2 gap-[10px] place-center"
              : "flex flex-col"
          }`}
        >
          <div
            className={`${
              info.type === "חתונה" || info.type === "חינה"
                ? "flex flex-col-reverse"
                : "flex flex-col"
            }`}
          >
            <p style={{ fontSize: fs }}>בשעה</p>
            <p style={{ fontSize: ts }} className={`font-bold`}>
              {info.time}
            </p>
          </div>
          <div
            className={`${
              info.type === "חתונה" || info.type === "חינה"
                ? "flex flex-col-reverse"
                : "hidden"
            }`}
          >
            <p style={{ fontSize: fs }}>בשעה</p>
            <p style={{ fontSize: ts }} className={`font-bold`}>
              {info.time}
            </p>
          </div>
          <div
            className={`${
              info.type === "חתונה" || info.type === "חינה"
                ? "flex flex-col-reverse col-start-1 col-span-2"
                : "hidden"
            }`}
          >
            <p style={{ fontSize: fs }}>בשעה</p>
            <p style={{ fontSize: ts }} className={`font-bold`}>
              {info.time}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: `rgba(${info.bgColor.red}, ${info.bgColor.green}, ${info.bgColor.blue}, 0.5)`,
        }}
        className={`${
          active ? "pointer-events-none" : ""
        } relative min-h-[275px] space-y-[20px] w-full rounded-[5px] flex flex-col items-center justify-center`}
      >
        {active && (
          <motion.div
            style={active && { pointerEvents: "auto" }}
            animate={isHolding ? { opacity: 0 } : { opacity: 1 }}
            onTouchStart={() => setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
            onHoverStart={() => setIsHolding(true)}
            onHoverEnd={() => setIsHolding(false)}
            className={`${
              active ? "select-none" : ""
            } backdrop-blur-sm tracking-[0.3em] space-y-[20px] text-white absolute text-center px-3 font-bold top-0 left-0 w-full h-full bg-black/70 flex flex-col items-center justify-center rounded-t-[5px]`}
          >
            <p className="pointer-events-none">
              כאן נמצאים הכפתורים של המוזמנים שלכם שאיתם הם יבחרו אם להגיע או לא
            </p>
            <p className="pointer-events-none">
              לחצו פה ארוך כדי לראות את החלק הזה
            </p>
          </motion.div>
        )}
        <p className="tracking-[0.3em] text-center">
          ?אז מה אתם מתכוונים לעשות
        </p>
        <div
          onClick={() => setControllerSwitch("accepted")}
          className="w-[75%] h-[30px] flex justify-between px-[20px] items-center bg-green-500 rounded-[5px] shadow-25"
        >
          <ThumbUpIcon className="h-[15px] pointer-events-none" />
          <p className="tracking-[0.3em] pointer-events-none">מאשר את הגעתי</p>
        </div>
        <div
          onClick={() => setControllerSwitch("dont know")}
          className="w-[75%] h-[30px] flex justify-between px-[20px] items-center bg-white rounded-[5px] shadow-25"
        >
          <BellIcon className="h-[15px] pointer-events-none" />
          <p className="tracking-[0.3em] pointer-events-none">עוד לא יודע</p>
        </div>
        <div
          onClick={() => setControllerSwitch("declined")}
          className="w-[75%] h-[30px] flex justify-between px-[20px] items-center bg-red-500 rounded-[5px] shadow-25"
        >
          <ThumbDownIcon className="h-[15px] pointer-events-none" />
          <p className="tracking-[0.3em] pointer-events-none">לא אוכל להגיע</p>
        </div>
      </div>
      <NewInvCon
        setControllerSwitch={setControllerSwitch}
        controllerSwitch={controllerSwitch}
        _id={info._id}
        bg={`rgba(${info.bgColor.red}, ${info.bgColor.green}, ${info.bgColor.blue}, 0.8)`}
      />
    </div>
  );
}

export default DefaultINV;
