import React, { useState, useEffect } from "react";
import {
  CogIcon,
  PencilIcon,
  XIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";

function Template({
  closeEvent,
  windowWidth,
  eventBool,
  pName,
  age,
  place,
  date,
  time,
  eventName,
  setBackgroundCol,
  setTextCol,
  setFillsCol,
  setTitleText,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOption] = useState("");
  const [change, setChange] = useState({});
  const defualtOptions = {
    color: {
      background: "#FFA800",
      text: "rgb(0 0 0)",
      fills: "rgb(255 255 255)",
    },
    text: {
      title: "הנכם מוזמנים לחגוג עימנו את אירוע",
      gender: "man",
    },
  };

  useEffect(() => {
    setChange(defualtOptions);
  }, []);

  const optionMenusHandler = (e) => {
    switch (selectedOptions) {
      case "bgColor":
        setChange({
          ...change,
          color: {
            background: e.target.id,
            text: change.color.text,
            fills: change.color.fills,
          },
        });
        setShowOptions(false);
        setSelectedOption("");
        break;
      case "bgFill":
        setChange({
          ...change,
          color: {
            background: change.color.background,
            text: change.color.text,
            fills: e.target.id,
          },
        });
        setShowOptions(false);
        setSelectedOption("");
        break;
      case "textColor":
        setChange({
          ...change,
          color: {
            background: change.color.background,
            text: e.target.id,
            fills: change.color.fills,
          },
        });
        setShowOptions(false);
        setSelectedOption("");
        break;
      case "textValue":
        if (e.target.id === "freeText") {
          setChange({
            ...change,
            text: {
              title: e.target.value,
              gender: change.text.gender,
            },
          });
          e.target.value = "";
        } else {
          setChange({
            ...change,
            text: {
              title: e.target.innerHTML,
              gender: change.text.gender,
            },
          });
        }
        setShowOptions(false);
        setSelectedOption("");
        break;
    }
  };

  const optionHandler = (e) => {
    if (e.target.id === "genderChange") {
      if (change.text.gender === "man") {
        setChange({
          ...change,
          text: {
            title: change.text.title,
            gender: "woman",
          },
        });
      } else {
        setChange({
          ...change,
          text: {
            title: change.text.title,
            gender: "man",
          },
        });
      }
      return;
    }
    setSelectedOption(e.target.id);
    setShowOptions(true);
  };

  const menuHandler = (e) => {
    if (showPanel) {
      e.preventDefault();
      return;
    }
    setMenuOpen(!menuOpen);
  };

  const xIconHandler = () => {
    if (showOptions) {
      setSelectedOption("");
      setShowOptions(false);
      return;
    }
    if (showPanel) {
      setShowPanel(false);
      return;
    }
    setBackgroundCol(change.color.background);
    setTextCol(change.color.text);
    setFillsCol(change.color.fills);
    setTitleText(change.text.title);
    setMenuOpen(false);
    closeEvent(false);
  };

  return (
    <motion.div
      animate={
        eventBool || windowWidth >= 1536
          ? { opacity: 1, pointerEvents: "auto" }
          : { opacity: 0, pointerEvents: "none" }
      }
      className="opacity-0 absolute top-0 left-0 h-screen w-full bg-black bg-opacity-70 z-50 flex justify-center items-center 2xl:bg-transparent 2xl:static"
    >
      <motion.div
        animate={eventBool ? { scale: 1 } : { scale: 0.9 }}
        style={{
          color: change.color !== undefined && change.color.text,
          backgroundColor:
            change.color !== undefined && change.color.background,
        }}
        className={`relative h-[650px] w-[300px] rounded-xl flex flex-col items-center justify-center space-y-4`}
      >
        <div className="text-md tracking-widest w-5/6">
          <p>{change.text !== undefined && change.text.title}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <h1 className="text-4xl font-bold tracking-widest">
            {eventName === "Brit"
              ? "הברית"
              : eventName === "Bday"
              ? "יום ההולדת"
              : eventName === "Hatona"
              ? "החתונה"
              : eventName === "Hina"
              ? "החינה"
              : eventName === "Bar"
              ? "בר המצווה"
              : eventName === "Bat"
              ? "בת המצווה"
              : null}
          </h1>
          {pName !== undefined && pName !== "" && (
            <p
              style={{
                backgroundColor:
                  change.color !== undefined && change.color.fills,
              }}
              className={`tracking-widest w-max px-2 rounded-md shadow-1 self-center text-md`}
            >
              של <span className="underline">{pName}</span>
            </p>
          )}
        </div>
        {age !== undefined && age !== "" && (
          <div className="flex flex-col space-y-3">
            <h1 className="text-4xl font-bold tracking-widest">
              {change.text.gender === "man" ? "שחוגג" : "שחוגגת"}
            </h1>
            <div
              style={{
                backgroundColor:
                  change.color !== undefined && change.color.fills,
              }}
              className={`flex items-center justify-center tracking-widest w-[40px] h-[40px] rounded-full shadow-1 self-center text-md`}
            >
              <p>{age}</p>
            </div>
          </div>
        )}
        {date !== undefined && (
          <div className="flex flex-col space-y-3">
            <h1 className="text-4xl font-bold tracking-widest">בתאריך</h1>
            <p className="tracking-widest w-max self-center text-md">
              {date.split("-").reverse().join("-")}
            </p>
          </div>
        )}
        {time !== undefined && (
          <div className="flex flex-col space-y-3">
            <h1 className="text-4xl font-bold tracking-widest">בשעה</h1>
            <p className="tracking-widest w-max self-center text-md">{time}</p>
          </div>
        )}
        {place !== undefined && (
          <div className="flex flex-col space-y-3">
            <h1 className="text-4xl font-bold tracking-widest">יש להגיע</h1>
            <p className="tracking-widest w-[260px] self-center text-md">
              ל{place}
            </p>
          </div>
        )}
        <div className="absolute -bottom-5 left-0 w-full h-12 flex justify-center z-20">
          <div
            onClick={menuHandler}
            className="bg-white w-12 h-12 rounded-full shadow-1 flex justify-center"
          >
            {showPanel ? (
              <PencilIcon className="w-6 text-gray-700 pointer-events-none" />
            ) : menuOpen ? (
              <ChevronDownIcon className="w-6 text-gray-700 pointer-events-none" />
            ) : (
              <CogIcon className="w-6 text-gray-700 pointer-events-none" />
            )}
          </div>
        </div>
        <motion.div
          animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
          className="absolute bottom-0 w-full h-12 rounded-b-xl z-10"
        >
          <motion.div
            animate={
              menuOpen && showPanel
                ? { right: "8.4rem", bottom: "0rem", opacity: 0 }
                : menuOpen
                ? { right: "6rem", bottom: "1rem", opacity: 1 }
                : { right: "8.4rem", bottom: "0rem", opacity: 0 }
            }
            transition={{
              right: { type: "spring", stiffness: 60 },
              bottom: { type: "spring", stiffness: 60 },
            }}
            className="opacity-0 absolute bottom-4 right-24 w-8 h-8 rounded-full bg-white flex justify-center shadow-1"
            onClick={() => setShowPanel(true)}
          >
            <PencilIcon className="w-5 text-gray-700 pointer-events-none" />
          </motion.div>
          <motion.div
            animate={
              menuOpen && windowWidth < 1536
                ? { left: "6rem", bottom: "1rem", opacity: 1 }
                : showPanel && windowWidth >= 1536
                ? { left: "6rem", bottom: "1rem", opacity: 1 }
                : { left: "8.4rem", bottom: "0rem", opacity: 0 }
            }
            transition={{
              left: { type: "spring", stiffness: 60 },
              bottom: { type: "spring", stiffness: 60 },
            }}
            className="opacity-0 absolute bottom-4 left-24 w-8 h-8 rounded-full bg-white flex justify-center shadow-1"
            onClick={xIconHandler}
          >
            <XIcon className="w-5 text-gray-700 pointer-events-none" />
          </motion.div>
        </motion.div>
        <motion.div
          animate={
            showPanel
              ? { opacity: 1, pointerEvents: "auto" }
              : { opacity: 0, pointerEvents: "none" }
          }
          transition={{
            opacity: { type: "spring", stiffness: 60 },
          }}
          className="opacity-0 pointer-events-none backdrop-blur-sm absolute -top-4 w-full h-full bg-black rounded-xl bg-opacity-20 flex flex-col p-3 space-y-3"
        >
          <div
            id="bgColor"
            onClick={optionHandler}
            className="bg-gray-600 bg-opacity-70 w-full h-20 text-white flex flex-row justify-center space-x-5 rounded-2xl"
          >
            <p className="self-center pointer-events-none">צבע הרקע</p>
            <div
              style={{
                backgroundColor:
                  change.color !== undefined && change.color.background,
              }}
              className={`w-16 h-16 rounded-full self-center pointer-events-none`}
            ></div>
          </div>
          <div
            id="bgFill"
            onClick={optionHandler}
            className={`${
              eventName !== undefined &&
              eventName === "Brit" &&
              "pointer-events-none opacity-0 absolute"
            } bg-gray-600 bg-opacity-70 w-full h-20 text-white flex flex-row justify-center space-x-5 rounded-2xl`}
          >
            <p className="self-center pointer-events-none">צבע המילוי</p>
            <div
              style={{
                backgroundColor:
                  change.color !== undefined && change.color.fills,
              }}
              className={`w-16 h-16 rounded-full bg-yellow-col self-center pointer-events-none`}
            ></div>
          </div>
          <div
            id="textColor"
            onClick={optionHandler}
            className="bg-gray-600 bg-opacity-70 w-full h-20 text-white flex flex-row justify-center space-x-5 rounded-2xl"
          >
            <p className={`self-center pointer-events-none`}>צבע הטקסט</p>
            <div
              style={{
                backgroundColor:
                  change.color !== undefined && change.color.text,
              }}
              className={`w-16 h-16 rounded-full bg-yellow-col self-center pointer-events-none`}
            ></div>
          </div>
          <div
            id="textValue"
            onClick={optionHandler}
            className="bg-gray-600 bg-opacity-70 w-full h-20 text-white flex flex-row justify-center space-x-5 rounded-2xl"
          >
            <p className={`self-center pointer-events-none`}>
              שינוי הטקסט העליון
            </p>
          </div>
          <div
            id="genderChange"
            style={{
              backgroundColor:
                change.text !== undefined && change.text.gender === "man"
                  ? "rgb(37 99 235)"
                  : "rgb(244 114 182)",
            }}
            onClick={optionHandler}
            className={`${
              eventName !== undefined &&
              eventName !== "Bday" &&
              "pointer-events-none opacity-0 absolute"
            } bg-gray-600 bg-opacity-70 w-full h-20 text-white flex flex-row justify-center space-x-5 rounded-2xl`}
          >
            <p className={`self-center pointer-events-none`}>
              מין ההזמנה:{" "}
              {change.text !== undefined && change.text.gender === "man"
                ? "גברי"
                : "נשי"}
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={
            showOptions
              ? { opacity: 1, pointerEvents: "auto" }
              : { opacity: 0, pointerEvents: "none" }
          }
          transition={{
            opacity: { type: "spring", stiffness: 60 },
          }}
          className="opacity-0 p-3 bg-black bg-opacity-70 w-full h-full absolute -top-4 rounded-xl overflow-hidden pointer-events-none"
        >
          <motion.div
            animate={
              selectedOptions === "textValue"
                ? { opacity: 1, pointerEvents: "auto" }
                : { opacity: 0, pointerEvents: "none" }
            }
            className="absolute top-0 right-0 opacity-0 pointer-events-none space-y-3 w-full h-full rounded-xl flex flex-col flex-wrap overflow-hidden items-center p-3"
          >
            <div className="bg-gray-300 w-full h-20 flex flex-row justify-center space-x-5 rounded-2xl overflow-hidden">
              <p
                onClick={(e) => optionMenusHandler(e)}
                className={`self-center break-all p-2`}
              >
                אנחנו מזמינים אותכם לחגוג איתנו את
              </p>
            </div>
            <div className="bg-gray-300 w-full h-20 flex flex-row justify-center space-x-5 rounded-2xl overflow-hidden">
              <p
                onClick={(e) => optionMenusHandler(e)}
                className={`self-center break-all p-2`}
              >
                בואו לשמח ולשמוח ביחד איתנו באירוע
              </p>
            </div>
            <div className="bg-gray-300 w-full h-20 flex flex-row justify-center space-x-5 rounded-2xl overflow-hidden">
              <input
                type="text"
                id="freeText"
                onBlur={(e) => optionMenusHandler(e)}
                className="w-5/6 h-10 self-center rounded-xl text-right"
              />
            </div>
          </motion.div>
          <motion.div
            animate={
              selectedOptions === "genderChange"
                ? { opacity: 1, pointerEvents: "auto" }
                : { opacity: 0, pointerEvents: "none" }
            }
            className="absolute top-0 right-0 opacity-0 pointer-events-none space-y-3 w-full h-full rounded-xl flex flex-col flex-wrap overflow-hidden items-center p-3"
          >
            <div className="bg-gray-300 w-full h-20 flex flex-row justify-center space-x-5 rounded-2xl overflow-hidden">
              <p
                id=""
                onClick={(e) => optionMenusHandler(e)}
                className={`self-center break-all p-2`}
              >
                אנחנו מזמינים אותכם לחגוג איתנו את
              </p>
            </div>
          </motion.div>
          <motion.div
            animate={
              selectedOptions === "textValue" || selectedOptions === ""
                ? { opacity: 0, pointerEvents: "none" }
                : { opacity: 1, pointerEvents: "auto" }
            }
            className="absolute top-0 right-0 px-4 pt-16 opacity-0 pointer-events-none space-x-5 w-full h-full rounded-xl flex flex-row flex-wrap overflow-hidden justify-center"
          >
            <div className="w-full h-14 absolute space-x-5 bg-gray-200 top-0 flex items-center justify-center text-3xl font-bold">
              {selectedOptions === "bgColor" ? (
                <div
                  style={{ backgroundColor: change.color.background }}
                  className="w-10 h-10 rounded-full shadow-1"
                ></div>
              ) : selectedOptions === "bgFill" ? (
                <div
                  style={{
                    backgroundColor: change.color.fills,
                    color: change.color.text,
                  }}
                  className="w-20 h-10 rounded-md shadow-1 text-lg flex items-center justify-center"
                >
                  <p
                    className={`${
                      change.color.fills === "rgb(255 255 255)"
                        ? "text-black"
                        : "text-white"
                    }`}
                  >
                    Aa
                  </p>
                </div>
              ) : selectedOptions === "textColor" ? (
                <div
                  style={{
                    color: change.color.text,
                  }}
                  className={`${
                    change.color.text === "rgb(255 255 255)"
                      ? "bg-black"
                      : "bg-white"
                  } w-10 h-10 rounded-md shadow-1 text-lg flex items-center justify-center`}
                >
                  <p>Aa</p>
                </div>
              ) : null}
              <p className="text-black">
                {selectedOptions === "bgColor"
                  ? "צבע הרקע"
                  : selectedOptions === "bgFill"
                  ? "צבע המילוי"
                  : selectedOptions === "textColor"
                  ? "צבע הטסקט"
                  : null}
              </p>
            </div>
            <div
              id="rgb(96 165 250)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-blue-400 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(37 99 235)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-blue-600 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(30 64 175)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-blue-800 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(248 113 113)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-red-400 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(220 38 38)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-red-600 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(153 27 27)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-red-800 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(74 222 128)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-green-400 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(22 163 74)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-green-600 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(22 101 52)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-green-800 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(251 146 60)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-orange-400 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(234 88 12)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-orange-600 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(154 52 18)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-orange-800 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(250 204 21)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-yellow-400 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(202 138 4)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-yellow-600 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(133 77 14)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-yellow-800 w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(255 255 255)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-white w-16 h-16 rounded-full"
            ></div>
            <div
              id="rgb(0 0 0)"
              onClick={(e) => optionMenusHandler(e)}
              className="bg-black w-16 h-16 rounded-full"
            ></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Template;
