import React, { useState } from "react";
import { motion } from "framer-motion";
import { commingCount } from "../api/inviteApi";

function NewInvCon({ setControllerSwitch, controllerSwitch, _id, bg }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comming, setComming] = useState();
  const [massage, setMassage] = useState("");

  function clearFuilds() {
    setName("");
    setEmail("");
    setComming();
    setMassage("");
  }

  async function updatingInv() {
    try {
      await commingCount({
        _id,
        type: controllerSwitch,
        fullName: name,
        email,
        count: comming,
        massage,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div
      animate={
        controllerSwitch
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
      transition={
        controllerSwitch
          ? { opacity: { delay: 0.2 } }
          : { opacity: { delay: 0 } }
      }
      style={{ backgroundColor: bg }}
      className="absolute opacity-0 top-0 left-0 w-full h-full flex flex-col items-center justify-center"
    >
      <motion.form
        animate={controllerSwitch ? { scale: [0.5, 1] } : { scale: [1, 0.5] }}
        className="scale-[0.5] w-[90%] flex flex-col items-center space-y-[18px]"
      >
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="שם מלא שלך"
          className="w-full h-[65px] bg-white rounded-[5px] shadow-25 focus:outline-none text-right px-[10px]"
        />
        <motion.div
          animate={
            controllerSwitch === "declined"
              ? { display: "none" }
              : { display: "flex" }
          }
          transition={
            controllerSwitch === "declined"
              ? { display: { delay: 0 } }
              : { display: { delay: 1 } }
          }
          className="flex w-full"
        >
          <input
            type={controllerSwitch === "accepted" ? "number" : "email"}
            onChange={(e) =>
              controllerSwitch === "accepted"
                ? setComming(e.target.value)
                : setEmail(e.target.value)
            }
            value={controllerSwitch === "accepted" ? comming : email}
            placeholder={
              controllerSwitch === "accepted"
                ? "?כמה אתם מגיעים"
                : "כתובת מייל שלך"
            }
            className="w-full h-[65px] bg-white rounded-[5px] shadow-25 focus:outline-none text-right px-[10px]"
          />
        </motion.div>
        <motion.textarea
          animate={
            controllerSwitch === "dont know"
              ? { display: "none" }
              : { display: "block" }
          }
          transition={
            controllerSwitch === "dont know"
              ? { display: { delay: 0, duration: 0 } }
              : { display: { delay: 1 } }
          }
          type="text"
          onChange={(e) => setMassage(e.target.value)}
          value={massage}
          placeholder={
            controllerSwitch === "accepted"
              ? "באפשרותך לכתוב כמה מילים למזמין"
              : "באפשרותך להסביר למזמין או לרשום לו איחול"
          }
          className="w-full h-[239px] bg-white rounded-[5px] shadow-25 focus:outline-none text-right p-[10px]"
        />
        <div
          onClick={() => updatingInv()}
          className="w-[70%] h-[65px] bg-white rounded-[5px] shadow-25 font-bold flex items-center justify-center"
        >
          <p>
            {controllerSwitch === "accepted"
              ? "מאשר את הגעתי"
              : controllerSwitch === "dont know"
              ? "פעם אחרת"
              : "סליחה לא אגיע"}
          </p>
        </div>
        <div
          onClick={() => {
            setControllerSwitch("");
            clearFuilds();
          }}
          className="w-[50%] h-[35px] bg-white rounded-[5px] shadow-25 font-bold flex items-center justify-center"
        >
          <p className="pointer-events-none">חזרה אחורה</p>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default NewInvCon;
