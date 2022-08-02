import React from "react";
import NewMenu from "../components/Menu";
import { motion } from "framer-motion";

function Problem() {
  return (
    <div className="w-full h-[923px] relative bg-yel font-rubik md:h-screen">
      <NewMenu place="problem" />
      <div className="w-full h-full overflow-hidden grid grid-rows-18 grid-cols-1 justify-center relative">
        {/* First section */}
        <div className="hidden xl:block xl:w-[800px] xl:h-[1200px] xl:bg-per xl:absolute xl:-rotate-[13deg] xl:right-[65%]"></div>
        <div className="hidden xl:block xl:absolute xl:cursor-default xl:w-[28%] xl:text-white xl:h-full xl:top-0 xl:left-0 xl:text-[500px] xl:flex xl:items-center xl:justify-center">
          <div className="relative">
            <p className="rotate-[5deg] mt-[20px] text-white/60 absolute left-[12px] top-[6px]">
              ?
            </p>
            <p className="rotate-[5deg] mt-[20px]">?</p>
          </div>
          <div className="relative">
            <p className="-rotate-[5deg] mt-[20px] text-white/60 absolute left-[12px] top-[6px]">
              !
            </p>
            <p className="-rotate-[5deg] mt-[20px]">!</p>
          </div>
        </div>
        <div className="w-full h-full mt-3 col-start-1 row-start-3 row-span-15 flex flex-col items-center space-y-[32px] md:row-start-3 md:row-span-16 xl:mt-[73px]">
          <p className="text-[30px] text-center md:text-[50px] md:w-[92%] md:text-right xl:text-[70px]">
            !ספרו לנו מה קרה
          </p>
          <form className="w-full h-[492px] space-y-[15px] flex flex-col items-center md:space-y-[36px] xl:relative">
            <div className="flex flex-col w-[92%] space-y-[15px] md:flex-row-reverse md:space-y-0 md:justify-between md:w-[75%] xl:self-end xl:mr-[4%] xl:w-[55%]">
              <input
                type="text"
                placeholder="שם מלא שלכם"
                className="w-full rounded-t-[5px] h-[63px] text-right px-3 placeholder-black/60 md:w-[25%] md:rounded-bl-[5px]"
              />
              <input
                type="text"
                placeholder="כותרת לבעיה שנתקלתם"
                className="w-full h-[63px] text-right px-3 placeholder-black/60 md:w-[70%] md:rounded-t-[5px] md:rounded-br-[5px]"
              />
            </div>
            <textarea
              placeholder="....פירוט מלא של הבעיה"
              className="w-[92%] rounded-b-[5px] h-[258px] text-right p-3 placeholder-black/60 md:w-[75%] xl:self-end xl:mr-[4%] xl:w-[55%]"
            />
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-[211px] h-[63px] cursor-pointer flex items-center justify-center bg-white rounded-[5px] md:self-start ml-[4%] md:ml-[12.5%] xl:ml-[41%] xl:absolute xl:-bottom-[99px]"
            >
              <p className="pointer-events-none">שליחת פירוט התקלה</p>
            </motion.div>
          </form>
          <div className="bg-per w-[741px] h-[741px] rounded-full absolute -bottom-[530px] flex flex-col items-center text-white md:w-full md:h-full md:rounded-none md:static md:rounded-t-[35px] md:justify-center xl:bg-transparent xl:justify-start">
            <p className="w-[86vw] text-center mt-6 md:mt-0 xl:w-[425px] xl:self-end xl:mr-[4%]">
              נתקלתם בבעיה?
              <br></br> סביר להניח שאתם לא היחידים שיש להם את הבעיה הספציפית
              הזאת ועוד אנשים חווים את החוויה הלא נעימה שאתם חווים אז בבקשה
              דווחו לנו על התקלה שלכם כדי שנוכל לשפר את הממשק שלנו כדי שנצליח
              להגיע לשלמות ולאיכות מוצר גבוהה!{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Problem;
