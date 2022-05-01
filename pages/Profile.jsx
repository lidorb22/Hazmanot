import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { allInvList, InvObj } from "../api/inviteApi";
import { invitePending, inviteInfo, inviteFail } from "../Slices/inviteSlice";
import {
  ExclamationIcon,
  RefreshIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import Card from "../components/Card";
import Head from "next/head";
import { getUserProfile } from "../Slices/userAction";
import WebLogo from "../vectors/webLogo.svg";

function Profile() {
  const { isAuth, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    var localUser = localStorage.getItem("userID");
    var localToken = localStorage.getItem("token");
    if (isAuth) {
      return;
    }
    if (error === "invalid token" || (!localUser && !localToken)) {
      return router.push("/");
    }
    try {
      dispatch(getUserProfile());
    } catch (error) {
      console.log(error);
    }
  }, [error]);

  const [isLookingCard, setIsLookingCard] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const { fullName, _id } = useSelector((state) => state.user.user);
  const { invInfo, isLoading } = useSelector((state) => state.invite);

  useEffect(() => {
    if (isAuth) {
      listHandle();
    }
  }, [isAuth]);

  const refresh = {
    open: { rotate: -720 },
    closed: { rotate: 0 },
  };

  async function listHandle() {
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

  function cardHandle(index) {
    setIsLookingCard(true);
    setCardIndex(index);
  }

  return (
    <div
      className={`w-full h-screen bg-gradient-to-b from-white to-yellow-col/80 overflow-y-auto 2xl:bg-gradient-to-l relative`}
    >
      <Head>
        <title>האזור האישי</title>
        <meta name="title" content="האזור האישי" />
        <meta
          name="description"
          content="האזור האישי - כאן תוכל לגשת לכל ההזמנות ולדעת מי מגיע אלייך לאירוע"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hazmanot.netlify.app/" />
        <meta property="og:title" content="האזור האישי" />
        <meta
          property="og:description"
          content="האזור האישי - כאן תוכל לגשת לכל ההזמנות ולדעת מי מגיע אלייך לאירוע"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hazmanot.netlify.app/" />
        <meta property="twitter:title" content="האזור האישי" />
        <meta
          property="twitter:description"
          content="האזור האישי - כאן תוכל לגשת לכל ההזמנות ולדעת מי מגיע אלייך לאירוע"
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />
      </Head>
      <Menu Page="Profile" />
      <div className="w-full h-full flex flex-col items-center justify-center md:grid md:grid-rows-6 2xl:grid-cols-2">
        <p className="md:row-start-1 md:col-start-1 md:self-end md:justify-self-center text-[40px] font-bold md:text-[72px] 2xl:w-[474px] 2xl:h-[113px] 2xl:bg-yellow-col/80 2xl:text-center 2xl:rounded-xl 2xl:col-start-2 2xl:row-start-1 2xl:row-span-5 2xl:self-center">
          האזור האישי
        </p>
        <p className="md:row-start-2 md:col-start-1 md:self-end md:justify-self-center text-[20px] w-[311px] text-center md:text-[36px] md:w-[633px] 2xl:col-start-2 2xl:row-start-2 2xl:row-span-5 2xl:self-center">
          {fullName}, כאן תוכל לראות את כל ההזמנות שיצרת ולבדוק מי אישרו את
          הגעתם לאירועים שלך
        </p>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            scale: { type: "spring", bounce: 1, stiffness: 100 },
          }}
          className={`${
            invInfo.length > 0 ? "flex-col p-[20px] " : "flex-row"
          } ${invInfo.length >= 5 ? "overflow-auto" : "overflow-hidden"}
                    relative space-y-[20px] bg-white flex w-[300px] rounded-xl h-[450px] md:row-start-2 md:row-span-5 md:self-center md:mt-20 md:self-start md:col-start-1 md:justify-self-center z-10 md:w-[538px] 2xl:h-[781px] 2xl:row-start-1 2xl:mt-52`}
        >
          {invInfo.length === 0 && (
            <div className="justify-self-center self-center w-full">
              <div className="w-full flex flex-col items-center">
                <p className="bg-black text-white font-bold tracking-widest text-center px-10 py-3 rounded-md">
                  לא נמצאו אירועים
                </p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    scale: { type: "spring", bounce: 1, stiffness: 50 },
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                  }}
                >
                  <XCircleIcon className="w-10 text-black" />
                </motion.div>
              </div>
            </div>
          )}
          {invInfo.length > 0 &&
            invInfo.map((item, index) => (
              <div
                key={item._id}
                className="font-bold w-full h-20 min-h-max cursor-pointer"
              >
                <div
                  id={item._id}
                  onClick={() => cardHandle(index)}
                  className={`bg-yellow-col/80 text-[20px] h-20 w-full shadow-lg flex flex-col items-center justify-center rounded-xl`}
                >
                  <p>
                    {item.invRison === "Bday" && `יום ההולדת של ${item.names}`}
                  </p>
                  <p>
                    {item.invRison === "Hatona" && `החתונה של ${item.names}`}
                  </p>
                  <p>{item.invRison === "Hina" && `החינה של ${item.names}`}</p>
                  <p>
                    {item.invRison === "Bar" && `הבר מצווה של ${item.names}`}
                  </p>
                  <p>
                    {item.invRison === "Bat" && `הבת מצווה של ${item.names}`}
                  </p>
                  <p>{item.invRison === "Brit" && `ברית`}</p>

                  <p className="text-[16px] text-black/50">{item.date}</p>
                </div>
              </div>
            ))}
          <motion.div
            animate={
              isLoading
                ? { opacity: 1, pointerEvents: "auto" }
                : { opacity: 0, pointerEvents: "none" }
            }
            className="opacity-0 pointer-events-none absolute -top-5 left-0 w-full h-full flex flex-col items-end justify-end p-2"
          >
            <div className="w-max rounded-xl bg-black flex items-center justify-center text-white text-base p-2">
              <p>טוען</p>
              <ExclamationIcon className="w-6" />
            </div>
          </motion.div>
        </motion.div>
        <div className="mt-2 md:row-start-6 md:justify-self-center md:col-start-1 bg-white rounded-full shadow-1 w-10 h-10 self-center flex items-center justify-center z-20 2xl:row-start-1 2xl:row-span-6 2xl:mr-16 2xl:justify-self-end">
          <motion.div
            animate={isLoading ? "open" : "closed"}
            transition={{
              rotate: { type: "spring", bounce: 1, stiffness: 50 },
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
            }}
            variants={refresh}
            className="self-center"
          >
            <RefreshIcon onClick={() => listHandle()} className="w-6" />
          </motion.div>
        </div>
      </div>
      <img
        alt=""
        src={WebLogo}
        style={{
          filter: "brightness(0) invert(1)",
        }}
        className="w-[80px] absolute bottom-[10px] left-[10px] md:w-[180px] 2xl:opacity-0 pointer-events-none"
      />
      <img
        alt=""
        src={WebLogo}
        className="w-[180px] absolute bottom-[10px] right-[10px] opacity-0 pointer-events-none 2xl:opacity-100 2xl:pointer-events-auto"
      />
      {isLookingCard && !isLoading && (
        <Card
          setIsLookingCard={setIsLookingCard}
          isLookingCard={isLookingCard}
          invId={invInfo[cardIndex]._id}
          userId={invInfo[cardIndex].inviter}
          cardIndex={cardIndex}
        />
      )}
    </div>
  );
}

export default Profile;
