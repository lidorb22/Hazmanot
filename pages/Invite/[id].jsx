import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InvObj } from "../../api/inviteApi";
import { addComming } from "../../Slices/inviteAction";
import { HomeIcon, XIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import Head from "next/head";

function Invite() {
  const [change, setData] = useState(null);
  const [errorOrNull, setErrorOrNull] = useState(true);
  const [inviteInputs, setInviteInputs] = useState(false);
  const [commingInf, setCommingInf] = useState("");
  const [fullName, setFullName] = useState("");
  const [commingNum, setCommingNum] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  async function fetchData() {
    try {
      const newList = await InvObj({ _id: router.query.id });
      setData(newList);
      if (newList === null || newList.error) {
        return;
      } else {
        setErrorOrNull(false);
        setTimeout(() => setInviteInputs(true), 2800);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        addComming(commingInf + "Form", router.query.id, fullName, commingNum)
      );
      setFullName("");
      setCommingNum("");
      setCommingInf("");
      setInviteInputs(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-row items-center justify-center">
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
      <motion.div
        animate={
          inviteInputs
            ? { opacity: 1, pointerEvents: "auto" }
            : { opacity: 0, pointerEvents: "none" }
        }
        className="opacity-0 absolute top-0 left-0 h-screen w-full bg-black bg-opacity-50 flex items-center justify-center z-10"
      >
        <motion.div
          animate={inviteInputs ? { bottom: 0 } : { bottom: -300 }}
          className="relative w-[300px] h-[100px] bg-gray-300 rounded-lg flex flex-col items-center justify-center space-y-4 text-lg font-bold shadow-try"
        >
          <motion.p
            animate={
              commingInf !== ""
                ? { opacity: 0, y: -3, pointerEvents: "none", zIndex: 0 }
                : { opacity: 1, y: 0, pointerEvents: "auto", zIndex: 10 }
            }
            onClick={() => setCommingInf("solo")}
            className="bg-green-500 px-3 rounded-md shadow-1"
          >
            !אני מתכוון/ת להגיע
          </motion.p>
          <motion.p
            animate={
              commingInf !== ""
                ? { opacity: 0, y: 3, pointerEvents: "none", zIndex: 0 }
                : { opacity: 1, y: 0, pointerEvents: "auto", zIndex: 10 }
            }
            onClick={() => setCommingInf("multi")}
            className="bg-amber-500 px-3 rounded-md shadow-1"
          >
            !אנחנו מתכוונים להגיע
          </motion.p>
          <motion.form
            animate={
              commingInf !== ""
                ? { opacity: 1, scale: 1, pointerEvents: "auto" }
                : { opacity: 0, scale: 0.7, pointerEvents: "none" }
            }
            action="post"
            onSubmit={(e) => submitHandler(e)}
            className="absolute flex flex-col items-center justify-center space-y-2"
          >
            <motion.input
              animate={commingInf === "solo" ? { y: 10 } : { y: -10 }}
              type="text"
              placeholder="הכנס את שמך המלא"
              className="rounded-md text-center"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <motion.input
              animate={
                commingInf === "solo"
                  ? { opacity: 0, pointerEvents: "none" }
                  : { opacity: 1, pointerEvents: "auto", y: -10 }
              }
              type="number"
              placeholder="מספר אנשים שבאים"
              className="rounded-md text-center"
              onChange={(e) => setCommingNum(e.target.value)}
              value={commingNum}
            />
            <button className="absolute -bottom-6 bg-green-500 px-3 rounded-lg shadow-1 font-bold">
              !מאשר/ת את הגעתי
            </button>
          </motion.form>
          <div
            onClick={() =>
              commingInf !== "" ? setCommingInf("") : setInviteInputs(false)
            }
            className={`absolute -top-8 left-2 bg-white shadow-1 w-10 h-10 rounded-full flex items-center justify-center`}
          >
            <XIcon className="w-5 pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>
      {!errorOrNull && (
        <div
          style={{
            color: !errorOrNull && change.template.color.text,
            backgroundColor: !errorOrNull && change.template.color.background,
          }}
          className={`relative shadow-try h-[650px] w-[300px] rounded-xl flex flex-col items-center justify-center space-y-4`}
        >
          <Head>
            <title>הוזמנתם לאירוע!</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta
              name="description"
              content={`הזמינו אתכם לאירוע ולא כדי לכם לפספס היכנסו לאתר ושריינו את מקומכם`}
            />
          </Head>
          <div className="text-md tracking-widest w-5/6 text-center">
            <p>{!errorOrNull && change.template.text.title}</p>
          </div>

          <div className="flex flex-col space-y-3">
            <h1 className="text-4xl font-bold tracking-widest">
              {errorOrNull
                ? null
                : change.invRison === "Brit"
                ? "הברית"
                : change.invRison === "Bday"
                ? "יום ההולדת"
                : change.invRison === "Hatona"
                ? "חתונה"
                : change.invRison === "Hina"
                ? "חינה"
                : change.invRison === "Bar"
                ? "הבר מצווה"
                : change.invRison === "Bat"
                ? "הבת מצווה"
                : null}
            </h1>
            {!errorOrNull && change.names !== "" && (
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
          {!errorOrNull && change.age !== "" && (
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
          {!errorOrNull && (
            <div className="flex flex-col space-y-3">
              <h1 className="text-4xl font-bold tracking-widest">בתאריך</h1>
              <p className="tracking-widest w-max self-center text-md">
                {change.date}
              </p>
            </div>
          )}
          {!errorOrNull && (
            <div className="flex flex-col space-y-3">
              <h1 className="text-4xl font-bold tracking-widest">בשעה</h1>
              <p className="tracking-widest w-max self-center text-md">
                {change.time}
              </p>
            </div>
          )}
          {!errorOrNull && (
            <div className="flex flex-col space-y-3 text-center">
              <h1 className="text-4xl font-bold tracking-widest">יש להגיע</h1>
              <p className="tracking-widest w-[260px] self-center text-md">
                ל{change.place}
              </p>
            </div>
          )}
          <motion.div
            animate={
              errorOrNull
                ? { opacity: 0, y: 8, pointerEvents: "none" }
                : { opacity: 1, y: 0, pointerEvents: "auto" }
            }
            onClick={() => setInviteInputs(true)}
            className="absolute -bottom-8 bg-white shadow-1 w-14 h-14 rounded-2xl flex items-center justify-center z-10"
          >
            <CheckCircleIcon className="w-7 text-green-500 pointer-events-none" />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Invite;
