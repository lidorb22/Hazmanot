import React, { useEffect, useState } from "react";
import NewMenu from "../components/Menu";
import profileVector from "../vectors/profileVector.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import NewCard from "../components/Card";
import { allInvList, InvObj } from "../api/inviteApi";
import { inviteFail, inviteInfo, invitePending } from "../Slices/inviteSlice";
import NewCardInfo from "../components/CardInfo";
import { motion } from "framer-motion";

function Profile() {
  const { isAuth } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const { _id } = useSelector((state) => state.user.user);
  const { invInfo, isLoading } = useSelector((state) => state.invite);

  const [cardIndex, setCardIndex] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(0);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    windowWidth === 0 && handleResize();
    window.addEventListener("resize", handleResize, false);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function listHandler() {
    if (isLoading) {
      return;
    }
    dispatch(invitePending());
    try {
      const list = await allInvList({ _id });
      if (list.length > invInfo.length) {
        if (invInfo.length === 0) {
          list.forEach(async (item) => {
            const newList = await InvObj({ _id: item });
            dispatch(inviteInfo(newList));
          });
          return;
        } else {
          let arr = [];
          invInfo.forEach((item) => {
            arr.push(item._id);
          });
          const newArr = list.filter((x) => !arr.includes(x));
          newArr.forEach(async (item) => {
            const newList = await InvObj({ _id: item });
            dispatch(inviteInfo(newList));
          });
          return;
        }
      } else {
        setTimeout(function () {
          dispatch(inviteFail("אין הזמנות חדשות"));
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      dispatch(inviteFail("תקלה בהעלאת כל ההזמנות"));
    }
  }

  useEffect(() => {
    if (isAuth) {
      listHandler();
    }
  }, []);

  return (
    <div className="w-full h-screen relative bg-[#EFA332] font-rubik">
      <NewMenu place="profile" />
      <div className="w-full h-full overflow-hidden grid grid-rows-18 grid-cols-1 justify-center relative">
        {/* First section */}

        {!isAuth ? (
          <div className="w-full h-full col-start-1 row-start-4 row-span-15 flex flex-col items-center">
            <div className="w-[92%] h-full flex flex-col items-center space-y-[45px] xl:w-[41vw] xl:self-end xl:mr-[4%]">
              <p className="text-[30px] text-center md:text-[50px] md:w-full md:text-right xl:text-[70px]">
                מרכז השליטה
              </p>
              <p className="w-[86vw] text-center md:w-full md:text-right xl:self-end">
                מכאן הכל יתחיל ויגמר.
                <br></br> תוכלו לראות ולנהל כל אירוע ואירוע שתפתחו, בין אם לסדר
                את השולחנות או רק בשביל להציץ מי וכמה מגיעים לאותו האירוע.
                <br></br> בנוסף תוכלו לבטל את ההזמנה שיצרתם במקרה וטעיתם.
              </p>
              <div className="bg-per w-[216px] h-[216px] shadow-25 rounded-full relative text-white font-bold flex flex-col items-center justify-center md:hidden">
                <div className="absolute bg-yel w-[112px] h-[112px] -right-[4px] -top-[4px]">
                  <div className="w-full h-full absolute -top-3 -right-3 overflow-hidden">
                    <div className="absolute top-0 right-0 bg-per w-[216px] h-[216px] rounded-full"></div>
                  </div>
                </div>
                <p className="z-10 text-[60px] leading-[50px] mt-4">100%</p>
                <p className="z-10 text-[40px] leading-[47px]">שליטה</p>
              </div>
              <motion.div
                onClick={() =>
                  setTimeout(() => {
                    router.push("/Login");
                  }, 800)
                }
                whileHover={{ scale: 1.2 }}
                className="flex shadow-25 items-center justify-center w-full h-[63px] bg-white rounded-[5px] cursor-pointer md:z-10 md:w-[455px] xl:self-start"
              >
                <p className="pointer-events-none">
                  רוצים לשלוט באירועים שלכם? לחצו כאן
                </p>
              </motion.div>
            </div>
            <div className="hidden md:block md:absolute md:w-[572px] md:h-[572px] md:-bottom-4 xl:top-[5vh] xl:left-[2%] xl:w-[750px] xl:h-[750px]">
              <img src={profileVector} alt="" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full col-start-1 row-start-4 row-span-15 flex flex-col items-center">
            <div className="w-[92%] h-full flex flex-col items-center space-y-[45px] xl:w-full xl:pr-[4%]">
              <p className="text-[30px] text-center md:text-[50px] md:w-full md:text-right xl:text-[70px]">
                רשימת האירועים שלך
              </p>
              <motion.div
                animate={
                  windowWidth >= 1280 && !isOpen
                    ? { width: 10, x: -windowWidth / 2 }
                    : { width: "50%", x: 0 }
                }
                transition={
                  isOpen
                    ? { x: { bounce: 0, duration: 1 } }
                    : { x: { bounce: 0, duration: 0 } }
                }
                className="hidden xl:block xl:absolute xl:-top-[45px] xl:right-[62%] xl:w-[50%] xl:h-full xl:bg-per 2xl:right-[52%]"
              ></motion.div>
              <motion.div
                animate={
                  windowWidth >= 1280 && !isOpen
                    ? { x: `${windowWidth / 2 - 720 / 2}px` }
                    : windowWidth >= 1280 && isOpen
                    ? { x: `${windowWidth - 720 - (windowWidth * 4) / 100}px` }
                    : { x: 0 }
                }
                transition={{ alignSelf: { duration: 8, type: "spring" } }}
                className="z-10 w-[92%] h-[75%] rounded-[5px] shadow-25 bg-white p-[18px] space-y-[18px] overflow-y-auto xl:w-[720px] xl:self-start"
              >
                {invInfo.length > 0 &&
                  invInfo.map((item, index) => (
                    <NewCard
                      key={item._id}
                      item={item}
                      index={index}
                      invInfo={invInfo}
                      setIsOpen={setIsOpen}
                      isOpen={isOpen}
                      setCardIndex={setCardIndex}
                    />
                  ))}
              </motion.div>
            </div>
            {isOpen && cardIndex !== undefined && (
              <NewCardInfo
                setIsOpen={setIsOpen}
                selectedInfo={invInfo[cardIndex]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
