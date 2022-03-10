import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { inviteReset } from "../Slices/inviteSlice";
import Head from "next/head";
import { getUserProfile } from "../Slices/userAction";

function Links() {
  const { isAuth, error } = useSelector((state) => state.auth);
  const { link } = useSelector((state) => state.invite);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
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

  return (
    <div className="w-full h-screen grid grid-rows-6">
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
      <div className="shadow-try flex flex-row items-center justify-center w-5/6 h-36 mt-5 row-start-1 row-span-2 col-start-1 bg-yellow-col justify-self-center rounded-2xl">
        <div className="text-center space-y-2">
          <p className="font-bold tracking-widest text-xl">קישורים</p>
          <p>זה השלב האחרון מקווים שהסתדרתם</p>
          <p>ואהבתם את חווית היצירה</p>
        </div>
      </div>
      <div className="col-start-1 w-full h-full row-start-3 row-span-2 flex flex-col items-center justify-center">
        <div className="overflow-hidden bg-gray-100 text-sm font-bold w-3/4 h-2/6 rounded-xl shadow-try2 flex flex-col justify-center items-center ">
          <p className="break-all p-2 text-center">
            {link
              ? `https://hazmanot.netlify.app/Invite/${link}`
              : "תקלה לא נמצא לינק"}
          </p>
        </div>
        <div className="text-center pt-6">
          <p>זה הקישור שאתם שולחים למוזמנים שלכם</p>
          <p>תהנו</p>
        </div>
      </div>
      <div
        onClick={() => backToMain()}
        className="shadow-lg absolute bottom-20 right-0 w-full h-10 bg-yellow-col border-t-2 border-b-2 border-black flex flex-col items-center justify-center cursor-pointer"
      >
        <p className="font-bold pointer-events-none">!העתקתי ושלחתי</p>
      </div>
    </div>
  );
}

export default Links;
