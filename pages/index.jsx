import { PlusSmIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NewMenu from "../components/Menu";
import indexDownArrowMobile from "../vectors/indexDownArrowMobile.svg";
import indexMegaphone from "../vectors/indexMegaphone.svg";
import indexMegaphoneBackground from "../vectors/indexMegaphoneBackground.svg";
import indexSecondBackground from "../vectors/indexSecondBackground.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../Slices/userAction";
import { motion } from "framer-motion";
import { numberOfEvents } from "../api/inviteApi";

function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, error } = useSelector((state) => state.auth);

  const [eventsNum, setEventsNum] = useState(0);

  useEffect(async () => {
    var localUser = localStorage.getItem("userID");
    var localToken = localStorage.getItem("token");
    if (!eventsNum) {
      try {
        const num = await numberOfEvents();
        setEventsNum(num);
      } catch (error) {
        console.log(error);
      }
    }
    if (isAuth) {
      return;
    }
    if (error === "invalid token") {
      if (localUser && localToken) {
        localStorage.removeItem("userID");
        localStorage.removeItem("token");
      }
      return;
    }
    if (localUser && localToken) {
      try {
        dispatch(getUserProfile());
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }, [error]);
  return (
    <div className="w-full h-[2047px] relative bg-[#EFA332] font-rubik md:h-[1897px] xl:h-max">
      <NewMenu place="home" />

      {/* Content For Not Logged In Accounts */}

      <div className="w-full h-full grid grid-rows-18 grid-cols-1 justify-center">
        {/* First section */}

        <div className="w-full h-full col-start-1 row-start-2 row-span-5 flex flex-col items-center space-y-[32px]">
          <p className="text-[30px] text-center md:text-[50px] md:w-[92%] md:text-right xl:text-[70px] xl:z-10">
            !הדרך החדשה לתכנן אירוע
          </p>
          <p className="w-[86vw] text-center md:w-[581px] md:text-right md:self-end md:mr-[4%] md:z-10 xl:w-[766px]">
            בימים אלו אנחנו מפתחים את הדור החדש של תכנון האירועים שיתאים לכל אחד
            בקלות ובפשטות.
            <br></br> מהי הדרך החדשה? אתם שואלים, התשובה היא האתר שלנו
            <br></br>
            האתר מציע לכל אחד ליצור, לשתף, להזמין ולחגוג אירוע מכל מקום בפשטות
            ובקלות וכל מה שתצטרכו זה את הנייד שלכם! אז תעזבו את הדרך הישנה של
            מכתבים בדואר ותעברו לדרך החדשה של נוחות ופשטות בלי לצאת מהבית.
          </p>
          <div className="hidden md:block md:absolute md:left-0 md:top-[180px] lg:top-[70px] 2xl:hidden">
            <img src={indexMegaphoneBackground} alt="" />
          </div>
          <img
            className="hidden 2xl:block 2xl:absolute 2xl:-top-[32px] 2xl:left-0"
            src={indexSecondBackground}
            alt=""
          />
          <img
            src={indexMegaphone}
            alt=""
            className="hidden md:block md:absolute md:top-[300px] md:-rotate-[40deg] md:left-12 md:w-[347px] md:h-[376px] lg:top-[230px] lg:left-20 2xl:w-[647px] 2xl:h-[647px] 2xl:top-[70px] 2xl:left-[15%]"
          />
          <div className="bg-per w-[92%] h-[148px] rounded-[5px] relative shadow-25 md:w-[331px] md:self-end md:mr-[4%] lg:bg-transparent lg:shadow-none">
            <div className="absolute top-0 bg-white cursor-default pointer-events-none z-10 w-full h-[63px] rounded-t-[5px] shadow-25 md:shadow-none lg:rounded-none lg:rounded-l-[5px] lg:shadow-25">
              <div className="w-full h-full relative flex justify-center">
                <div className="flex self-center justify-center tracking-[0.3em] space-x-2 ">
                  <p className="text-center">אירועים פתוחים כרגע</p>
                  <div className="bg-per px-1 rounded-[5px] self-center flex items-center justify-center">
                    <p className="text-white">{eventsNum}</p>
                  </div>
                </div>
                <div className="absolute bg-white cursor-default pointer-events-none w-[26px] h-[26px] rotate-45 -bottom-[13px] flex items-center justify-center lg:bg-transparent lg:rotate-0 lg:top-[19px] lg:-left-[83px]">
                  <PlusSmIcon className="w-[25px] rotate-45 lg:rotate-0" />
                </div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="absolute top-0 w-full h-full grid grid-rows-5 lg:flex lg:w-[120px] lg:h-[120px] lg:bg-per lg:rounded-full lg:z-10 lg:-top-[25px] lg:-left-[261px] lg:shadow-25"
            >
              <div
                onClick={() =>
                  setTimeout(() => {
                    router.push("/Login");
                  }, 800)
                }
                className="w-full h-full cursor-pointer row-start-3 row-span-3 tracking-[0.3em] text-white text-center flex items-center justify-center lg:tracking-[0px]"
              >
                <p className="mt-3 pointer-events-none lg:mt-0 lg:w-[73px] lg:font-bold">
                  בואו ונוסיף עוד אירוע לאירועים הפתוחים
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Second section */}

        <div className="w-full h-5/6 col-start-1 row-start-6 row-span-9 self-start mt-14 flex flex-col items-center space-y-[32px] lg:mt-[0px]">
          <p className="text-[30px] mt-4 md:text-right md:text-[50px] md:w-[92%] md:z-10 xl:text-[70px]">
            יצירת אירוע
          </p>
          <p className="w-[86vw]  text-center md:text-right md:w-[92%] md:z-10">
            הטבלה פה למטה מציגה את השלבים ליצירת אירוע עם תאורים איך לבצע כל
            שלב.
          </p>
          <div className="w-full h-[688px] grid grid-rows-5 grid-cols-1">
            <div className="w-[75%] h-[536px] text-center text-white relative bg-per row-start-1 row-span-5 col-start-1 self-center justify-self-center border-[4px] border-black rounded-[5px] shadow-25 grid grid-rows-6 grid-cols-1 md:w-[272px]">
              <p className="text-[36px] row-start-2 col-start-1">
                הרשמה / כניסה
              </p>
              <p className="w-[250px] row-start-3 self-end col-start-1 justify-self-center">
                כדי להתחיל ליצור הזמנה ולהנות מכל הטוב שהאתר שלנו מציע חייב
                להיות לכם משתמש
              </p>
              <p className="w-[250px] row-start-4 row-span-3 mb-10 self-center col-start-1 justify-self-center">
                מה שתצטרכו כדי ליצור משתמש הוא רק כמה פרטים אישיים על עצמכם כמו:
                שם מלא, מין, תאריך לידה כתובת המייל שלכם וזהו אתם רשומים. באתר
                שלנו לא צריך לזכור ססמאות!
              </p>
              <img
                alt=""
                src={indexDownArrowMobile}
                className="w-full absolute -bottom-[90px]"
              />
            </div>
            <div className="w-[133px] h-[133px] z-10 shadow-25 bg-yel rounded-full border-[4px] border-black flex items-center justify-center row-start-1 col-start-1 justify-self-center">
              <p className="text-[40px] font-bold">1</p>
            </div>
          </div>
          <p className="w-[86vw]  text-center pt-8 md:text-right md:w-[92%]">
            אחרי שתסיימו את השלבים של יצירת האירוע שלכם, האירוע יופיע באיזור
            האישי שלכם!
            <br></br> ושם תוכלו לראות אותו בכל זמן עד למועד האירוע.
          </p>
        </div>

        {/* Third section*/}

        <div className="row-start-15 row-span-4 col-start-1 w-full h-5/6 self-center mt-7 flex flex-col items-center space-y-[32px] xl:mt-[0px]">
          <p className="text-[30px] md:text-[50px] md:w-[92%] md:text-right md:mt-[56px] xl:mt-0">
            האיזור האישי
          </p>
          <p className="w-[86vw]  text-center md:text-right md:w-[92%]">
            לאחר שתירשמו / תתחברו לאתר יהיה לכם גישה לאיזור אישי משלכם שבוא
            תוכלו למצוא את כל האירועים שיצרתם.
            <br></br> איזור זה כולל הרבה מידע אותו תקבלו מאותם אנשים שהזמנתם
            לאירוע, למשל אם המוזמן מתכוון להגיע לבד ואם לא אז עם מי,
            <br></br> כמות האנשים שמתכוונים להגיע ולבסוף תוכלו לראות הודעות אותם
            שלחו לכם המוזמנים שלכם.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Index;
