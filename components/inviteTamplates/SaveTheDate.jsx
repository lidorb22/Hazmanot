import { BellIcon, ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NewInvCon from "../InvCon";

function SaveTheDate({ info, active, isOpen }) {
  const [isHolding, setIsHolding] = useState(false);
  const [controllerSwitch, setControllerSwitch] = useState("");

  let ts = Math.floor(info.titleSize);
  let fs = Math.floor(info.fontSize);
  var fixedDate = info.date.split("-").reverse().join("/");
  var fixedname = info.name.split(" ו").join(" & ");
  return (
    <motion.div
      animate={
        info.isOpen && active
          ? { pointerEvents: "auto" }
          : { pointerEvents: "auto" }
      }
      className="overflow-y-auto bg-white w-full h-full min-h-max break-words rounded-[5px] relative z-0"
    >
      <div className="w-full h-max flex flex-col items-center overflow-x-hidden">
        <div
          style={{
            backgroundColor: `rgb(${info.bgColor.red} ${info.bgColor.green} ${info.bgColor.blue})`,
            color: `rgb(${info.textColor.red} ${info.textColor.green} ${info.textColor.blue})`,
          }}
          className="mt-[50px] relative rotate-[-2.75deg] w-[500px] h-max text-white flex flex-col items-center justify-center"
        >
          <p style={{ fontSize: ts }} className="font-bold">
            Save the date
          </p>
          <p style={{ fontSize: fs }}>ב-{fixedDate}</p>
          <p
            style={{ fontSize: fs }}
            className={info.type === "ברית" && "hidden"}
          >
            {info.type === "יום הולדת" &&
              `${info.name} חוגג${!info.isMale ? "ת" : ""} יום הולדת`}
            {
              /*prettier-ignore */
              (info.type === "חתונה" || info.type === "חינה") && `${fixedname}`
            }
            {info.type === "בר מצווה" && `${info.name} עולה למצוות`}
            {info.type === "בת מצווה" && `${info.name} חוגגת בת מצווה`}
          </p>
          <p style={{ fontSize: ts }} className="font-bold tracking-[0.3em]">
            {info.type === "יום הולדת" && `${info.age}`}
            {info.type === "חתונה" && `החתונה`}
            {info.type === "חינה" && `החינה`}
            {info.type === "בר מצווה" && `13`}
            {info.type === "בת מצווה" && `12`}
            {info.type === "ברית" && `קיום הברית`}
          </p>
          <div
            style={{
              backgroundColor: `rgba(${info.bgColor.red}, ${info.bgColor.green}, ${info.bgColor.blue} ,0.3)`,
            }}
            className="absolute -top-[14px] w-[50%] h-[8px] left-0"
          ></div>
          <div
            style={{
              backgroundColor: `rgba(${info.bgColor.red}, ${info.bgColor.green}, ${info.bgColor.blue} ,0.3)`,
            }}
            className="absolute -bottom-[14px] w-[80%] h-[8px] right-0"
          ></div>
        </div>
        <p
          style={{ fontSize: fs }}
          className="tracking-[0.3em] text-center w-[92%] mt-[60px]"
        >
          {info.type === "יום הולדת" &&
            `מזמינים אתכם לחגוג איתנו את יום ההולדת ב${info.addres}`}
          {info.type === "חתונה" &&
            `מזמינים אתכם לחגוג איתנו את היום המאושר בחיינו ב${info.addres}`}
          {info.type === "חינה" &&
            `מזמינים אתכם לחגוג איתנו את היום המאושר בחיינו ב${info.addres}`}
          {info.type === "בר מצווה" &&
            `מזמינים אתכם לחגוג איתנו את עלייתו של בנינו למצוות ב${info.addres}`}
          {info.type === "בת מצווה" &&
            `מזמינים אתכם לחגוג איתנו את בת המצווה של ביתנו היקרה ב${info.addres}`}
          {info.type === "ברית" &&
            `מזמינים אתכם לחגוג איתנו את הולדתו של בנינו היקר ב${info.addres}`}
        </p>
        <div
          className={`${
            info.type === "חתונה" || info.type === "חינה"
              ? "grid grid-cols-2 gap-[10px] my-[30px]"
              : "flex flex-col my-[30px]"
          }`}
        >
          <div
            className={`${
              info.type === "חתונה" || info.type === "חינה"
                ? "flex flex-col-reverse items-center"
                : "flex flex-col items-center"
            }`}
          >
            <p style={{ fontSize: fs }}>יש להגיע בשעה</p>
            <p
              style={{
                fontSize: ts,
                color: `rgb(${info.bgColor.red} ${info.bgColor.green} ${info.bgColor.blue})`,
              }}
              className={`font-bold`}
            >
              {info.time}
            </p>
          </div>
          <div
            className={`${
              info.type === "חתונה" || info.type === "חינה"
                ? "flex flex-col-reverse items-center"
                : "hidden"
            }`}
          >
            <p style={{ fontSize: fs }}>בשעה</p>
            <p
              style={{
                fontSize: ts,
                color: `rgb(${info.bgColor.red} ${info.bgColor.green} ${info.bgColor.blue})`,
              }}
              className={`font-bold`}
            >
              {info.time}
            </p>
          </div>
          <div
            className={`${
              info.type === "חתונה" || info.type === "חינה"
                ? "flex flex-col-reverse col-start-1 col-span-2 items-center"
                : "hidden"
            }`}
          >
            <p style={{ fontSize: fs }}>בשעה</p>
            <p
              style={{
                fontSize: ts,
                color: `rgb(${info.bgColor.red} ${info.bgColor.green} ${info.bgColor.blue})`,
              }}
              className={`font-bold`}
            >
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
            className="backdrop-blur-sm tracking-[0.3em] space-y-[20px] text-white absolute text-center px-3 font-bold top-0 left-0 w-full h-full bg-black/70 flex flex-col items-center justify-center rounded-t-[5px]"
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
    </motion.div>
  );
}

export default SaveTheDate;
