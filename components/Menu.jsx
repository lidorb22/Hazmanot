import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  MenuIcon,
  XIcon,
  UserIcon,
  HomeIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { getUserLogout } from "../Slices/userSlice";
import { authLogout } from "../Slices/authSlice";
import { inviteLogout } from "../Slices/inviteSlice";

function Menu({ Page }) {
  const [isOpen, setIsOpen] = useState(false);

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

  const dispatch = useDispatch();

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    router.push("/");
    dispatch(getUserLogout());
    dispatch(authLogout());
    dispatch(inviteLogout());
  }

  return (
    <div
      className=" absolute top-0 left-0
        w-full h-screen z-50 pointer-events-none
        "
    >
      {/* Mobile and md screens */}
      <div className="w-full h-full flex pointer-events-none 2xl:opacity-0">
        <motion.div
          animate={
            isOpen
              ? { x: 215, backgroundColor: "rgb(0 0 0)" }
              : { x: 0, backgroundColor: "rgb(0 0 0 0.5)" }
          }
          className="bg-black/60 h-[59px] w-[54px] rounded-r-xl self-center mb-44 pointer-events-none"
        >
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-full flex items-center justify-center cursor-pointer pointer-events-auto 2xl:pointer-events-none"
          >
            {!isOpen ? (
              <MenuIcon className="text-white w-[30px] pointer-events-none" />
            ) : (
              <XIcon className="text-white w-[30px] pointer-events-none" />
            )}
          </div>
        </motion.div>
        <motion.div
          animate={isOpen ? { x: 0 } : { x: -216 }}
          className="bg-black h-[670px] text-white w-[216px] absolute self-center rounded-r-[20px] flex flex-col justify-around pointer-events-auto"
        >
          {Page !== "Home" && (
            <div
              id="home"
              onClick={(e) => NavigationHandler(e)}
              className="cursor-pointer flex items-center justify-center space-x-2 2xl:pointer-events-none"
            >
              <p className="text-[24px] pointer-events-none">דף הבית</p>
              <HomeIcon className="w-[30px] pointer-events-none" />
            </div>
          )}
          {Page !== "Profile" && (
            <div
              id="profile"
              onClick={(e) => NavigationHandler(e)}
              className="cursor-pointer flex items-center justify-center space-x-2 2xl:pointer-events-none"
            >
              <p className="text-[24px] pointer-events-none">האזור האישי</p>
              <UserIcon className="w-[30px] pointer-events-none" />
            </div>
          )}
          {Page !== "Invite" && (
            <div
              id="invite"
              onClick={(e) => NavigationHandler(e)}
              className="cursor-pointer flex items-center justify-center space-x-2 2xl:pointer-events-none"
            >
              <p className="text-[24px] pointer-events-none">יצירת הזמנה</p>
              <PlusCircleIcon className="w-[30px] pointer-events-none" />
            </div>
          )}
          <div
            onClick={() => logOut()}
            className="cursor-pointer flex flex-col items-center justify-center space-x-2 text-white/50 2xl:pointer-events-none"
          >
            <p className="text-[24px] pointer-events-none">התנתק</p>
            <ArrowLeftIcon className="w-[30px] pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/*Computer screen */}
      <div
        style={{ backgroundColor: "#F9F9F9" }}
        className="w-[680px] h-[70px] text-black flex flex-row-reverse shadow-1 absolute top-[35px] right-[55px] rounded-lg justify-around pointer-events-none opacity-0 2xl:opacity-100"
      >
        {Page !== "Home" && (
          <div
            id="home"
            onClick={(e) => NavigationHandler(e)}
            className="w-full cursor-pointer flex items-center justify-center space-x-2 pointer-events-none 2xl:pointer-events-auto"
          >
            <p className="text-[24px] pointer-events-none">דף הבית</p>
            <HomeIcon className="w-[30px] pointer-events-none" />
          </div>
        )}
        {Page !== "Profile" && (
          <div
            id="profile"
            onClick={(e) => NavigationHandler(e)}
            className="w-full cursor-pointer flex items-center justify-center space-x-2 pointer-events-none 2xl:pointer-events-auto"
          >
            <p className="text-[24px] pointer-events-none">האזור האישי</p>
            <UserIcon className="w-[30px] pointer-events-none" />
          </div>
        )}
        {Page !== "Invite" && (
          <div
            id="invite"
            onClick={(e) => NavigationHandler(e)}
            className="w-full cursor-pointer flex items-center justify-center space-x-2 pointer-events-none 2xl:pointer-events-auto"
          >
            <p className="text-[24px] pointer-events-none">יצירת הזמנה</p>
            <PlusCircleIcon className="w-[30px] pointer-events-none" />
          </div>
        )}
        <div
          onClick={() => logOut()}
          className="w-full cursor-pointer flex items-center justify-center space-x-2 pointer-events-none 2xl:pointer-events-auto"
        >
          <p className="text-[24px] pointer-events-none">התנתק</p>
          <ArrowLeftIcon className="w-[30px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default Menu;
