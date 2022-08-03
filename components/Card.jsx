import {
  EyeIcon,
  LinkIcon,
  TrashIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InvDelete } from "../api/inviteApi";
import {
  invitePending,
  inviteFail,
  inviteResetList,
} from "../Slices/inviteSlice";
import { motion } from "framer-motion";

function NewCard({ item, index, invInfo, setIsOpen, setCardIndex }) {
  const [selected, setSelected] = useState(false);
  const [worning, setWorning] = useState(false);
  const [Coppyed, setCoppyed] = useState(false);
  const dispatch = useDispatch();

  async function delBut() {
    dispatch(invitePending());
    try {
      await InvDelete({
        invId: invInfo[index]._id,
        userId: invInfo[index].inviter,
      });
      let arr = [...invInfo];
      arr.splice(index, 1);
      setTimeout(() => {
        dispatch(inviteResetList(arr));
      }, 1000);
    } catch (error) {
      dispatch(inviteFail("תקלה בניסיון מחיקת ההזמנה"));
    }
  }

  const copyBut = () => {
    navigator.clipboard.writeText(
      `https://hazmanot.netlify.app/Invite/${
        invInfo[index] !== undefined && invInfo[index]._id
      }`
    );
  };

  return (
    <div>
      <motion.div
        animate={
          selected && !worning
            ? { marginBottom: "50px", backgroundColor: "#8E00D0" }
            : selected && worning
            ? { marginBottom: "50px", backgroundColor: "#ACA7AE" }
            : { marginBottom: 0, backgroundColor: "#BA53EB" }
        }
        tabIndex={index}
        whileHover={selected ? { scale: 1 } : { scale: 1.02 }}
        onFocus={() => setSelected(true)}
        onBlur={() => {
          setSelected(false);
          worning && setWorning(false);
        }}
        className={`${
          selected ? "cursor-default" : "cursor-pointer"
        } bg-per w-full h-[120px] text-white rounded-[5px] shadow-25 flex flex-col items-center justify-center space-y-[13px] relative md:h-[65px] md:flex-row-reverse md:space-y-0 md:justify-between md:px-[20px]`}
      >
        <motion.div
          animate={Coppyed ? { opacity: 1 } : { opacity: 0 }}
          className="opacity-0 pointer-events-none absolute top-0 right-0 w-full h-full p-[10px] backdrop-blur-sm rounded-[5px]"
        >
          <div className="w-full h-full bg-white/70 shadow-25 rounded-[5px] text-black tracking-[0.3em] text-center flex items-center justify-center">
            <p>הקישור הועתק בהצלחה</p>
          </div>
        </motion.div>
        {item.type !== "ברית" && <p>האירוע של {item.name}</p>}
        <p>סוג האירוע: {item.type}</p>
        <p>בתאריך: {item.date}</p>
        <motion.div
          animate={
            selected
              ? { bottom: "-32px", opacity: 1 }
              : { bottom: 0, opacity: 0 }
          }
          className="opacity-0 w-full absolute -bottom-[32px] flex justify-center md:left-0"
        >
          <motion.div
            animate={
              selected && !worning
                ? { height: "32px", display: "flex" }
                : selected && worning
                ? {
                    height: "32px",
                    display: "flex",
                    backgroundColor: "#E7E7E7",
                  }
                : { height: 0, display: "none" }
            }
            transition={!selected && { display: { delay: 0.1 } }}
            className="w-[90%] text-black h-[32px] bg-per rounded-b-[5px] shadow-25 flex items-center md:w-[80%]"
          >
            {worning && (
              <div
                onClick={() => setWorning(false)}
                className="w-full flex justify-center cursor-pointer"
              >
                <p className="px-4 bg-white shadow-25 rounded-[5px]">ביטול</p>
              </div>
            )}
            <motion.div
              animate={
                worning ? { color: "rgb(0, 0, 0)" } : { color: "rgb(0, 0, 0)" }
              }
              onClick={() => (!worning ? setWorning(true) : delBut())}
              className="w-full flex justify-center cursor-pointer"
            >
              <TrashIcon className="w-[20px] pointer-events-none" />
            </motion.div>
            {!worning && (
              <div
                onClick={() => {
                  setCoppyed(true);
                  copyBut();
                  setTimeout(() => {
                    setCoppyed(false);
                  }, 2500);
                }}
                className="w-full flex justify-center cursor-pointer"
              >
                <LinkIcon className="w-[20px] pointer-events-none" />
              </div>
            )}
            {!worning && (
              <div className="w-full flex justify-center cursor-pointer">
                <ViewGridAddIcon className="w-[20px] pointer-events-none" />
              </div>
            )}
            {!worning && (
              <div
                onClick={() => {
                  setIsOpen(true);
                  setCardIndex(index);
                }}
                className="w-full flex justify-center cursor-pointer"
              >
                <EyeIcon className="w-[20px] pointer-events-none" />
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default NewCard;
