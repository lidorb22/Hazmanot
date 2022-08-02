import {
  ClipboardListIcon,
  LightningBoltIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import React from "react";
import NewMenu from "../components/Menu";
import WebLogo from "../vectors/webLogo.svg";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

function About() {
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <div className="w-full h-[1151px] relative bg-yel font-rubik md:h-[1040px] xl:h-screen">
      <NewMenu place="about" />
      <div className="w-full h-full overflow-hidden grid grid-rows-18 grid-cols-1 justify-center relative">
        {/* First section */}

        <div className="w-full h-full mt-3 col-start-1 items-center row-start-3 row-span-15 flex flex-col xl:row-start-1 xl:row-span-18 xl:relative xl:col-start-1 xl:m-0">
          <div className="w-[92%] h-full flex flex-col space-y-[32px] items-center xl:mr-[4%] xl:self-end xl:mt-[226px] xl:w-[39vw]">
            <p className="text-[30px] text-center md:text-[50px] md:text-right md:w-full xl:text-[70px]">
              ....מי אני
            </p>
            <p className="w-[86vw] text-center md:text-right md:w-full xl:self-end">
              שלום אני אתר הזמנות אונליין!
              <br></br> נוצרתי בשנת 2022 כדי לתת לכל אחד מענה להתפתחות
              הטכנולוגית של ימינו,
              <br></br> יש לי המון תכונות שכנראה יוכלו לעזור לכם, אתם רק צריכים
              להרשם כדי לראות ולחוות אותם!
              <br></br> אתם יכולים לראות מצד שמאל את כל המשתמשים שאני מספק להם
              שירות וגם את חוות הדעת שהם נותנים לי.
              <br></br> אני מאוד אוהב שקיפות ולכן אני מעניק את כל המידע שאותו
              תצטרכו כדי לערוך אירוע מהקצה אל הקצה מבלי לקום
              <br></br> או בכלל לצאת מהדלת של הבית, הכל מופיעה דרך המסך ולכם יש
              את השליטה! אז אני מקווה שתשתמשו בי כראוי ואני תמיד פה כדי להיות
              שלב הפתיחה של כל אירוע שלכם!
              <br></br> נתראה בשמחות :)
            </p>
            {!isAuth && (
              <motion.div
                onClick={() =>
                  setTimeout(() => {
                    router.push("/Login");
                  }, 800)
                }
                whileHover={{ scale: 1.2 }}
                className="shadow-25 tracking-[0.3em] bg-white h-[63px] rounded-[5px] w-[92%] flex items-center justify-center cursor-pointer md:w-[455px] md:self-start"
              >
                <p className="pointer-events-none">שיכנעתי אתכם? תירשמו</p>
              </motion.div>
            )}
          </div>
          <div className="bg-per w-[741px] h-[741px] rounded-full absolute -bottom-[325px] flex flex-col items-center text-white font-bold md:w-[130%] md:h-[1072px] md:-bottom-[610px] xl:-top-[163px] xl:-bottom-0 xl:justify-center xl:items-end xl:w-[1233px] xl:h-[1233px] xl:-left-[503px]">
            <div className="flex flex-col items-center space-y-[18px] md:space-y-[30px] xl:pr-[80px]">
              <img
                alt=""
                src={WebLogo}
                style={{
                  filter: "brightness(0) invert(1)",
                }}
                className="w-[265px] mt-8 md:mt-[50px] xl:w-[596px]"
              />
              <div className="flex flex-col space-y-[18px] md:space-y-[30px] xl:flex-row xl:space-y-0 xl:space-x-[55px]">
                <div className="border-[4px] rounded-[5px] border-dashed border-white w-[170px] h-[65px] flex flex-col items-center justify-center">
                  <div className="flex space-x-1">
                    <p>משתמשים</p>
                    <p>500</p>
                  </div>
                  <UserGroupIcon className="w-[30px]" />
                </div>
                <div className="border-[4px] rounded-[5px] border-dashed border-white w-[170px] h-[65px] flex flex-col items-center justify-center">
                  <div className="flex space-x-1">
                    <p>אירועים פתוחים</p>
                    <p>1452</p>
                  </div>
                  <ClipboardListIcon className="w-[30px]" />
                </div>
                <div className="border-[4px] rounded-[5px] border-dashed border-white w-[170px] h-[65px] flex flex-col items-center justify-center">
                  <div className="flex space-x-1">
                    <p>ברקים</p>
                    <p>5/5</p>
                  </div>
                  <LightningBoltIcon className="w-[30px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
