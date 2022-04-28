import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  RefreshIcon,
  ReplyIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addComming } from "../Slices/inviteAction";

function TamplateController({
  info,
  setIsAccepting,
  isAccepting,
  screenWidth,
}) {
  const dispatch = useDispatch();
  const [formStep, setFormStep] = useState("");
  const [commingOpt, setCommingOpt] = useState("");
  const [fullName, setFullName] = useState("");
  const [number, setNuber] = useState(1);
  const [relation, setRelation] = useState("משפחה");
  const [side, setSide] = useState("");
  const [massage, setMassage] = useState("");
  const [IsError, setIsError] = useState(false);
  const [errorMass, setErrorMass] = useState("");

  const commingOption = (e) => {
    if (e.target.id === "בעצמו") {
      setNuber(1);
    }
    if (e.target.id === "בן/ת זוג") {
      setNuber(2);
    }
    setCommingOpt(e.target.id);
    setFormStep("first");
    console.log(e.target.id);
  };

  const exitButtHandler = () => {
    if (commingOpt !== "") {
      setCommingOpt("blink");
      setNuber(1);
      setTimeout(() => setCommingOpt(""), 1000);
      return;
    }
    setIsAccepting(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (fullName === "") {
      setIsError(true);
      setErrorMass("שדה המילוי של השם המלא שלך הוא חובה");
      setTimeout(() => {
        setIsError(false), setErrorMass("");
      }, 2500);
      return;
    }
    if (
      (info.invRison === "Hatona" && side === "") ||
      (info.invRison === "Hina" && side === "")
    ) {
      setIsError(true);
      setErrorMass("שדה המילוי של בחירת הצד שלך הוא חובה");
      setTimeout(() => {
        setIsError(false), setErrorMass("");
      }, 2500);
      return;
    }
    try {
      dispatch(
        addComming(
          info._id,
          commingOpt,
          fullName,
          number,
          relation,
          side,
          massage
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      animate={
        screenWidth >= 1536
          ? { opacity: 1, pointerEvents: "auto", x: 400 }
          : isAccepting
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
      transition={
        screenWidth <= 1536 && !isAccepting && { opacity: { duration: 0.2 } }
      }
      className={`
        ${
          screenWidth >= 1536
            ? "opacity-100 w-[650px] h-[810px]"
            : "opacity-0 pointer-events-none h-full w-full bg-yellow-col/80 backdrop-blur-sm"
        }
        absolute flex flex-col items-center
        `}
    >
      <motion.form
        animate={
          screenWidth >= 1536
            ? { pointerEvents: "auto" }
            : isAccepting
            ? { pointerEvents: "auto" }
            : { pointerEvents: "none" }
        }
        className={`${
          screenWidth >= 1536 ? "" : ""
        } relative w-full h-full grid grid-rows-6 grid-cols-4`}
        onSubmit={(e) => submitHandler(e)}
      >
        <motion.p
          className={`
        text-center font-bold col-start-1 col-span-4 row-start-2 text-[40px] text-white md:text-[72px] md:row-start-1 md:self-end 2xl:row-start-1 2xl:w-[456px] 2xl:h-[117px] 2xl:bg-yellow-col/80 2xl:rounded-xl 2xl:justify-self-center
        `}
        >
          אישור הגעה
        </motion.p>
        {/* First QNA */}
        {commingOpt === "" && (
          <div className="w-full h-full grid grid-cols-2 grid-rows-4 relative row-start-2 row-span-5 col-start-1 col-span-4">
            <motion.p
              animate={
                commingOpt !== "" ? { y: 0, opacity: 0 } : { y: 0, opacity: 1 }
              }
              className={`
            ${screenWidth >= 1536 ? "" : ""}
              pointer-events-none col-start-1 row-start-1 col-span-2 justify-self-center text-white text-[24px] self-end mb-10 md:text-[36px] md:self-center 2xl:text-black 2xl:text-[36px] 2xl:self-center
            `}
            >
              ?איך את/ה מתכוון/ת להגיע
            </motion.p>
            <motion.div
              onClick={(e) => commingOption(e)}
              id="משפחה"
              className={`
            ${screenWidth >= 1536 ? "" : ""}
            col-start-1 row-start-2 rounded-full flex items-center justify-center  justify-self-center shadow-1 w-28 h-28 self-end bg-white mb-14 md:w-[172px] md:h-[172px] md:p-2 2xl:w-[172px] 2xl:h-[172px] 2xl:bg-yellow-col
            `}
            >
              <p className="pointer-events-none font-bold tracking-widest text-lg text-center md:text-[24px]">
                עם המשפחה
              </p>
            </motion.div>
            <motion.div
              onClick={(e) => commingOption(e)}
              id="בעצמו"
              className={`${screenWidth >= 1536 ? "" : ""}
            col-start-2 row-start-2 rounded-full flex items-center justify-center justify-self-center shadow-1 w-28 h-28 self-end bg-white mb-14 md:w-[172px] md:h-[172px] 2xl:w-[172px] 2xl:h-[172px] 2xl:bg-yellow-col
            `}
            >
              <p className="pointer-events-none font-bold tracking-widest text-lg md:text-[24px]">
                בעצמי
              </p>
            </motion.div>
            <motion.div
              onClick={(e) => commingOption(e)}
              id="בן/ת זוג"
              className={`${screenWidth >= 1536 ? "" : ""}
            col-start-1 col-span-2 row-start-3 self-start rounded-full flex items-center justify-center justify-self-center shadow-1 w-28 h-28 bg-white md:w-[172px] md:h-[172px] 2xl:w-[172px] 2xl:h-[172px]  2xl:bg-yellow-col
            `}
            >
              <p className="pointer-events-none font-bold tracking-widest text-lg text-center md:text-[24px]">
                עם בן/ת הזוג
              </p>
            </motion.div>
            <motion.p
              onClick={(e) => commingOption(e)}
              id="אחר"
              className={`${screenWidth >= 1536 ? "" : ""}
            font-bold row-start-4 col-start-1 col-span-2 justify-self-center tracking-widest text-black/80 self-start md:text-[24px] md:self-center 2xl:text-[24px] 2xl:mb-5 2xl:self-end
            `}
            >
              ....אחר
            </motion.p>
          </div>
        )}

        {/* Second qna */}
        {commingOpt !== "" && (
          <motion.div
            animate={
              commingOpt === "blink"
                ? { opacity: 0, pointerEvents: "none" }
                : commingOpt !== ""
                ? { opacity: 1, pointerEvents: "auto" }
                : { opacity: 0, pointerEvents: "none" }
            }
            className="opacity-0 pointer-events-none w-full h-5/6 row-start-2 row-span-4 col-start-1 col-span-4 flex flex-col self-end md:self-start 2xl:self-end items-center relative gap-7"
          >
            <div className="w-[318px] h-[180px] flex items-center justify-center relative 2xl:w-full">
              <div className="w-full h-[40px] relative 2xl:h-[50px]">
                <input
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  className="w-full h-full text-center rounded-lg border-2 border-black shadow-1"
                />
                <label className="absolute -top-4 right-2 bg-white px-2 border-2 border-black rounded-lg">
                  שמך המלא
                </label>
              </div>
            </div>
            {
              /*prettier-ignore*/
              commingOpt !== "בעצמו" && commingOpt !== "בן/ת זוג" && 
              <div className="w-[318px] h-[180px] flex items-center justify-center 2xl:w-full">
                <div className="w-full h-[40px] relative 2xl:h-[50px]">
                <input
                  type="number"
                  onChange={(e) => setNuber(e.target.value)}
                  value={number}
                  className="w-full h-full text-center rounded-lg border-2 border-black shadow-1"
                />
                <label className="absolute -top-4 right-2 bg-white px-2 border-2 border-black rounded-lg">
                  כמה אתם
                </label>
                </div>
              </div>
            }
            <div className="w-[318px] h-[180px] flex items-center justify-center relative 2xl:w-full">
              <div className="w-full h-[40px] relative 2xl:h-[50px]">
                <select
                  type="text"
                  onChange={(e) => setRelation(e.target.value)}
                  value={relation}
                  className="w-full h-full text-center rounded-lg border-2 border-black shadow-1"
                >
                  <option value="משפחה">משפחה</option>
                  <option value="חברים">חברים</option>
                  <option value="אחר">...אחר</option>
                </select>
                <label className="absolute -top-4 right-2 bg-white px-2 border-2 border-black rounded-lg">
                  מהי הקרבה שלך למזמין
                </label>
              </div>
            </div>
            {
              /*prettier-ignore*/
              info && info.invRison === "Hatona" || info && info.invRison === "Hina" && 
            <div className="w-[318px] h-full flex items-center justify-center relative 2xl:w-full">
            <div className="w-full h-[40px] relative 2xl:h-[50px]">
            <select
              type="text"
              onChange={(e) => setSide(e.target.value)}
              value={side}
              className="w-full h-full text-center rounded-lg border-2 border-black shadow-1"
            >
              <option value="default">בחר צד</option>
              <option value="חתן">חתן</option>
              <option value="כלה">כלה</option>
            </select>
            <label className="absolute -top-4 right-2 bg-white px-2 border-2 border-black rounded-lg">
              מצד של מי אתה
            </label>
            </div>
          </div>
            }
            <div className="w-[318px] h-full flex items-center justify-center relative 2xl:w-full">
              <textarea
                onChange={(e) => setMassage(e.target.value)}
                value={massage}
                placeholder="*לא חובה"
                className="w-full h-full text-right overflow-x-hidden p-3 rounded-lg border-2 border-black shadow-1"
              />
              <label className="absolute -top-4 right-2 bg-white px-2 border-2 border-black rounded-lg">
                הודעה ממך למזמין
              </label>
            </div>
            <button
              type="submit"
              className="absolute -bottom-16 bg-gray-500 font-bold tracking-widest rounded-md text-white shadow-1 w-[172px] h-[43px] text-[24px] 2xl:text-[32px] 2xl:w-[294px] 2xl:h-[46px]"
            >
              אישור
            </button>
          </motion.div>
        )}
      </motion.form>
      {commingOpt === "blink" && (
        <div
          className={`${
            commingOpt === "blink"
              ? "pointer-events-auto z-10"
              : "pointer-events-none z-0"
          } w-full bg-black/50 rounded-xl h-full flex items-center justify-center absolute top-0 right-0 2xl:bg-transparent 2xl:backdrop-blur-sm`}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white relative">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -720 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.2,
              }}
            >
              <RefreshIcon className="w-6" />
            </motion.div>
            <p className="absolute -bottom-8 bg-white rounded-md px-2 font-bold">
              ....טוען
            </p>
          </div>
        </div>
      )}
      <div
        onClick={() => exitButtHandler()}
        className={`
        ${screenWidth >= 1536 && commingOpt === "" && "opacity-0"}
        ${
          screenWidth >= 1536
            ? "-bottom-10"
            : "top-16 left-0 h-[34px] w-[48px] bg-white shadow-1"
        }
        ${
          commingOpt === "blink"
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto"
        } absolute z-50   flex items-center  justify-center rounded-r-xl`}
      >
        {commingOpt === "" ? (
          <XIcon className="w-[20px] pointer-events-none 2xl:opacity-0 2xl:pointer-events-none" />
        ) : (
          <div className="pointer-events-none">
            {screenWidth < 1536 && (
              <ReplyIcon className="w-[20px] pointer-events-none" />
            )}
            {screenWidth >= 1536 && (
              <p className="font-bold text-[24px] text-black/80">חזרה אחורה</p>
            )}
          </div>
        )}
      </div>
      <motion.div
        animate={
          IsError
            ? { y: 0, scale: 1, opacity: 1, pointerEvents: "auto" }
            : { y: -20, scale: 0.7, opacity: 0, pointerEvents: "none" }
        }
        className="opacity-0 pointer-events-none absolute -bottom-24 w-full h-14 bg-white rounded-lg shadow-1 flex items-center justify-center p-2 text-center"
      >
        {errorMass}
      </motion.div>
    </motion.div>
  );
}

export default TamplateController;
