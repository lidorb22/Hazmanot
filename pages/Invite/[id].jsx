import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InvObj } from "../../api/inviteApi";
import { motion } from "framer-motion";
import Head from "next/head";
import WebLogo from "../../vectors/webLogo.svg";
import DefaultINV from "../../components/inviteTamplates/DefaultINV";
import SaveTheDate from "../../components/inviteTamplates/SaveTheDate";

function Invite() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [invTemp, setInvTemp] = useState([]);

  async function fetchData() {
    try {
      const newList = await InvObj({ _id: router.query.id });
      setData(newList);
      if (newList === null || newList.error) {
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!data) {
      fetchData();
      return;
    }
    if (!data.template) {
      return;
    }
    switch (data.template.invStyle) {
      case "default":
        setInvTemp(
          <DefaultINV
            info={{
              fontSize: data.template.fontSize.regular,
              titleSize: data.template.fontSize.bold,
              textColor: data.template.textCol,
              bgColor: data.template.bg,
              isMale: data.template.isMale,
              type: data.type,
              name: data.name,
              age: data.age,
              addres: data.addres,
              date: data.date,
              time: data.time,
              _id: router.query.id,
            }}
          />
        );
        break;
      case "SaveTheDate":
        setInvTemp(
          <SaveTheDate
            info={{
              fontSize: data.template.fontSize.regular,
              titleSize: data.template.fontSize.bold,
              textColor: data.template.textCol,
              bgColor: data.template.bg,
              isMale: data.template.isMale,
              type: data.type,
              name: data.name,
              age: data.age,
              addres: data.addres,
              date: data.date,
              time: data.time,
              _id: router.query.id,
            }}
          />
        );
        break;
    }
  }, [data, router.query.id]);

  return (
    <div
      style={{
        backgroundImage: `${
          data && data.template
            ? `linear-gradient(rgba(${data.template.bg.red}, ${data.template.bg.green}, ${data.template.bg.blue}, 0), rgba(${data.template.bg.red}, ${data.template.bg.green}, ${data.template.bg.blue}, 1))`
            : `linear-gradient(rgba(239, 163, 50, 0.15), rgba(186, 83, 235, 1))`
        }`,
      }}
      className={`${
        data && data.template
          ? "justify-around space-y-[10px] py-[10px]"
          : "justify-end relative pb-[20px]"
      } w-full min-h-screen h-full bg-white flex flex-col items-center`}
    >
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
      {invTemp && (
        <div className="w-[90%] bg-white rounded-[5px] shadow-25">
          {invTemp && invTemp}
        </div>
      )}
      {data && data.error && (
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ opacity: { duration: 1 } }}
          className="absolute w-full h-full top-0 flex items-center justify-center font-rubik opacity-0"
        >
          <motion.div
            animate={{ y: [-50, 0] }}
            transition={{ y: { duration: 1 } }}
            className="flex flex-col w-[90%] h-max tracking-[0.3em] space-y-[30px]"
          >
            <div className="w-full h-[85px] flex items-center justify-center bg-per rounded-[5px] shadow-25 text-white text-[30px] font-bold">
              <p>שגיאה מס 01</p>
            </div>
            <div className="w-full h-max text-right">
              <p>:פירוט</p>
              <p>תקלה בניסיון טעינת ההזמנה המובקשת</p>
            </div>
            <div className="w-full h-max text-right">
              <p>:פיתרונות</p>
              <p>
                .נסו לרענן את הדף<br></br> במקרה ושגיאה זו חוזרת ודאו כי הקישור
                שהעתקתם דומה לקישור שהמזמין שלח לכם <br></br> אם בכל זאת לא עובד
                וחוזרת שגיאה זו דברו עם המזמין לגבי הקישור
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
      <img
        alt=""
        src={WebLogo}
        style={{
          filter: "brightness(0) invert(1)",
        }}
        className="w-[100px]"
      />
    </div>
  );
}

export default Invite;
