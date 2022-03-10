import { useState } from "react";
import { motion } from "framer-motion";
import Auth from "./Auth";
import { useRouter } from "next/router";
import {
  MenuIcon,
  XIcon,
  UserIcon,
  SparklesIcon,
  HomeIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";

function Menu({ Page }) {
  const [isOpen, setIsOpen] = useState(false);
  const [authAcces, setAuthAcces] = useState(false);

  const { isAuth, isLoading } = useSelector((state) => state.auth);

  const variants = {
    open: { opacity: 1, pointerEvents: "auto" },
    closed: { opacity: 0, pointerEvents: "none" },
  };
  const variants2 = {
    open: { y: 0 },
    closed: { y: -100 },
  };
  const variants3 = {
    open: { scale: 1 },
    closed: { scale: 0 },
  };

  const router = useRouter();

  function NavigationHandler(e) {
    if (e.target.id === "profile") {
      router.push("/Profile");
      return;
    }
    if (e.target.id === "invite") {
      router.push("/Create");
      return;
    }
    if (e.target.id === "home") {
      router.push("/");
      return;
    }
  }

  return (
    <div
      className=" absolute top-0 left-0
        w-full h-screen z-50 pointer-events-none
        "
    >
      <div
        onClick={() => setIsOpen(true)}
        className=" ml-3 mt-3 pointer-events-auto bg-white w-max rounded-full p-2 shadow-try2 sm:ml-8 sm:mt-3 md:opacity-0 md:pointer-events-none"
      >
        <MenuIcon className="w-8" />
      </div>
      {/* computer */}
      <div className="opacity-0 pointer-events-none absolute top-0 left-12 w-28 h-48 rounded-b-full grid grid-rows-2 shadow-try2 md:opacity-100 md:pointer-events-auto lg:left-20 xl:left-32">
        {!isAuth && (
          <div className="w-full h-full bg-white row-start-1 row-span-2 rounded-b-full shadow-xl flex flex-col">
            <p className="text-center font-bold text-sm p-3">
              כדי להגיע למקומות אחרים באתר עלייך להתחבר או להרשם
            </p>
            <motion.p
              initial={{ y: 0 }}
              animate={
                isLoading
                  ? { y: 6, pointerEvents: "none" }
                  : { y: 6, pointerEvents: "auto" }
              }
              transition={{
                type: "Tween",
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              onClick={() => setAuthAcces(true)}
              className="text-center w-min font-bold text-sm bg-yellow-col px-5 cursor-pointer rounded-md self-center md:pointer-events-auto"
            >
              כניסה
            </motion.p>
          </div>
        )}
        {isAuth && (
          <div className="w-full h-full bg-yellow-col row-start-1 row-span-2 rounded-b-full shadow-2xl flex flex-col">
            {Page !== "Main" && (
              <div
                onClick={(e) => NavigationHandler(e)}
                id="home"
                className="flex flex-col w-full h-1/2 justify-center items-center bg-black"
              >
                <HomeIcon className="pointer-events-none w-7 text-yellow-col" />
                <p className="pointer-events-none text-yellow-col">דף הבית</p>
              </div>
            )}
            {Page !== "Profile" && (
              <div
                onClick={(e) => NavigationHandler(e)}
                id="profile"
                className={`${
                  Page === "Invite" ? "bg-transparent" : "bg-black"
                } flex flex-col w-full h-1/2 justify-center items-center `}
              >
                <UserIcon
                  className={`${
                    Page === "Invite" ? "text-black" : "text-yellow-col"
                  } pointer-events-none w-7`}
                />
                <p
                  className={`${
                    Page === "Invite" ? "text-black" : "text-yellow-col"
                  } pointer-events-none`}
                >
                  האזור האישי
                </p>
              </div>
            )}
            {Page !== "Invite" && (
              <div
                onClick={(e) => NavigationHandler(e)}
                id="invite"
                className="flex flex-col w-full h-1/2 justify-center items-center"
              >
                <SparklesIcon className="pointer-events-none w-7 text-black" />
                <p className="pointer-events-none">יצירת הזמנה</p>
              </div>
            )}
          </div>
        )}
        {isLoading && (
          <div className="absolute backdrop-blur rounded-full w-full h-full flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -20, opacity: 1 }}
              transition={{
                scale: { type: "spring", bounce: 1, stiffness: 50 },
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              }}
            >
              <ExclamationIcon className="w-10 text-orange-600" />
            </motion.div>
            <p>...מאמת נתונים</p>
          </div>
        )}
      </div>
      {authAcces && <Auth acces={setAuthAcces} />}
      {/* mobile */}
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className="opacity-0 absolute top-0 w-full h-16 md:opacity-0 md:pointer-events-none "
      >
        {!isAuth && (
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants2}
            className="w-full h-16 bg-white shadow-2xl grid grid-cols-2 md:opacity-0 md:pointer-events-none"
          >
            <XIcon
              onClick={() => setIsOpen(false)}
              className="w-8 col-start-1 row-start-1 self-center ml-5"
            />
            <div
              onClick={() => setAuthAcces(true)}
              className="row-start-1 col-start-1 col-span-2 self-center justify-self-center bg-yellow-col w-1/2 h-5/6 text-center flex flex-col justify-center rounded-xl shadow-md"
            >
              <p className="pointer-events-none text-white font-bold tracking-widest">
                כניסה
              </p>
            </div>
          </motion.div>
        )}
        {isAuth && (
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants2}
            className="w-full h-16 justify-around bg-white shadow-2xl flex "
          >
            <XIcon onClick={() => setIsOpen(false)} className="w-8 " />
            {Page !== "Main" && (
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={variants3}
                transition={{ delay: -1 }}
                onClick={(e) => NavigationHandler(e)}
                id="home"
                className="h-5/6 self-center shadow-md rounded-xl w-28 flex flex-col items-center justify-center"
              >
                <HomeIcon className="pointer-events-none w-7 text-yellow-col" />
                <p className="pointer-events-none">דף הבית</p>
              </motion.div>
            )}
            {Page !== "Invite" && (
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={variants3}
                transition={{ delay: -1 }}
                onClick={(e) => NavigationHandler(e)}
                id="invite"
                className="h-5/6 self-center shadow-md rounded-xl w-28 flex flex-col items-center justify-center"
              >
                <SparklesIcon className="pointer-events-none w-7 text-yellow-col" />
                <p className="pointer-events-none">יצירת הזמנה</p>
              </motion.div>
            )}
            {Page !== "Profile" && (
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={variants3}
                transition={{ delay: -1 }}
                onClick={(e) => NavigationHandler(e)}
                id="profile"
                className="h-5/6 self-center shadow-md rounded-xl w-28 flex flex-col items-center justify-center"
              >
                <UserIcon className="pointer-events-none w-7 text-yellow-col" />
                <p className="pointer-events-none">האזור האישי</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Menu;
