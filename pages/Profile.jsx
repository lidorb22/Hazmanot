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
import { RefreshIcon, XCircleIcon } from "@heroicons/react/solid";
import Card from "../components/Card";
import Head from "next/head";

function Profile() {
  const { isAuth } = useSelector((state) => state.auth);
  const router = useRouter();

  const [isLookingCard, setIsLookingCard] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const { fullName, _id } = useSelector((state) => state.user.user);
  const { invInfo, isLoading } = useSelector((state) => state.invite);
  const dispatch = useDispatch();

  const refresh = {
    open: { rotate: -720 },
    closed: { rotate: 0 },
  };

  const refreshList = {
    open: { filter: "blur(4px)" },
    closed: { filter: "blur(0px)" },
  };

  function logOut() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userID");
    router.push("/");
    dispatch(getUserLogout());
    dispatch(authLogout());
    dispatch(inviteLogout());
  }

  async function listHandle() {
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

  useEffect(() => {
    if (!isAuth) {
      return router.push("/");
    }
    listHandle();
  }, []);

  return (
    <div className="w-full h-screen">
      <Head>
        <title>האזור האישי</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content={`האיזור האישי בו אתה יכול לראות ולשלוט במי שיגיע לאירוע שלך`}
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
          className="shadow-try space-y-2 w-5/6 px-10 h-max grid bg-yellow-col self-center rounded-2xl py-4 md:py-8  "
        >
          <p className="font-bold text-2xl tracking-widest">האזור האישי</p>
          <p className="text-base underline">לוח הבקרה</p>
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
          className={`${invInfo.length > 0 ? "flex-col " : "flex-row"}
                    space-y-2 overflow-auto flex bg-white shadow-2xl w-5/6 rounded-2xl h-5/6 row-start-1 row-span-5 self-end col-start-1 justify-self-center z-10 md:w-1/2 xl:col-start-2`}
        >
          {invInfo.length === 0 && (
            <motion.div
              animate={isLoading ? "open" : "closed"}
              transition={{
                filter: { type: "spring", bounce: 1, stiffness: 50 },
                duration: 2,
              }}
              variants={refreshList}
              className="justify-self-center self-center w-full"
            >
              <div className="w-full flex flex-col items-center">
                <p className="w-full bg-black text-white font-bold tracking-widest text-center">
                  לא נמצאו ארועים
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
            </motion.div>
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
                                h-20 w-full flex flex-col items-center justify-center bg-white rounded-xl`}
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
      {invInfo.length > 0 && isLookingCard && (
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
