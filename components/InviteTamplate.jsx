import { MenuIcon } from "@heroicons/react/solid";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SliderPicker } from "react-color";
import DefaultINV from "./inviteTamplates/DefaultINV";
import SaveTheDate from "./inviteTamplates/SaveTheDate";

function NewInviteTamplate({
  setIsDesigning,
  infoObj,
  elementObj,
  setElementObj,
  handleSubmit,
  invStyle,
  setInvStyle,
}) {
  const [windowWidth, setWindowWidth] = useState(0);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    windowWidth === 0 && handleResize();
    window.addEventListener("resize", handleResize, false);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [isPicker, setIsPicker] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  const [invStyleArr, setInvStyleArr] = useState([]);

  const handleChangeComplete = (color) => {
    if (isSelected === "רקע") {
      setElementObj({
        ...elementObj,
        bgTemp: {
          red: color.rgb.r,
          green: color.rgb.g,
          blue: color.rgb.b,
        },
      });
    }
    if (isSelected === "טקסט") {
      setElementObj({
        ...elementObj,
        textColTemp: {
          red: color.rgb.r,
          green: color.rgb.g,
          blue: color.rgb.b,
        },
      });
    }
  };

  useEffect(() => {
    switch (invStyle) {
      case "default":
        setInvStyleArr(
          <DefaultINV
            info={{
              fontSize: elementObj.fontSize.regular,
              titleSize: elementObj.fontSize.bold,
              textColor: elementObj.textCol,
              bgColor: elementObj.bg,
              isMale: elementObj.isMale,
              type: infoObj.type,
              name: infoObj.name,
              age: infoObj.age,
              addres: infoObj.addres,
              date: infoObj.date,
              time: infoObj.time,
            }}
            active={true}
          />
        );
        break;
      case "SaveTheDate":
        setInvStyleArr(
          <SaveTheDate
            info={{
              fontSize: elementObj.fontSize.regular,
              titleSize: elementObj.fontSize.bold,
              textColor: elementObj.textCol,
              bgColor: elementObj.bg,
              isMale: elementObj.isMale,
              type: infoObj.type,
              name: infoObj.name,
              age: infoObj.age,
              addres: infoObj.addres,
              date: infoObj.date,
              time: infoObj.time,
            }}
            isOpen={isOpen}
            active={true}
          />
        );
        break;
    }
  }, [invStyle, elementObj]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="absolute opacity-0 w-full h-full shadow-25 bg-per/80 bottom-0 z-10 backdrop-blur-[3px] rounded-t-[5px] flex flex-col items-center justify-between py-[20px] md:justify-center md:space-y-[10px] 2xl:bg-transparent 2xl:backdrop-blur-none 2xl:pointer-events-none"
    >
      <motion.div
        animate={{
          backgroundColor: `rgb(${elementObj.bg.red} ${elementObj.bg.green} ${elementObj.bg.blue})`,
          scale: [0.75, 1],
        }}
        transition={{ scale: { duration: 0.5 } }}
        className="bg-gray-300 scale-75 w-[325px] h-[700px] rounded-[5px] shadow-25 relative md:ml-[335px] 2xl:self-start 2xl:ml-[400px] 2xl:pointer-events-auto"
      >
        {/* tamplate go here */}
        <div className="w-full h-full max-h-max bg-black/50 rounded-[5px]">
          {invStyleArr}
        </div>
        <motion.div
          animate={
            isOpen && isSelected && windowWidth < 768
              ? { height: "369px" }
              : isOpen && windowWidth < 768
              ? { height: "157px", pointerEvents: "auto" }
              : windowWidth >= 768
              ? { height: "100%", pointerEvents: "auto" }
              : { height: 0, pointerEvents: "none" }
          }
          className="absolute bg-per-a w-full h-0 bottom-0 rounded-[5px] overflow-hidden md:top-0 md:right-[335px]"
        >
          {/* main menu */}
          <motion.div
            animate={
              isSelected
                ? { display: "none" }
                : isOpen && windowWidth < 768
                ? { opacity: 1, display: "flex" }
                : windowWidth >= 768
                ? { opacity: 1, display: "flex" }
                : { opacity: 0 }
            }
            transition={
              isOpen
                ? { opacity: { duration: 0.5 } }
                : { opacity: { duration: 0 } }
            }
            className="w-full h-full opacity-0 flex flex-col items-center justify-between p-[10px] md:justify-start"
          >
            <p className="text-white text-[30px]">תפריט השינויים</p>
            <div className="w-full h-[88px] gap-[7px] grid grid-cols-3 overflow-y-auto md:h-max">
              <div
                onClick={() =>
                  setElementObj({ ...elementObj, isMale: !elementObj.isMale })
                }
                className={`${
                  infoObj.type === "יום הולדת" ? "flex" : "hidden"
                } bg-white w-full h-[88px] rounded-[5px] flex-col items-center justify-center cursor-pointer`}
              >
                <p className="text-center w-full pointer-events-none">
                  מין ההזמנה
                </p>
                <p className="pointer-events-none bg-gray-200 px-2 text-black/60 rounded-[5px]">
                  {elementObj.isMale ? "זכר" : "נקבה"}
                </p>
              </div>
              <div
                onClick={() => setIsSelected("סיגנונות")}
                className="bg-white w-full h-[88px] rounded-[5px] flex items-center justify-between cursor-pointer"
              >
                <p className="text-center w-full pointer-events-none">
                  סיגנונות הזמנה
                </p>
              </div>
              <div
                onClick={() => setIsSelected("טקסט")}
                className="bg-white w-full h-[88px] rounded-[5px] flex items-center justify-between cursor-pointer"
              >
                <p className="text-center w-full pointer-events-none">טקסט</p>
              </div>
              <div
                onClick={() => setIsSelected("רקע")}
                className="bg-white w-full h-[88px] rounded-[5px] flex items-center justify-between cursor-pointer"
              >
                <p className="text-center w-full pointer-events-none">
                  צבע הרקע
                </p>
              </div>
            </div>
          </motion.div>
          {/*סיגנונות */}
          <motion.div
            animate={
              isSelected === "סיגנונות"
                ? { display: "flex" }
                : { display: "none" }
            }
            className="w-full h-full flex flex-col text-white p-[10px] space-y-[12px]"
          >
            <p className="w-full text-center text-[30px]">סיגנונות ההזמנה</p>
            <div className="w-full h-full overflow-y-auto space-y-[10px]">
              <motion.div
                animate={
                  invStyle === "default"
                    ? { backgroundColor: "#8E00D0" }
                    : { backgroundColor: "rgb(255 255 255)" }
                }
                onClick={() => setInvStyle("default")}
                className="w-full h-[88px] bg-white rounded-[5px] relative"
              >
                <div className="w-full h-full absolute bottom-0 rounded-[5px] bg-gradient-to-t from-per/80 via-transparent to-transparent text-black flex items-end justify-center text-[14px] pointer-events-none">
                  <p>ברירת מחדל</p>
                </div>
              </motion.div>
              <motion.div
                animate={
                  invStyle === "SaveTheDate"
                    ? { backgroundColor: "#8E00D0" }
                    : { backgroundColor: "rgb(255 255 255)" }
                }
                onClick={() => setInvStyle("SaveTheDate")}
                className="w-full h-[88px] bg-white rounded-[5px] relative"
              >
                <div className="w-full h-full absolute bottom-0 rounded-[5px] bg-gradient-to-t from-per/80 via-transparent to-transparent text-black flex items-end justify-center text-[14px] pointer-events-none">
                  <p>Save The Date</p>
                </div>
              </motion.div>
              <div className="w-full h-[88px] bg-white rounded-[5px] relative">
                <div className="w-full h-full absolute bottom-0 rounded-[5px] bg-gradient-to-t from-per/80 via-white to-white text-black flex items-end justify-center text-[14px]">
                  <p>שם הסגנון</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[45px] flex text-black space-x-[12px]">
              <div className="w-[98px] h-full bg-white shadow-25 rounded-[5px] flex items-center justify-center">
                <p className="pointer-events-none">אישור</p>
              </div>
              <div
                onClick={() => setIsSelected("")}
                className="w-[74px] h-full bg-white shadow-25 rounded-[5px] flex items-center justify-center"
              >
                <p className="pointer-events-none">ביטול</p>
              </div>
            </div>
          </motion.div>
          {/*טקסט */}
          <motion.div
            animate={
              isSelected === "טקסט" ? { display: "flex" } : { display: "none" }
            }
            className="w-full h-full flex flex-col text-white p-[10px] space-y-[12px]"
          >
            <p className="w-full text-center text-[30px]">טקסט</p>
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-[88px] flex justify-between">
                <motion.div
                  animate={{
                    color: `rgb(${elementObj.textColTemp.red} ${elementObj.textColTemp.green} ${elementObj.textColTemp.blue})`,
                  }}
                  className="bg-white w-[98px] h-full rounded-[5px] relative flex items-center justify-center"
                >
                  <motion.p
                    animate={{ fontSize: `${elementObj.fontSize.regular}px` }}
                  >
                    <motion.span
                      animate={{ fontSize: `${elementObj.fontSize.bold}px` }}
                    >
                      א
                    </motion.span>
                    א
                  </motion.p>
                  <div className="w-full h-full absolute bottom-0 rounded-[5px] bg-gradient-to-t from-per/80 via-transparent to-transparent flex items-end justify-center text-[14px] text-black/80">
                    <p>שינוי הגופן</p>
                  </div>
                </motion.div>
                <div className="w-[171px] h-full flex flex-col items-center justify-evenly text-[14px] text-white/80">
                  <p>שינויי גודל הטקסט</p>
                  <input
                    type="range"
                    className="w-full"
                    min="1"
                    max="2"
                    step="0.1"
                    onChange={(e) =>
                      setElementObj({
                        ...elementObj,
                        fontSize: {
                          regular: 16 * e.target.value,
                          bold: 30 * e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
              <div
                className={`w-full h-[148px] flex flex-row-reverse justify-between relative`}
              >
                <motion.div
                  animate={{
                    backgroundColor: `rgb(${elementObj.textColTemp.red} ${elementObj.textColTemp.green} ${elementObj.textColTemp.blue})`,
                  }}
                  className="bg-white w-[98px] h-full rounded-[5px] relative text-black flex items-center justify-center"
                >
                  <div
                    onClick={() => setIsPicker(!isPicker)}
                    className="w-full h-full absolute bottom-0 rounded-[5px] bg-gradient-to-t from-per/80 via-transparent to-transparent flex items-end justify-center text-[14px] text-black/80"
                  >
                    <p className="pointer-events-none">שינוי הצבע</p>
                  </div>
                </motion.div>
                <motion.div
                  animate={
                    isPicker
                      ? { y: 0, opacity: 1, pointerEvents: "auto" }
                      : { y: -20, opacity: 0, pointerEvents: "none" }
                  }
                  className="absolute bottom-[60px] left-0 z-10 w-[210px] h-[150px] p-[10px]"
                >
                  <div className="w-full h-full flex items-center bg-per/80 backdrop-blur-sm rounded-[5px] shadow-25">
                    <div className="w-full h-max p-2">
                      <SliderPicker
                        color={{
                          r: elementObj.textColTemp.red,
                          g: elementObj.textColTemp.green,
                          b: elementObj.textColTemp.blue,
                        }}
                        onChangeComplete={handleChangeComplete}
                      />
                    </div>
                  </div>
                </motion.div>
                <div className="w-[171px] h-full flex flex-col items-center justify-evenly text-[14px] text-white/80">
                  <p>שינויי צבע הטקסט</p>
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="255"
                    value={elementObj.textColTemp.red}
                    onChange={(e) =>
                      setElementObj({
                        ...elementObj,
                        textColTemp: {
                          red: e.target.value,
                          green: elementObj.textColTemp.green,
                          blue: elementObj.textColTemp.blue,
                        },
                      })
                    }
                  />
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="255"
                    value={elementObj.textColTemp.green}
                    onChange={(e) =>
                      setElementObj({
                        ...elementObj,
                        textColTemp: {
                          red: elementObj.textColTemp.red,
                          green: e.target.value,
                          blue: elementObj.textColTemp.blue,
                        },
                      })
                    }
                  />
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="255"
                    value={elementObj.textColTemp.blue}
                    onChange={(e) =>
                      setElementObj({
                        ...elementObj,
                        textColTemp: {
                          red: elementObj.textColTemp.red,
                          green: elementObj.textColTemp.green,
                          blue: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[45px] flex text-black space-x-[12px]">
              <div
                onClick={() => {
                  setElementObj({
                    ...elementObj,
                    textCol: {
                      red: elementObj.textColTemp.red,
                      green: elementObj.textColTemp.green,
                      blue: elementObj.textColTemp.blue,
                    },
                  });
                  setIsSelected("");
                }}
                className="w-[98px] h-full bg-white shadow-25 rounded-[5px] flex items-center justify-center"
              >
                <p className="pointer-events-none">אישור</p>
              </div>
              <div
                onClick={() => {
                  setIsSelected("");
                  setElementObj({
                    ...elementObj,
                    textColTemp: {
                      red: elementObj.textCol.red,
                      green: elementObj.textCol.green,
                      blue: elementObj.textCol.blue,
                    },
                  });
                }}
                className="w-[74px] h-full bg-white shadow-25 rounded-[5px] flex items-center justify-center"
              >
                <p className="pointer-events-none">ביטול</p>
              </div>
            </div>
          </motion.div>
          {/*רקע */}
          <motion.div
            animate={
              isSelected === "רקע" ? { display: "flex" } : { display: "none" }
            }
            className="w-full h-full flex flex-col text-white p-[10px] space-y-[12px]"
          >
            <p className="w-full text-center text-[30px]">צבע הרקע</p>
            <div className="w-full h-full flex flex-col">
              <motion.div
                animate={{
                  backgroundColor: `rgb(${elementObj.bgTemp.red} ${elementObj.bgTemp.green} ${elementObj.bgTemp.blue})`,
                }}
                className="w-full h-[88px] bg-white rounded-[5px] relative"
              >
                <div
                  onClick={() => setIsPicker(!isPicker)}
                  className="w-full h-full absolute bottom-0 rounded-[5px] bg-gradient-to-t from-per/80 via-transparent to-transparent flex items-end justify-center text-[14px] text-black/80"
                >
                  <p>שינוי צבע הרקע</p>
                  <motion.div
                    animate={
                      isPicker
                        ? { y: 0, opacity: 1, pointerEvents: "auto" }
                        : { y: -20, opacity: 0, pointerEvents: "none" }
                    }
                    className="absolute -bottom-[88px] z-10 w-full h-full p-[10px]"
                  >
                    <div className="w-full h-full flex items-center bg-per rounded-[5px] shadow-25">
                      <div className="w-full h-max p-2">
                        <SliderPicker
                          color={{
                            r: elementObj.bgTemp.red,
                            g: elementObj.bgTemp.green,
                            b: elementObj.bgTemp.blue,
                          }}
                          itemId={"bg"}
                          onChangeComplete={handleChangeComplete}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                animate={
                  isPicker ? { filter: "blur(8px)" } : { filter: "blur(0px)" }
                }
                className="w-full h-[148px] flex flex-row-reverse justify-between"
              >
                <div className="w-full h-full flex flex-col items-center justify-evenly text-[14px] text-white/80 relative">
                  <p>שינויי צבע הרקע</p>
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="255"
                    value={elementObj.bgTemp.red}
                    onChange={(e) =>
                      setElementObj({
                        ...elementObj,
                        bgTemp: {
                          red: e.target.value,
                          green: elementObj.bgTemp.green,
                          blue: elementObj.bgTemp.blue,
                        },
                      })
                    }
                  />
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="255"
                    value={elementObj.bgTemp.green}
                    onChange={(e) =>
                      setElementObj({
                        ...elementObj,
                        bgTemp: {
                          red: elementObj.bgTemp.red,
                          green: e.target.value,
                          blue: elementObj.bgTemp.blue,
                        },
                      })
                    }
                  />
                  <input
                    type="range"
                    className="w-full"
                    min="0"
                    max="255"
                    value={elementObj.bgTemp.blue}
                    onChange={(e) =>
                      setElementObj({
                        ...elementObj,
                        bgTemp: {
                          red: elementObj.bgTemp.red,
                          green: elementObj.bgTemp.green,
                          blue: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </motion.div>
            </div>
            <div className="w-full h-[45px] flex text-black space-x-[12px]">
              <div
                onClick={() => {
                  setElementObj({
                    ...elementObj,
                    bg: {
                      red: elementObj.bgTemp.red,
                      green: elementObj.bgTemp.green,
                      blue: elementObj.bgTemp.blue,
                    },
                  });
                  setIsSelected("");
                }}
                className="w-[98px] h-full bg-white shadow-25 rounded-[5px] flex items-center justify-center"
              >
                <p className="pointer-events-none">אישור</p>
              </div>
              <div
                onClick={() => {
                  setIsSelected("");
                  setElementObj({
                    ...elementObj,
                    bgTemp: {
                      red: elementObj.bg.red,
                      green: elementObj.bg.green,
                      blue: elementObj.bg.blue,
                    },
                  });
                }}
                className="w-[74px] h-full bg-white shadow-25 rounded-[5px] flex items-center justify-center"
              >
                <p className="pointer-events-none">ביטול</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="w-[325px] h-[35px] flex items-center justify-between space-x-[14px] md:flex-col-reverse md:h-max 2xl:hidden">
        <div
          onClick={(e) => handleSubmit(e)}
          className="w-[50%] h-full bg-white rounded-[5px] shadow-25 tracking-[0.3em] flex items-center justify-center md:mt-[10px]"
        >
          <p>סיום</p>
        </div>
        <motion.div
          animate={
            isOpen
              ? { backgroundColor: "#8E00D0" }
              : { backgroundColor: "#FFFFFF" }
          }
          onClick={() => {
            setIsOpen(!isOpen);
            isSelected && setIsSelected("");
          }}
          className="w-[50%] h-full bg-white rounded-[5px] shadow-25 flex items-center justify-center md:hidden"
        >
          <MenuIcon className="w-[20px] pointer-events-none" />
        </motion.div>
        <div
          onClick={() => setIsDesigning(false)}
          className="w-[100%] h-full bg-white rounded-[5px] shadow-25 tracking-[0.3em] flex items-center justify-center"
        >
          <p className="pointer-events-none">שינוי פרטים</p>
        </div>
      </div>
    </motion.div>
  );
}

export default NewInviteTamplate;
