import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InvObj } from "../../api/inviteApi";
import { BadgeCheckIcon, HomeIcon, XIcon } from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Head from "next/head";
import TamplateController from "../../components/TamplateController";
import WebLogo from "../../vectors/webLogo.svg";

function Invite() {
  const [change, setData] = useState(undefined);
  const [errorOrNull, setErrorOrNull] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(500);
  const router = useRouter();

  console.log(windowWidth);

  async function fetchData() {
    try {
      const newList = await InvObj({ _id: router.query.id });
      setData(newList);
      setErrorOrNull(false);
      if (newList === null || newList.error) {
        setErrorOrNull(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    fetchData();
    handleResize();
  }, [router.query.id]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-white to-yellow-col/80 flex flex-row items-center justify-center 2xl:bg-gradient-to-l">
      <Head>
        <title>הוזמנתם לאירוע</title>
        <meta name="title" content="הוזמנתם לאירוע" />
        <meta
          name="description"
          content="הזמינו אותך לאירוע עכשיו רק נותר לך להיכנס ולבצע אישור הגעה"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hazmanot.netlify.app/" />
        <meta property="og:title" content="הוזמנתם לאירוע" />
        <meta
          property="og:description"
          content="הזמינו אותך לאירוע עכשיו רק נותר לך להיכנס ולבצע אישור הגעה"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hazmanot.netlify.app/" />
        <meta property="twitter:title" content="הוזמנתם לאירוע" />
        <meta
          property="twitter:description"
          content="הזמינו אותך לאירוע עכשיו רק נותר לך להיכנס ולבצע אישור הגעה"
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
        className="w-[180px] absolute bottom-[10px] right-[10px] opacity-0 pointer-events-none 2xl:opacity-100 2xl:pointer-events-auto"
      />
      <motion.div
        animate={
          errorOrNull
            ? { opacity: 1, pointerEvents: "auto", scale: 1 }
            : { opacity: 0, pointerEvents: "none", scale: 0 }
        }
        className="opacity-0 absolute bg-gray-600 shadow-try2 text-white font-bold h-[100px] w-[300px] rounded-xl flex flex-col items-center justify-center text-center braek-all p-2"
      >
        <p>
          סליחה אבל לא הצלחנו לטעון את ההזמנה כנראה שהיא נמחקה או שטעיתם בקישור
        </p>
        <div className="absolute bottom-0 w-full h-10 flex items-center justify-center">
          <div
            onClick={() => router.push("/")}
            className="relative top-6 w-14 h-14 rounded-full bg-white shadow-try2 flex items-center justify-center z-10"
          >
            <HomeIcon className="w-8 text-gray-600 pointer-events-none" />
          </div>
        </div>
      </motion.div>
      {JSON.stringify(change) !== undefined && !errorOrNull && (
        <div className="overflow-hidden h-full w-full flex items-center justify-center relative">
          <motion.div
            animate={
              windowWidth >= 1536
                ? {
                    x: -400,
                  }
                : { x: 0 }
            }
            style={{
              color:
                JSON.stringify(change.template) !== null &&
                JSON.stringify(change.template) !== undefined
                  ? change.template.color.text
                  : "red",
              backgroundColor:
                JSON.stringify(change.template) !== undefined &&
                change.template.color.background,
            }}
            className={`relative shadow-try h-[650px] w-[300px] rounded-xl flex flex-col items-center justify-center space-y-4`}
          >
            {windowWidth < 1536 && (
              <motion.div
                animate={
                  isAccepting
                    ? { opacity: 0, pointerEvents: "none" }
                    : { opacity: 1, pointerEvents: "auto" }
                }
                onClick={() => setIsAccepting(true)}
                className="bg-white shadow-1 w-5/6 h-8 flex items-center justify-center space-x-2 absolute -bottom-16 rounded-lg"
              >
                <BadgeCheckIcon className="w-5 pointer-events-none" />
                <p className="text-lg pointer-events-none">
                  לחצו כאן לאישור ההגעה
                </p>
              </motion.div>
            )}
            <div className="text-md tracking-widest w-5/6 text-center">
              <p>
                {JSON.stringify(change.template) !== undefined &&
                  change.template.text.title}
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <h1 className="text-4xl font-bold tracking-widest">
                {change && change.invRison === "Brit"
                  ? "הברית"
                  : change && change.invRison === "Bday"
                  ? "יום ההולדת"
                  : change && change.invRison === "Hatona"
                  ? "חתונה"
                  : change && change.invRison === "Hina"
                  ? "חינה"
                  : change && change.invRison === "Bar"
                  ? "הבר מצווה"
                  : change && change.invRison === "Bat" && "הבת מצווה"}
              </h1>
              {change !== undefined && change.names && (
                <p
                  style={{
                    backgroundColor: change.template.color.fills,
                  }}
                  className={`tracking-widest w-max px-2 rounded-md shadow-1 self-center text-md`}
                >
                  של <span className="underline">{change.names}</span>
                </p>
              )}
            </div>
            {change !== undefined && change.age && (
              <div className="flex flex-col space-y-3">
                <h1 className="text-4xl font-bold tracking-widest">שחוגג</h1>
                <div
                  style={{
                    backgroundColor: change.template.color.fills,
                  }}
                  className={`flex items-center justify-center tracking-widest w-[40px] h-[40px] rounded-full shadow-1 self-center text-md`}
                >
                  <p>{change.age}</p>
                </div>
              </div>
            )}
            {change !== undefined && (
              <div className="flex flex-col space-y-3">
                <h1 className="text-4xl font-bold tracking-widest">בתאריך</h1>
                <p className="tracking-widest w-max self-center text-md">
                  {change.date}
                </p>
              </div>
            )}
            {change !== undefined && (
              <div className="flex flex-col space-y-3">
                <h1 className="text-4xl font-bold tracking-widest">בשעה</h1>
                <p className="tracking-widest w-max self-center text-md">
                  {change.time}
                </p>
              </div>
            )}
            {change !== undefined && (
              <div className="flex flex-col space-y-3 text-center">
                <h1 className="text-4xl font-bold tracking-widest">יש להגיע</h1>
                <p className="tracking-widest w-[260px] self-center text-md">
                  ל{change.place}
                </p>
              </div>
            )}
          </motion.div>
          <TamplateController
            info={change && change}
            setIsAccepting={setIsAccepting}
            isAccepting={isAccepting}
            screenWidth={windowWidth}
          />
        </div>
      )}
    </div>
  );
}

export default Invite;
