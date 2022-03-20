import React, { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getUserLogout } from "../Slices/userSlice";
import { authLogout } from "../Slices/authSlice";
import { allInvList, InvObj } from "../api/inviteApi";
import {
  inviteLogout,
  invitePending,
  inviteInfo,
  inviteFail,
} from "../Slices/inviteSlice";
import {
  ExclamationIcon,
  RefreshIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import Card from "../components/Card";
import Head from "next/head";
import { getUserProfile } from "../Slices/userAction";

function Profile() {
  const { isAuth, error } = useSelector((state) => state.auth);
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      listHandle();
    }
  }, [isAuth]);

  const refresh = {
    open: { rotate: -720 },
    closed: { rotate: 0 },
  };

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    router.push("/");
    dispatch(getUserLogout());
    dispatch(authLogout());
    dispatch(inviteLogout());
  }

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
    <div className="w-full h-screen">
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
      <div
        className="h-1/6 flex flex-col 
            justify-center align-center text-center
            "
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="shadow-try w-5/6 h-20 px-10 flex items-center justify-center bg-yellow-col self-center rounded-2xl md:py-8  "
        >
          <p className="font-bold text-2xl tracking-widest">האזור האישי</p>
        </motion.div>
      </div>
      <div className="w-full h-5/6 grid grid-rows-6 xl:grid-cols-2">
        <div className="row-start-1 col-start-1 justify-self-center self-center w-max text-center xl:col-start-2">
          <p className="">
            שלום, <span className="font-bold">{fullName}</span>
          </p>
          <p className="">אלו הארועים שפתחת</p>
        </div>
        <div className="w-max h-max row-start-1 col-start-1 pb-2 z-10 self-center pl-16 md:justify-self-center md:pl-0 md:pr-80 xl:col-start-2">
          <motion.div
            animate={isLoading ? "open" : "closed"}
            transition={{
              rotate: { type: "spring", bounce: 1, stiffness: 50 },
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
            }}
            variants={refresh}
            className=""
          >
            <RefreshIcon onClick={() => listHandle()} className="w-6" />
          </motion.div>
        </div>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            scale: { type: "spring", bounce: 1, stiffness: 100 },
          }}
          className={`${invInfo.length > 0 ? "flex-col p-2 " : "flex-row"}
                    relative space-y-2 overflow-auto flex outline-4 outline-yellow-col/50 outline-dashed w-5/6 rounded-lg h-5/6 row-start-1 row-span-5 self-end col-start-1 justify-self-center z-10 md:w-1/2 xl:col-start-2`}
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
              <div key={item._id} className="font-bold w-full h-20 min-h-max">
                <div
                  id={item._id}
                  onClick={() => cardHandle(index)}
                  className={`
                                ${item.invRison === "Brit" && "bg-yellow-400"} 
                                ${item.invRison === "Bday" && "bg-orange-400"} 
                                ${item.invRison === "Bat" && "bg-pink-400"}
                                ${item.invRison === "Bar" && "bg-green-400"}
                                ${item.invRison === "Hatona" && "bg-rose-400"}
                                ${item.invRison === "Hina" && "bg-blue-400"}
                                h-20 w-full shadow-lg flex flex-col items-center justify-center rounded-xl`}
                >
                  <p>{item.invRison === "Bday" && "יום ההולדת של"}</p>
                  <p>{item.invRison === "Hatona" && "החתונה של"}</p>
                  <p>{item.invRison === "Hina" && "החינה של"}</p>
                  <p>{item.invRison === "Bar" && "הבר מצווה של"}</p>
                  <p>{item.invRison === "Bat" && "הבת מצווה של"}</p>
                  <p>{item.invRison === "Brit" && "ברית"}</p>
                  {item.names !== "" ? (
                    <p>{item.names}</p>
                  ) : (
                    <p>{item.place}</p>
                  )}
                </div>
              </div>
            ))}
          <motion.div
            animate={
              isLoading
                ? { opacity: 1, pointerEvents: "auto" }
                : { opacity: 0, pointerEvents: "none" }
            }
            className="opacity-0 pointer-events-none absolute -top-2 left-0 w-full h-full flex flex-col items-end justify-end p-2"
          >
            <div className="w-max rounded-xl bg-black flex items-center justify-center text-white text-base p-2">
              <p>טוען</p>
              <ExclamationIcon className="w-6" />
            </div>
          </motion.div>
        </motion.div>
        <div className="flex flex-col row-start-6 col-start-1 w-5/6 h-12 bg-yellow-col shadow-try2 rounded-xl border-black self-center justify-self-center xl:col-span-2">
          <div
            onClick={() => logOut()}
            className="self-center h-full w-1/2 flex justify-center"
          >
            <p className="pointer-events-none self-center text-center font-bold tracking-widest">
              יציאה
            </p>
          </div>
        </div>
      </div>
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
