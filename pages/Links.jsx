import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { inviteReset } from "../Slices/inviteSlice";
import Head from "next/head";
import { getUserProfile } from "../Slices/userAction";
import { LinkIcon } from "@heroicons/react/solid";
import WebLogo from "../vectors/webLogo.svg";
import { motion } from "framer-motion";

function Links() {
  const [isCopyed, setIsCopyed] = useState(false);
  const { isAuth, error } = useSelector((state) => state.auth);
  const { fullName } = useSelector((state) => state.user.user);
  const { link } = useSelector((state) => state.invite);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile, mobileInnerHeight } = useSelector((state) => state.mobile);

  const mainDiv = useRef();

  useEffect(() => {
    if (isMobile == null) {
      dispatch(mobileDetect());
    } else if (isMobile && mobileInnerHeight) {
      mainDiv.current.style.setProperty("--vh", `${mobileInnerHeight}px`);
    }
    if (isAuth) {
      return;
    }
    if (error === "invalid token" || Object.entries(link).length === 0) {
      return router.push("/");
    }
    try {
      dispatch(getUserProfile());
    } catch (error) {
      console.log(error);
    }
  }, [error]);

  function backToMain() {
    router.push("/");
    dispatch(inviteReset());
  }

  const copyHandler = () => {
    setIsCopyed(true);
    navigator.clipboard.writeText(
      `https://hazmanot.netlify.app/Invite/${link}`
    );
    setTimeout(() => setIsCopyed(false), 1200);
  };

  return (
    <div
      ref={mainDiv}
      style={{ height: "100vh", height: "calc(var(--vh, 1vh) * 100)" }}
      className="w-full grid grid-rows-6 bg-yellow-col"
    >
      <Head>
        <title>קישורים</title>
        <meta name="title" content="קישורים" />
        <meta
          name="description"
          content="דף הקישורים נותן לכם את הקישור האישי שלכם שאותו אתם שולחים למוזמנים"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hazmanot.netlify.app/" />
        <meta property="og:title" content="קישורים" />
        <meta
          property="og:description"
          content="דף הקישורים נותן לכם את הקישור האישי שלכם שאותו אתם שולחים למוזמנים"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hazmanot.netlify.app/" />
        <meta property="twitter:title" content="קישורים" />
        <meta
          property="twitter:description"
          content="דף הקישורים נותן לכם את הקישור האישי שלכם שאותו אתם שולחים למוזמנים"
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />
      </Head>
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
        style={{
          filter: "brightness(0) invert(1)",
        }}
        className="w-[180px] absolute bottom-[10px] right-[10px] opacity-0 pointer-events-none 2xl:opacity-100 2xl:pointer-events-auto"
      />
      <p className="font-bold text-[40px] justify-self-center text-white row-start-2 col-start-1 md:text-[72px] md:row-start-1 md:self-end">
        קישורים
      </p>
      <p className="text-white text-[20px] text-bold w-[287px] text-center row-start-2 row-span-2 col-start-1 self-center justify-self-center md:w-[666px] md:text-[36px]  md:self-start md:mt-5">
        {fullName}, זה השלב האחרון ביצירת ההזמנה מכאן אתה מעתיק את הקישור ושולח
        אותו לכל המוזמנים שלך
      </p>
      <div className="col-start-1 w-full h-full row-start-3 row-span-2 flex flex-col items-center justify-center">
        <div className="relative bg-gray-100 text-sm font-bold w-[295px] h-[147px] rounded-xl shadow-try2 flex flex-col justify-center items-center md:w-[637px] md:h-[208px] 2xl:w-[712px]">
          <p className="break-all p-2 text-center">
            {link
              ? `https://hazmanot.netlify.app/Invite/${link}`
              : "תקלה לא נמצא לינק"}
          </p>
          <motion.div
            animate={isCopyed ? { opacity: 1 } : { opacity: 0 }}
            className="opacity-0 backdrop-blur-sm pointer-events-none absolute w-5/6 h-5/6 bg-black/80 rounded-xl flex items-center justify-center"
          >
            <p className="text-white md:text-[32px]">הקישור הועתק בצהלחה</p>
          </motion.div>
          <LinkIcon
            onClick={() => copyHandler()}
            className="absolute -right-8 w-[20px] text-white md:-right-12"
          />
        </div>
      </div>
      <div className="w-[287px] justify-self-center row-start-5 col-start-1 md:w-[637px] md:self-center">
        <button
          onClick={() => backToMain()}
          className={`w-[91px] self-center text-center font-bold tracking-widest bg-gray-600 h-[30px] rounded-md text-white shadow-1 md:w-[178px] md:h-[50px] md:text-[32px]`}
        >
          סיום
        </button>
      </div>
    </div>
  );
}

export default Links;
