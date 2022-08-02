import React, { useEffect, useState } from "react";
import NewMenu from "../components/Menu";
import { useRouter } from "next/router";
import createBackground from "../vectors/createBackground.svg";
import { InformationCircleIcon, MenuIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import NewInviteTamplate from "../components/InviteTamplate";
import { newInvite } from "../api/inviteApi";
import { inviteFail, inviteLink, invitePending } from "../Slices/inviteSlice";

function Create() {
  const { isAuth } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const [eventMenu, setEventMenu] = useState(false);
  const [rison, setRison] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [addres, setAddres] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isDesigning, setIsDesigning] = useState(false);
  const [invStyle, setInvStyle] = useState("default");

  const defaultElementOptions = {
    bg: { red: 215, green: 213, blue: 219 },
    bgTemp: { red: 215, green: 213, blue: 219 },
    textCol: { red: 0, green: 0, blue: 0 },
    textColTemp: { red: 0, green: 0, blue: 0 },
    fontSize: {
      regular: 16,
      bold: 30,
    },
    isMale: true,
  };

  const [elementObj, setElementObj] = useState(defaultElementOptions);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!rison) {
      return;
    }
    switch (rison) {
      case "יום הולדת":
        if (!name || !age || !addres || !date || !time) {
          return;
        }
        break;
      case "חתונה":
      case "חינה":
      case "בר מצווה":
      case "בת מצווה":
        if (!name || !addres || !date || !time) {
          return;
        }
        break;
      case "ברית":
        if (!addres || !date || !time) {
          return;
        }
        break;
    }
    if (rison !== "יום הולדת" && age) {
      setAge(0);
    }
    if (!isDesigning) {
      setIsDesigning(true);
      return;
    }
    dispatch(invitePending());
    var fixedDate = date.split("-").reverse().join("/");
    try {
      const invite = await newInvite({
        type: rison,
        name,
        age,
        addres,
        time,
        date: fixedDate,
        _id,
        bgRed: elementObj.bg.red,
        bgGreen: elementObj.bg.green,
        bgBlue: elementObj.bg.blue,
        textColRed: elementObj.textCol.red,
        textColGreen: elementObj.textCol.green,
        textColBlue: elementObj.textCol.blue,
        regular: elementObj.fontSize.regular,
        bold: elementObj.fontSize.bold,
        isMale: elementObj.isMale,
        invStyle,
      });
      dispatch(inviteLink(invite));
      //router.push("/Links");
    } catch (error) {
      console.log(error);
      dispatch(inviteFail("תקלה ביצירת המודעה"));
    }
  }

  useEffect(() => {
    if (!isDesigning) {
      setElementObj(defaultElementOptions);
    }
  }, [isDesigning]);

  return (
    <div
      className={`${
        isAuth ? "h-screen" : "h-[919px]"
      } w-full relative bg-yel font-rubik md:h-screen`}
    >
      <NewMenu place="create" />
      <div
        className={`w-full h-full overflow-hidden grid grid-rows-18 grid-cols-1 justify-center relative`}
      >
        {/* First section */}
        <img
          src={createBackground}
          className="hidden xl:block xl:absolute xl:top-0 xl:left-0 xl:bottom-0 xl:h-full xl:w-full"
          alt=""
        />
        {!isAuth ? (
          <div className="w-full h-5/6 mt-10 col-start-1 row-start-3 row-span-5 flex flex-col items-center space-y-[32px] md:row-start-3 md:row-span-16 md:h-full">
            <p className="text-[30px] text-center md:text-[50px] md:w-[92%] md:text-right xl:text-[70px] xl:z-10">
              !אנחנו מובילים
            </p>
            <p className="w-[86vw] text-center md:w-[90%] md:text-right xl:z-10 ">
              אז למה בעצם לבחור בשירות שלנו?
              <br></br> אנחנו מצטיינים בנתינת שירותים של הזמנות בכך שכל חלק
              בהזמנה שלכם ניתנת לשינוי ולעיצוב. יש לנו מבחר ענק של דוגמאות
              לעיצוב ההזמנה האישית שלכם ככה שבקלות, פשטות ויצירתיות יהיה לכם
              הזמנה שהאורחים שלכם לא ישכחו!
            </p>
            <p className="text-[30px] text-center md:text-[50px] md:text-right md:w-[92%] xl:text-[70px] xl:z-10">
              מותאמים לכל דבר
            </p>
            <p className="w-[86vw] text-center md:w-[90%] md:text-right xl:z-10">
              עבדנו קשה כדי שההזמנה שלכם תראה טוב בכל הפלטפורמות השונות.
              <br></br> ככה שאתם יכולים ליצור הזמנה מכל מקום בעצם מהמחשב, לפטופ,
              טלפון, טאבלט וכו...
              <br></br>ובכך אתם לא מקובעים על אפשרות אחת!
            </p>
            <div className="bg-per w-[741px] h-[741px] rounded-full absolute -bottom-[47%] flex justify-center md:pt-10 md:bg-transparent md:static md:w-full md:h-full md:rounded-none xl:absolute xl:-top-[32px] xl:rounded-none xl:w-1/2 xl:left-0 xl:items-end">
              <div className="flex flex-col w-[92vw] items-center md:w-full md:h-full md:bg-per md:rounded-t-[35px] xl:border-l-4 xl:border-white/60 xl:h-max xl:pl-[33px] xl:mb-[58px] xl:bg-transparent xl:rounded-none xl:w-max">
                <div className="md:w-[475px] mt-7 xl:mt-0">
                  <p className="text-[100px] text-white font-bold leading-[118px]">
                    +35
                  </p>
                </div>
                <p className="text-[50px] text-white font-bold leading-[59px] md:tracking-[0.3em] xl:ml-0">
                  עיצובים שונים
                </p>
                <motion.div
                  onClick={() =>
                    setTimeout(() => {
                      router.push("/Login");
                    }, 800)
                  }
                  whileHover={{ scale: 1.2 }}
                  className="bg-white rounded-[5px] cursor-pointer px-12 py-3 mt-5 md:py-0 md:px-0 md:h-[63px] md:flex md:items-center md:w-[475px] md:justify-center md:tracking-[0.3em] md:w-full"
                >
                  <p className="pointer-events-none">
                    רוצים ליצור אחד? לחצו כאן
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`${
              isDesigning ? "z-50" : "z-10"
            } w-full h-full mt-10 col-start-1 row-start-3 row-span-16 flex flex-col items-center space-y-[32px] md:row-start-3 md:mt-0 md:row-span-16 md:h-full`}
          >
            <p className="text-[30px] text-center md:text-[50px] md:w-[92%] md:text-right xl:text-[70px] xl:z-10 xl:mt-10">
              !זמן יצירה
            </p>
            <form className="w-[92%] h-max flex flex-col space-y-[18px] md:space-y-[30px] xl:w-[720px] xl:self-end xl:mr-[4%]">
              <div className="relative z-10">
                <input
                  type="text"
                  placeholder="....סוג האירוע"
                  readOnly
                  onClick={() => !isDesigning && setEventMenu(!eventMenu)}
                  value={rison}
                  className="w-full h-[65px] placeholder-black/60 text-right px-3 rounded-[5px] focus:outline-none"
                />
                <motion.div
                  animate={
                    eventMenu
                      ? { height: "214px", bottom: "-210px", display: "flex" }
                      : { height: 0, bottom: 0, display: "none" }
                  }
                  className="absolute w-full h-[214px] bg-per -bottom-[210px] -z-10 rounded-b-[5px] overflow-y-auto flex flex-col items-center space-y-[20px] pt-[20px] pb-[10px] text-white"
                >
                  <p
                    onClick={(e) => {
                      setRison(e.target.id);
                      setEventMenu(false);
                    }}
                    id="יום הולדת"
                    className="h-full border-white/60 border-b w-[90%] flex items-center justify-end cursor-pointer"
                  >
                    יום-הולדת#
                  </p>
                  <p
                    onClick={(e) => {
                      setRison(e.target.id);
                      setEventMenu(false);
                    }}
                    id="בר מצווה"
                    className="h-full border-white/60 border-b w-[90%] flex items-center justify-end cursor-pointer"
                  >
                    בר מצווה#
                  </p>
                  <p
                    onClick={(e) => {
                      setRison(e.target.id);
                      setEventMenu(false);
                    }}
                    id="בת מצווה"
                    className="h-full border-white/60 border-b w-[90%] flex items-center justify-end cursor-pointer"
                  >
                    בת מצווה#
                  </p>
                  <p
                    onClick={(e) => {
                      setRison(e.target.id);
                      setEventMenu(false);
                    }}
                    id="חתונה"
                    className="h-full border-white/60 border-b w-[90%] flex items-center justify-end cursor-pointer"
                  >
                    חתונה#
                  </p>
                  <p
                    onClick={(e) => {
                      setRison(e.target.id);
                      setEventMenu(false);
                    }}
                    id="חינה"
                    className="h-full border-white/60 border-b w-[90%] flex items-center justify-end cursor-pointer"
                  >
                    חינה#
                  </p>
                  <p
                    onClick={(e) => {
                      setRison(e.target.id);
                      setEventMenu(false);
                    }}
                    id="ברית"
                    className="h-full w-[90%] flex items-center justify-end cursor-pointer"
                  >
                    ברית#
                  </p>
                </motion.div>
              </div>
              <motion.div
                animate={
                  rison === "ברית" ? { display: "none" } : { display: "flex" }
                }
                className="flex justify-between w-full h-[65px]"
              >
                <motion.input
                  animate={
                    rison === "יום הולדת" && isDesigning
                      ? {
                          width: "47%",
                          display: "block",
                          backgroundColor: "rgb(203 155 255)",
                        }
                      : rison === "יום הולדת" && !isDesigning
                      ? {
                          width: "47%",
                          display: "block",
                          backgroundColor: "rgb(255 255 255)",
                        }
                      : { width: 0, display: "none" }
                  }
                  type="number"
                  placeholder="....גיל החוגג"
                  onChange={(e) => !isDesigning && setAge(e.target.value)}
                  value={age}
                  className="w-0 hidden h-full placeholder-black/60 text-right px-3 rounded-[5px] focus:outline-none md:w-[48.5%]"
                />
                <motion.input
                  animate={
                    rison === "יום הולדת" && isDesigning
                      ? {
                          width: "47%",
                          display: "block",
                          backgroundColor: "rgb(203 155 255)",
                        }
                      : rison === "יום הולדת" && !isDesigning
                      ? {
                          width: "47%",
                          display: "block",
                          backgroundColor: "rgb(255 255 255)",
                        }
                      : rison !== "ברית" && rison !== "יום הולדת" && isDesigning
                      ? {
                          width: "100%",
                          display: "block",
                          backgroundColor: "rgb(203 155 255)",
                        }
                      : rison !== "ברית" &&
                        rison !== "יום הולדת" &&
                        !isDesigning
                      ? {
                          width: "100%",
                          display: "block",
                          backgroundColor: "rgb(255 255 255)",
                        }
                      : { width: 0, display: "none" }
                  }
                  type="text"
                  placeholder={
                    rison === "יום הולדת" || rison === "בר מצווה"
                      ? "....שם החוגג"
                      : rison === "בת מצווה"
                      ? "....שם החוגגת"
                      : rison === "חתונה" || rison === "חינה"
                      ? "....שמות הזוג המאושר"
                      : "....בחר סוג אירוע"
                  }
                  onChange={(e) =>
                    !isDesigning && rison && setName(e.target.value)
                  }
                  value={name}
                  className="w-full h-full placeholder-black/60 text-right px-3 rounded-[5px] focus:outline-none md:w-[48.5%]"
                />
              </motion.div>
              <motion.input
                animate={
                  isDesigning
                    ? { backgroundColor: "rgb(203 155 255)" }
                    : { backgroundColor: "rgb(255 255 255)" }
                }
                type="text"
                placeholder="....מיקום ושם האירוע"
                onChange={(e) =>
                  !isDesigning && rison && setAddres(e.target.value)
                }
                value={addres}
                className="w-full h-[65px] placeholder-black/60 text-right px-3 rounded-[5px] focus:outline-none"
              />
              <div className="flex justify-between w-full h-[65px]">
                <motion.input
                  animate={
                    isDesigning
                      ? { backgroundColor: "rgb(203 155 255)" }
                      : { backgroundColor: "rgb(255 255 255)" }
                  }
                  type="time"
                  placeholder="....שעות האירוע"
                  onChange={(e) =>
                    !isDesigning && rison && setTime(e.target.value)
                  }
                  value={time}
                  className="w-[47%] h-full placeholder-black/60 text-center px-3 rounded-[5px] focus:outline-none md:w-[48.5%]"
                />
                <motion.input
                  animate={
                    isDesigning
                      ? { backgroundColor: "rgb(203 155 255)" }
                      : { backgroundColor: "rgb(255 255 255)" }
                  }
                  type="date"
                  placeholder="....תאריך האירוע"
                  onChange={(e) =>
                    !isDesigning && rison && setDate(e.target.value)
                  }
                  value={date}
                  className="w-[47%] h-full placeholder-black/60 text-center px-3 rounded-[5px] focus:outline-none md:w-[48.5%]"
                />
              </div>
              <div className="flex justify-center md:justify-start md:flex-row-reverse">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  onClick={(e) => handleSubmit(e)}
                  className="bg-per cursor-pointer shadow-25 text-white flex items-center tracking-[0.3em] justify-center rounded-[5px] w-max px-3 self-center h-[65px] md:px-[0] md:self-end md:w-[250px]"
                >
                  <p className="pointer-events-none">
                    {isDesigning ? "יצירת הזמנה" : "המשך לעיצוב ההזמנה"}
                  </p>
                </motion.div>
                {isDesigning && (
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setIsDesigning(false)}
                    className="hidden 2xl:cursor-pointer 2xl:mr-[30px] 2xl:bg-white 2xl:shadow-25 2xl:flex 2xl:items-center 2xl:tracking-[0.3em] 2xl:justify-center 2xl:rounded-[5px] 2xl:h-[65px] 2xl:self-end 2xl:w-[250px]"
                  >
                    <p className="pointer-events-none">שינוי הפרטים</p>
                  </motion.div>
                )}
              </div>
            </form>
            <div className="w-full h-full flex justify-center md:bg-per md:rounded-t-[35px] md:justify-evenly md:flex-col md:items-center xl:bg-transparent xl:h-max xl:w-[520px] xl:right-[60%] xl:top-[30%] xl:absolute">
              <p className="hidden md:block md:w-full md:text-center md:text-[50px] md:text-white xl:text-[70px]">
                עצות לדרך פשוטה
              </p>
              <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-25 md:w-[215px] md:h-[70px] md:rounded-[5px] md:justify-evenly xl:h-[215px] xl:flex-col-reverse xl:rounded-full xl:justify-center">
                <InformationCircleIcon className="h-[40px] text-per xl:h-[100px]" />
                <p className="hidden xk:block xl:text-[20px]">לחצו כאן למידע</p>
              </div>
            </div>
            {isDesigning && (
              <NewInviteTamplate
                setIsDesigning={setIsDesigning}
                infoObj={{ type: rison, name, age, addres, date, time }}
                elementObj={elementObj}
                setElementObj={setElementObj}
                handleSubmit={handleSubmit}
                invStyle={invStyle}
                setInvStyle={setInvStyle}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;
