import { motion } from "framer-motion";
import {
  CashIcon,
  LightBulbIcon,
  LocationMarkerIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/solid";
import Menu from "../components/Menu";

export default function Home() {
  const variants = {
    firstLoad: { opacity: 1, scale: 1 },
  };

  return (
    <div className="h-screen flex flex-col font-sans overflow-hidden">
      <Menu Page="Main" />
      <div
        className="h-4/6 flex flex-col 
            justify-center align-center text-center bg-transparent
            "
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={"firstLoad"}
          variants={variants}
          className="shadow-try space-y-2 w-5/6 h-5/6 grid bg-yellow-col self-center rounded-2xl"
        >
          <div className="col-start-1 row-start-1 w-max justify-self-center self-start text-4xl space-y-2 pt-5">
            <p className="font-bold">ברוכים הבאים</p>
            <p className="font-bold">לאתר</p>
            <p className="font-logo tracking-widest ">
              הזמנות<span className="text-base">.com</span>
            </p>
          </div>
          <p className="col-start-1 row-start-1 text-lg self-end pb-12 lg:text-2xl lg:pb-14">
            האתר שמציע לכם ליצור הזמנה דיגיטלית
          </p>
          <p className="col-start-1 row-start-1 self-end text-lg pb-5 lg:text-2xl ">
            מעוצבת בכמה פעולות פשוטות וקלילות
          </p>
        </motion.div>
      </div>
      <div className="h-full flex flex-col text-center pt-5 md:grid md:grid-rows-2 md:grid-cols-3">
        <p className="text-2xl text-yellow-col font-bold md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2 md:self-center md:text-5xl md:justify-self-end md:pb-64 md:pr-20 lg:justify-self-center lg:pl-52 xl:justify-self-end xl:text-7xl xl:self-center xl:pb-72 2xl:pl-36 2xl:justify-self-center">
          כמה סיבות
        </p>
        <p className="text-2xl text-yellow-col font-bold md:col-start-2 md:col-span-2 md:row-start-1 md:row-span-2 md:self-center md:text-5xl md:justify-self-end md:pb-32 md:pr-24 lg:justify-self-center lg:pl-52 xl:text-7xl xl:self-center xl:pb-36 2xl:pl-36 ">
          לבחור בנו
        </p>
        <div className="h-80 flex flex-wrap text-lg md:w-4/6 md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2 md:self-start md:text-xl md:mt-5 md:justify-self-center xl:text-4xl xl:w-2/3 xl:h-96 xl:mr-20 2xl:w-2/4 2xl:justify-self-center 2xl:mr-0">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              bounce: 1,
              stiffness: 70,
            }}
            className="h-1/2 w-1/2 flex flex-col text-center"
          >
            <LightBulbIcon className="w-8 self-center py-3" />
            <p>האפליקצייה</p>
            <p className="text-yellow-col font-bold">נוחה ופשוטה</p>
            <p>לכל אדם</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              bounce: 1,
              stiffness: 70,
            }}
            className="h-1/2 w-1/2 flex flex-col text-center"
          >
            <CashIcon className="w-8 self-center py-3" />
            <p>אנחנו</p>
            <p className="text-yellow-col font-bold">חוסכים לכם</p>
            <p>נסיעות ודלק</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              bounce: 1,
              stiffness: 40,
            }}
            className="h-1/2 w-1/2 flex flex-col text-center"
          >
            <LocationMarkerIcon className="w-8 self-center py-3" />
            <p>אפשר להזמין</p>
            <p className="text-yellow-col font-bold">אנשים מחו"ל</p>
            <p>בלחיצת כפתור</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{
              type: "spring",
              bounce: 1,
              stiffness: 40,
            }}
            className="h-1/2 w-1/2 flex flex-col text-center"
          >
            <PresentationChartLineIcon className="w-8 self-center py-3" />
            <p>אפשרות לדעת</p>
            <p>מראש את</p>
            <p>
              כמות <span className="text-yellow-col font-bold">המוזמנים</span>
            </p>
          </motion.div>
        </div>
        <div className="text-lg pt-3 sm:pt-8 md:row-start-2 md:col-start-1 md:col-span-3 md:self-center md:pt-0 md:text-2xl xl:col-start-2 xl:col-span-2 xl:row-start-2 xl:text-3xl xl:justify-self-end xl:pr-14 xl:self-start 2xl:justify-self-center 2xl:pl-32">
          <p className="font-bold">
            בחרתם בנו?{" "}
            <span className="font-normal">אז תתחילו ליצור הזמנה בקלות</span>
          </p>
          <p className="">וניפגש בשמחות</p>
        </div>
      </div>
    </div>
  );
}
