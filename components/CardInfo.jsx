import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReplyIcon } from "@heroicons/react/solid";

function NewCardInfo({ setIsOpen, selectedInfo }) {
  const [selected, setSelected] = useState();
  useEffect(() => {
    if (selected) {
      setSelected();
    }
  }, [selectedInfo]);

  console.log(selectedInfo.comming.accepted);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute opacity-0 w-full h-full top-0 left-0 z-50 bg-per/90 backdrop-blur-[20px] flex xl:w-[38%] xl:z-0 2xl:w-[48%] xl:bg-transparent"
    >
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0.5 }}
        layout
        transition={{ layout: { duration: 2 } }}
        className="w-full h-full flex flex-col items-center justify-center pt-[10px] text-white space-y-[20px]  overflow-y-auto"
      >
        <motion.div
          layout="position"
          className="w-full h-max flex flex-col items-center space-y-[20px]"
        >
          <p className="pb-[14px] text-[30px]">פירוט האירוע</p>
          <p>מיקום ושם האולם: {selectedInfo.addres}</p>
          {selectedInfo.comming.accepted.length === 0 && (
            <p className="text-bold text-[30px] bg-yel text-black px-5 rounded-[5px] shadow-25">
              עוד לא אישרו הגעה
            </p>
          )}
          {selectedInfo.comming.accepted.length > 0 && (
            <div className="w-full flex flex-col items-center">
              <p>אישרו הגעה</p>
              <div className="w-[92%] h-[114px] bg-white rounded-[5px] shadow-25 p-[10px] grid grid-cols-3 overflow-y-auto items-center gap-[10px]">
                {selectedInfo.comming.accepted.map((person) => (
                  <div
                    key={person._id}
                    onClick={() =>
                      selected === person ? setSelected() : setSelected(person)
                    }
                    className="bg-per w-full h-[95px] rounded-[5px] shadow-25 justify-self-center flex flex-col items-center justify-evenly"
                  >
                    <p className="w-full break-words text-center">
                      {person.fullName}
                    </p>
                    <p>+{person.count}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        {selected && (
          <motion.div
            animate={{ scale: [0.8, 1] }}
            className="w-full h-max flex flex-col items-center space-y-[20px] scale-[0.8]"
          >
            <p className="pb-[14px] text-[30px]">מידע על המוזמן</p>
            <p>שם המאשר/ת {selected.fullName}</p>
            <p>מגיעים: {selected.count}</p>
            {selected.massage && (
              <div className="w-full flex flex-col items-center">
                <p>הודעה אישית</p>
                <div className="w-[92%] h-[114px] bg-white text-black rounded-[5px] shadow-25 p-[10px] overflow-y-auto">
                  <p className="w-full h-full text-right">{selected.massage}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
        <motion.div
          onClick={() => setIsOpen(false)}
          layout="position"
          className="bg-white text-black w-[110px] h-[30px] rounded-[5px] shadow-25 self-start ml-[4%] flex items-center justify-around"
        >
          <ReplyIcon className="w-[20px] pointer-events-none" />
          <p className="tracking-[0.3em] pointer-events-none">סגירה</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default NewCardInfo;
