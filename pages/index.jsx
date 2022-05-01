import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ChartSquareBarIcon,
  CurrencyDollarIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/solid";
import WebLogo from "../vectors/webLogo.svg";
import IndexVector from "../vectors/indexVector.svg";
import Menu from "../components/Menu";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../Slices/userAction";
import { userProblem } from "../api/userApi";
import { useRouter } from "next/router";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pSubject, setPSubject] = useState("");
  const [pMassage, setPMassage] = useState("");
  const [pError, setPError] = useState(false);
  const { isAuth, error } = useSelector((state) => state.auth);
  const { fullName, _id } = useSelector((state) => state.user.user);

  useEffect(() => {
    var localUser = localStorage.getItem("userID");
    var localToken = localStorage.getItem("token");
    if (isAuth) {
      return;
    }
    if (error === "invalid token") {
      if (localUser && localToken) {
        localStorage.removeItem("userID");
        localStorage.removeItem("token");
      }
      return;
    }
    if (localUser && localToken) {
      try {
        dispatch(getUserProfile());
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }, [error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (pSubject === "" && pMassage === "") {
      e.preventDefault();
      setPError(true);
      setTimeout(() => setPError(false), 2000);
    } else {
      e.preventDefault();
      await userProblem({ id: _id, problem: pMassage });
    }
  };

  return (
    <div
      className={`w-full h-full relative flex flex-col font-sans overflow-y-auto md:h-screen 2xl:grid 2xl:grid-cols-2 `}
    >
      <Head>
        <title>הזמנות</title>
        <meta name="title" content="הזמנות" />
        <meta
          name="description"
          content="אתר הזמנות מציע לכם ליצור ולעצב הזמנה בדרך הכי פשוטה שיש"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hazmanot.netlify.app/" />
        <meta property="og:title" content="הזמנות" />
        <meta
          property="og:description"
          content="אתר הזמנות מציע לכם ליצור ולעצב הזמנה בדרך הכי פשוטה שיש"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://hazmanot.netlify.app/" />
        <meta property="twitter:title" content="הזמנות" />
        <meta
          property="twitter:description"
          content="אתר הזמנות מציע לכם ליצור ולעצב הזמנה בדרך הכי פשוטה שיש"
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/G2LyfBm/Untitled-1.jpg"
        />
      </Head>
      {isAuth && <Menu Page="Home" />}
      <img
        alt=""
        src={IndexVector}
        style={{
          zIndex: -1,
          filter:
            "invert(49%) sepia(14%) saturate(5068%) hue-rotate(17deg) brightness(104%) contrast(99%)",
        }}
        className="h-full absolute top-0 left-0 opacity-0 pointer-events-none 2xl:opacity-100"
      />

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
      <div className="w-full h-4/6 flex flex-col items-center justify-center 2xl:col-start-1 2xl:col-span-2 2xl:row-start-1 2xl:self-center 2xl:w-[770px] 2xl:ml-[670px] 2xl:justify-self-center 2xl:leading-[53px]">
        <div
          className={`${
            isAuth
              ? "w-[340px] md:w-[600px] md:h-[110px] md:text-[72px] 2xl:w-[610px]"
              : "w-[250px] 2xl:w-[474px]"
          } bg-yellow-col/80 text-[40px] font-bold  rounded-xl flex items-center justify-center 2xl:h-[110px] 2xl:text-[72px]`}
        >
          <p>{isAuth ? "תודה שבחרתם בנו" : "ברוכים הבאים"}</p>
        </div>
        {!isAuth && (
          <div className="text-center w-80 md:w-5/6">
            <p className="w-full pt-4 md:text-[24px] 2xl:text-[32px]">
              אם אתם מתכוונים לתכנן אירוע הגעתם למקום הנכון. האתר מציע פתרון
              לחלק הבלתי צפוי של ארגון ותכנון האירוע והופך אותו לגלוי ואתכם
              ליודעי כל
            </p>
            <p className="font-bold pt-4 md:text-[24px] 2xl:text-[32px]">
              ?אז איך בעצם
            </p>
            <p className="text-center w-full md:text-[24px] 2xl:text-[32px]">
              למזמין (את/ה) יש את היכולת לראות את האנשים שאישרו את הגעתם לאירוע
              ובכך תשלטו על ההוצאות שלכם על סידורי השולחנות והכל במעוד מועד
            </p>
          </div>
        )}
        {isAuth && (
          <div className="flex flex-col items-center text-center w-5/6 mt-5 md:text-[20px] 2xl:text-[32px] 2xl:w-full">
            <p className="">
              אנחנו כאן כדי לספק לך, {fullName && fullName} , את שירות ההזמנות
              שלנו בחינם ללא עלות כדי שתיהיה לכם חוויה יוצאת דופן בכל אחד
              מהאירועים שלכם.
            </p>
            <p className="">
              אנחנו תמיד שואפים להגיע גבוהה ולהצליח להביא את כל היכולות שיעזרו
              לכם
            </p>
          </div>
        )}
      </div>
      <div className="w-full h-full bg-yellow-col 2xl:col-start-1 2xl:row-start-1 2xl:flex 2xl:justify-center 2xl:bg-transparent">
        {!isAuth && (
          <div className="w-full h-full flex flex-col items-center md:grid md:grid-cols-2 md:justify-items-center 2xl:col-start-1 2xl:row-start-1 2xl:w-4/6 2xl:flex 2xl:mr-[30%]">
            <h2 className="text-white text-3xl w-36 text-center font-bold md:col-start-2 md:row-start-1 md:self-start md:text-[72px] md:w-80 md:leading-[70px] 2xl:pt-10 2xl:self-center 2xl:h-1/5">
              כמה סיבות לבחור בנו
            </h2>
            <div className="w-5/6 -mt-2 text-white text-[16px] flex flex-wrap space-y-6 md:col-start-2 md:row-start-1 md:self-center md:w-full md:pt-28 2xl:p-0 2xl:h-1/2 2xl:p-5 2xl:text-[32px]">
              <div className="flex flex-col items-center w-1/2 pt-6">
                <PaperAirplaneIcon className="w-[30px] md:w-[50px]" />
                <p className="w-28 text-center pt-2 md:text-[24px] md:w-40">
                  אפשר להזמין
                  <span className="font-bold"> אנשים מחו&quot;ל </span>
                  בלחיצת כפתור
                </p>
              </div>
              <div className="flex flex-col items-center w-1/2">
                <CurrencyDollarIcon className="w-[30px] md:w-[50px]" />
                <p className="w-20 text-center pt-2 md:text-[24px] md:w-[120px]">
                  אנחנו<span className="font-bold"> חוסכים לכם</span> נסיעות
                  ודלק
                </p>
              </div>
              <div className="flex flex-col items-center w-1/2">
                <ChartSquareBarIcon className="w-[30px] md:w-[50px]" />
                <p className="w-28 text-center pt-2 md:text-[24px] md:w-40">
                  אפשרות<span className="font-bold"> לדעת מראש</span> את כמות
                  המוזמנים
                </p>
              </div>
              <div className="flex flex-col items-center w-1/2">
                <EmojiHappyIcon className="w-[30px] md:w-[50px]" />
                <p className="w-24 text-center pt-2 md:text-[24px] md:w-32">
                  האפליקצייה<span className="font-bold"> נוחה ופשוטה</span> לכל
                  אדם
                </p>
              </div>
            </div>
            <div className="w-full h-full text-white flex flex-col items-center font-bold pt-3 md:col-start-1 md:row-start-1 md:justify-center md:pt-0 2xl:h-min ">
              <p className="text-[32px] tracking-widest md:text-[36px] 2xl:text-[64px]">
                ?בחרתם בנו
              </p>
              <p className="text-[16px] md:text-[24px]">אז תלחצו כאן</p>
              <div
                onClick={() => router.push("/Auth")}
                className="w-[200px] h-[50px] cursor-pointer bg-white rounded-md shadow-1 flex items-center justify-center space-x-2 md:w-[150px] md:h-[150px] md:rounded-full md:flex-col 2xl:w-[370px] 2xl:h-[60px] 2xl:rounded-lg 2xl:flex-row 2xl:mt-3"
              >
                <p className="text-[20px] text-black tracking-widest md:text-[36px] md:leading-8 md:w-min md:pt-4 md:text-center 2xl:w-72 2xl:text-[40px] 2xl:self-center 2xl:p-0 pointer-events-none">
                  כניסה לאתר
                </p>
                <ArrowLeftIcon className="w-[20px] text-black md:w-[24px] 2xl:self-center 2xl:w-[25px] pointer-events-none" />
              </div>
              <p className="w-44 text-center pt-1 md:text-[24px] md:w-80 2xl:w-full 2xl:pt-3">
                ותתחילו להזמין לכל אירוע ושכולם יפגשו בשמחות
              </p>
            </div>
          </div>
        )}
        {isAuth && (
          <div className="w-full h-full p-4 flex flex-col items-center 2xl:w-5/6 2xl:col-start-1 2xl:row-start-1 2xl:mr-[27%] justify-center">
            <p className="text-white text-[32px] font-bold md:text-[72px] 2xl:w-[591px]">
              אנחנו כאן לשירותכם
            </p>
            <p className="mt-3 text-white font-bold w-5/6 text-center md:m-0 md:text-[24px] md:pb-4 2xl:text-[32px] 2xl:w-[590px] 2xl:p-0 ">
              {fullName}, אנחנו כאן לתת לך מענה לכל בעיה באתר
            </p>
            <form
              onSubmit={(e) => submitHandler(e)}
              className="relative w-[330px] h-full flex flex-col items-center justify-center space-y-7 md:w-[560px] 2xl:w-[550px] 2xl:h-max 2xl:pt-20"
            >
              <motion.div
                animate={pError ? { opacity: 1 } : { opacity: 0 }}
                className="pointer-events-none opacity-0 absolute w-5/6 h-[100px] md:h-[150px] bg-black/80 z-20 rounded-xl flex items-center justify-center"
              >
                <p className="text-white font-bold md:text-[24px] pointer-events-none">
                  אתם חייבים למלא את כל שדות המילוי
                </p>
              </motion.div>
              <div className="w-full h-[40px] flex items-center justify-center relative md:h-[50px]">
                <input
                  value={pSubject}
                  onChange={(e) => setPSubject(e.target.value)}
                  type="text"
                  className="focus:outline-none w-full h-full px-2 text-right rounded-lg border-2 border-black shadow-1"
                />
                <label className="absolute -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg md:text-[20px]">
                  כותרת של הבעיה
                </label>
              </div>
              <div className="w-full h-[120px] flex items-center justify-center relative md:h-[200px] md:mt-3 md:h-[190px] 2xl:h-[370px]">
                <textarea
                  value={pMassage}
                  onChange={(e) => setPMassage(e.target.value)}
                  type="text"
                  className="resize-none focus:outline-none w-full h-full p-2 text-right rounded-lg border-2 border-black shadow-1"
                />
                <label className="absolute -top-4 right-3 bg-white px-2 border-2 border-black rounded-lg md:text-[20px]">
                  תוכן הבעיה
                </label>
              </div>
              <button
                type="submit"
                className={`w-[210px] self-center font-bold tracking-widest text-[20px] bg-gray-600 h-[50px] rounded-lg text-white shadow-1 md:w-[290px] md:text-[32px]`}
              >
                שליחת הבעיה
              </button>
              <p className="text-white text-center font-bold text-[14px] tracking-widest pr-[10px] w-44 md:w-max md:text-[16px] 2xl:text-[20px]">
                מענה להודעות לא יעלה על 24 שעות
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
