import React, { useEffect, useState } from "react";
import Link from "next/link";
import Menu from "../components/Menu";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getUserLogout } from "../Slices/userSlice";
import { authLogout } from "../Slices/authSlice";
import { allInvList, InvObj, InvDelete } from "../api/inviteApi";
import {
  inviteLogout,
  invitePending,
  inviteInfo,
  inviteFail,
  inviteResetList,
} from "../Slices/inviteSlice";
import { RefreshIcon, XCircleIcon, XIcon } from "@heroicons/react/solid";
import { TrashIcon, ClipboardCopyIcon } from "@heroicons/react/outline";

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

  const lookingCard = {
    open: { filter: "blur(0px)", opacity: 1, pointerEvents: "auto" },
    closed: { filter: "blur(4px)", opacity: 0, pointerEvents: "none" },
    cardIn: { scale: 1, opacity: 1 },
    cardOut: { scale: 0.5, opacity: 0 },
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
    console.log("clicking");
    try {
      const list = await allInvList({ _id });
      console.log("try");
      if (list.length > invInfo.length) {
        console.log("new item");
        if (invInfo.length === 0) {
          console.log("first time");
          list.forEach(async (item) => {
            const newList = await InvObj({ _id: item });
            dispatch(inviteInfo(newList));
          });
          return;
        } else {
          console.log("else");
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

  async function delHandeling() {
    dispatch(invitePending());
    try {
      await InvDelete({
        invId: invInfo[cardIndex]._id,
        userId: invInfo[cardIndex].inviter,
      });
      let arr = [];
      invInfo.forEach((item) => {
        arr.push(item);
      });
      arr.splice(cardIndex, 1);
      dispatch(inviteResetList(arr));
      setIsLookingCard(false);
    } catch (error) {
      console.log(error);
      dispatch(inviteFail("תקלה בניסיון מחיקת ההזמנה"));
    }
  }

  useEffect(() => {
    if (!isAuth) {
      return router.push("/");
    }
  });

  useEffect(() => {
    if (isAuth) {
      listHandle();
    }
  }, []);

  return (
    <div className="w-full h-screen">
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
                                ${item.invRison === "Brit" && "bg-yellow-300"} 
                                ${item.invRison === "Bday" && "bg-orange-300"} 
                                ${item.invRison === "Bat" && "bg-pink-300"}
                                ${item.invRison === "Hatona" && "bg-rose-300"}
                                ${item.invRison === "Hina" && "bg-cyne-300"}
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
      {invInfo.length > 0 && (
        <motion.div
          animate={isLookingCard ? "open" : "closed"}
          transition={{
            filter: { type: "spring", bounce: 1, stiffness: 50 },
            opacity: { type: "spring", bounce: 1, stiffness: 50 },
            duration: 2,
          }}
          variants={lookingCard}
          className="opacity-0 pointer-events-none bg-black bg-opacity-70 w-full h-full absolute top-0 right-0 z-50 flex flex-col items-center justify-center xl:bg-opacity-20"
        >
          <motion.div
            animate={isLookingCard ? "cardIn" : "cardOut"}
            transition={{
              scale: { type: "spring", bounce: 1, stiffness: 50 },
              opacity: { type: "spring", bounce: 1, stiffness: 50 },
              duration: 2,
            }}
            variants={lookingCard}
            className="bg-white w-5/6 h-4/6 rounded-2xl grid grid-rows-6 xl:w-96 xl:h-2/4 xl:mr-96 xl:mt-32"
          >
            <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
              {invInfo[cardIndex].invRison === "Bday" && "יום ההולדת של"}
            </p>
            <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
              {invInfo[cardIndex].invRison === "Hatona" && "החתונה של"}
            </p>
            <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
              {invInfo[cardIndex].invRison === "Hina" && "החינה של"}
            </p>
            <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
              {invInfo[cardIndex].invRison === "Bar" && "הבר מצווה של"}
            </p>
            <p className="justify-self-center mt-2 row-start-1 col-start-1 text-xl font-bold tracking-widest">
              {invInfo[cardIndex].invRison === "Bat" && "הבת מצווה של"}
            </p>
            <p className="justify-self-center self-center row-start-1 col-start-1 text-xl font-bold tracking-widest">
              {invInfo[cardIndex].invRison === "Brit" && "ברית"}
            </p>
            <p
              className={`${
                invInfo[cardIndex].invRison === "Bday"
                  ? "justify-self-end mr-16"
                  : "justify-self-center"
              } self-center mt-5 row-start-1 col-start-1 border-b-2 border-yellow-col`}
            >
              {invInfo[cardIndex].names}
            </p>
            {invInfo[cardIndex].age !== "" && (
              <div className="flex flex-col items-center justify-center ml-16 justify-self-start self-center row-start-1 col-start-1 w-10 text-center h-10 border-yellow-col border-2 rounded-full mt-5">
                <p className="">{invInfo[cardIndex].age}</p>
              </div>
            )}
            <p
              className={`${
                invInfo[cardIndex].invRison === "Brit" ? "mb-3" : ""
              } text-xl  self-center justify-self-center row-start-1 row-span-2 col-start-1 tracking-widest`}
            >
              {invInfo[cardIndex].place}
            </p>
            <p className="mr-5 justify-self-end self-center row-start-2 col-start-1">
              {invInfo[cardIndex].date}
            </p>
            <p className="ml-5 justify-self-start self-center row-start-2 col-start-1">
              {invInfo[cardIndex].time}
            </p>
            <div className="shadow-xl border-b-2 border-t-2 border-yellow-col justify-self-center self-start row-start-3 col-start-1 w-5/6 h-full flex flex-row items-center justify-center rounded-xl">
              <p className="break-all p-4 text-center">
                https://hazmanot.netlify.app/Invite/
                {invInfo[cardIndex]._id}
              </p>
            </div>
            <Link href={`/Invite/${invInfo[cardIndex]._id}`}>
              <div className="row-start-3 row-span-2 self-center justify-self-center col-start-1 bg-white border-2 border-yellow-col rounded-full p-2">
                <ClipboardCopyIcon className="w-6" />
              </div>
            </Link>
            <div className="justify-self-center self-center row-start-4 row-span-3 col-start-1 w-full h-4/6 grid grid-cols-6">
              <p className="font-bold border-b-2 border-yellow-col self-start justify-self-center row-start-1 col-start-1 ml-3 mt-6 xl:mt-2">
                מגיעים
              </p>
              <div className="font-bold shadow-xl border-b-2 border-t-2 border-yellow-col self-center justify-self-center row-start-1 ml-3 col-start-1 bg-white w-10 h-16 rounded-2xl flex items-center justify-center">
                <p>9</p>
              </div>
              <div className="shadow-xl border-b-2 border-t-2 border-yellow-col row-start-1 col-start-2 col-span-5 w-5/6 h-5/6 self-center justify-self-center rounded-xl flex flex-row items-center justify-center">
                list
              </div>
            </div>
            <div
              onClick={() => setIsLookingCard(false)}
              className="bg-black rounded-l-xl self-end justify-center items-end flex row-start-6 col-start-1 w-4/6 h-1/2"
            >
              <XIcon className="pointer-events-none mb-2 w-6 text-white" />
            </div>
            <div
              onClick={() => delHandeling()}
              className="bg-orange-700 rounded-r-xl self-end justify-self-end justify-center items-end flex row-start-6 col-start-1 w-2/6 h-1/2"
            >
              <TrashIcon className="pointer-events-none mb-2 w-6 text-white" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Profile;
