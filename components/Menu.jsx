import {
  ChevronDownIcon,
  CogIcon,
  LoginIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import WebLogo from "../vectors/webLogo.svg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogout } from "../Slices/userSlice";
import { authLogout } from "../Slices/authSlice";
import { inviteLogout } from "../Slices/inviteSlice";

function NewMenu({ place, isError }) {
  const { isAuth } = useSelector((state) => state.auth);
  const [windowWidth, setWindowWidth] = useState(500);
  const [firstLoad, setFirstLoad] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [rollerPos, setRollerPos] = useState("0px");
  const [selected, setSelected] = useState("");
  const [placeObj, setPlaceObj] = useState({
    current: "דף הבית",
    links: [
      {
        target: "create",
        text: "יצירת הזמנה",
      },
      {
        target: "profile",
        text: "האיזור האישי",
      },
      {
        target: "about",
        text: "קצת עלינו",
      },
    ],
  });
  const dispatch = useDispatch();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    let change = selected;
    if (selected === "") {
      change = place;
    }
    switch ((place, change)) {
      case "home":
        windowWidth < 768 && setRollerPos("86px");
        !firstLoad &&
          setPlaceObj({
            current: "דף הבית",
            links: [
              {
                target: "create",
                text: "יצירת הזמנה",
              },
              {
                target: "profile",
                text: "האיזור האישי",
              },
              {
                target: "about",
                text: "קצת עלינו",
              },
            ],
          });
        windowWidth >= 768 && setIsOpen(false);
        if (selected !== "") {
          setTimeout(
            () => {
              windowWidth < 768 && setIsOpen(false);
              router.push("/");
            },
            windowWidth >= 768 ? 1500 : 800
          );
        }
        break;
      case "create":
        windowWidth < 768 && setRollerPos("141px");
        !firstLoad &&
          setPlaceObj({
            current: "יצירת הזמנה",
            links: [
              {
                target: "home",
                text: "דף הבית",
              },
              {
                target: "profile",
                text: "האיזור האישי",
              },
              {
                target: "about",
                text: "קצת עלינו",
              },
            ],
          });
        windowWidth >= 768 && setIsOpen(false);
        if (selected !== "") {
          setTimeout(
            () => {
              windowWidth < 768 && setIsOpen(false);
              router.push("/Create");
            },
            windowWidth >= 768 ? 1500 : 800
          );
        }
        break;
      case "profile":
        windowWidth < 768 && setRollerPos("198px");
        !firstLoad &&
          setPlaceObj({
            current: "האיזור האישי",
            links: [
              {
                target: "home",
                text: "דף הבית",
              },
              {
                target: "create",
                text: "יצירת הזמנה",
              },
              {
                target: "about",
                text: "קצת עלינו",
              },
            ],
          });
        windowWidth >= 768 && setIsOpen(false);
        if (selected !== "") {
          setTimeout(
            () => {
              windowWidth < 768 && setIsOpen(false);
              router.push("/Profile");
            },
            windowWidth >= 768 ? 1500 : 800
          );
        }
        break;
      case "about":
        windowWidth < 768 && setRollerPos("253px");
        !firstLoad &&
          setPlaceObj({
            current: "קצת עלינו",
            links: [
              {
                target: "home",
                text: "דף הבית",
              },
              {
                target: "create",
                text: "יצירת הזמנה",
              },
              {
                target: "profile",
                text: "האיזור האישי",
              },
            ],
          });
        windowWidth >= 768 && setIsOpen(false);
        if (selected !== "") {
          setTimeout(
            () => {
              windowWidth < 768 && setIsOpen(false);
              router.push("/About");
            },
            windowWidth >= 768 ? 1500 : 800
          );
        }
        break;
      case "problem":
        windowWidth < 768 && setRollerPos("306px");
        !firstLoad &&
          setPlaceObj({
            current: "דף הבית",
            links: [
              {
                target: "create",
                text: "יצירת הזמנה",
              },
              {
                target: "profile",
                text: "האיזור האישי",
              },
              {
                target: "about",
                text: "קצת עלינו",
              },
            ],
          });
        windowWidth >= 768 && isOpen && setIsOpen(false);
        if (selected !== "") {
          setTimeout(() => {
            windowWidth < 768 && setIsOpen(false);
            router.push("/Problem");
          }, 800);
        }
        break;
      case "user":
        !firstLoad &&
          setPlaceObj({
            current: "דף הבית",
            links: [
              {
                target: "create",
                text: "יצירת הזמנה",
              },
              {
                target: "profile",
                text: "האיזור האישי",
              },
              {
                target: "about",
                text: "קצת עלינו",
              },
            ],
          });
        isOpen && setIsOpen(false);
        if (selected !== "") {
          setTimeout(() => {
            router.push("/Login");
          }, 800);
        }
        break;
    }
    if (!firstLoad) {
      setFirstLoad(true);
    }
  }, [place, selected]);
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function openMenu() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    router.push("/");
    dispatch(getUserLogout());
    dispatch(authLogout());
    dispatch(inviteLogout());
  }

  return (
    <motion.div
      animate={
        isOpen && windowWidth < 768
          ? { backgroundColor: "#BA53EBCC", pointerEvents: "auto" }
          : { backgroundColor: "#BA53EB00", pointerEvents: "none" }
      }
      transition={{ backgroundColor: { duration: 0.6 } }}
      className="absolute top-0 w-full h-full flex justify-center z-50"
    >
      <div
        className="sticky h-[65px] top-[20px] w-[92%] relative 
      md:w-full"
      >
        <div
          className="absolute pointer-events-auto bg-white rounded-[5px] shadow-25 flex items-center justify-between px-2 w-full h-full z-20
        md:w-[237px] md:rounded-l-none md:px-[20px]
        "
        >
          <img
            alt=""
            src={WebLogo}
            onClick={() =>
              setTimeout(() => {
                setIsOpen(false);
                router.push("/");
              }, 800)
            }
            className="w-[97px] cursor-pointer"
          />
          {isAuth && (
            <CogIcon className="w-[25px] md:w-[20px] cursor-pointer" />
          )}
          <motion.div
            animate={
              place === "user" ? { color: "#EFA332" } : { color: "rgb(0,0,0)" }
            }
          >
            {isAuth ? (
              <LoginIcon
                onClick={() => logOut()}
                className="w-[25px] md:w-[20px] cursor-pointer"
              />
            ) : (
              <UserIcon
                onClick={() => setSelected("user")}
                className="w-[25px] md:w-[20px] cursor-pointer"
              />
            )}
          </motion.div>
          <motion.div
            animate={isOpen ? { color: "#EFA332" } : { color: "rgb(0,0,0)" }}
            className="md:hidden"
          >
            <ChevronDownIcon onClick={() => openMenu()} className="w-[25px]" />
          </motion.div>
        </div>
        <motion.div
          animate={
            isOpen ? { height: "349px", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={
            isOpen
              ? { height: { duration: 1 }, opacity: { duration: 0 } }
              : { height: { duration: 1 }, opacity: { delay: 1 } }
          }
          className="opacity-0 absolute w-full h-0 bg-white top-0 right-0 rounded-[5px] shadow-25 z-0 grid grid-rows-2 grid-cols-1 md:hidden"
        >
          <motion.div
            animate={
              isOpen && place === "user" && !selected
                ? { y: rollerPos, width: "100%" }
                : isOpen
                ? { y: rollerPos, width: "102%" }
                : { y: 0, width: "100%" }
            }
            transition={
              selected !== ""
                ? { y: { duration: 0.9, type: "spring" } }
                : isOpen
                ? {
                    y: { delay: 1, duration: 0.9 },
                    width: { delay: 1.4, duration: 0.5 },
                  }
                : {
                    y: { duration: 0.3 },
                  }
            }
            className={`absolute row-start-1 row-span-2 col-start-1 top-0 justify-self-center bg-yel w-[102%] h-[43px] rounded-[5px]`}
          ></motion.div>
          <div className="w-full text-black/60 h-[286px] overflow-hidden row-start-1 row-span-2 col-start-1 self-end py-[32px] px-[21px] space-y-[32px] flex flex-col relative">
            <motion.p
              animate={
                isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.5 }
              }
              transition={
                isOpen && {
                  opacity: { delay: 1, duration: 0.9 },
                  scale: { delay: 1, duration: 0.9 },
                }
              }
              onClick={() => setSelected("home")}
              className={`${
                selected === "home"
                  ? "text-black"
                  : place === "home" && selected === "" && "text-black"
              } self-end`}
            >
              דף הבית
            </motion.p>
            <motion.p
              animate={
                isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.5 }
              }
              transition={
                isOpen && {
                  opacity: { delay: 1, duration: 0.9 },
                  scale: { delay: 1, duration: 0.9 },
                }
              }
              onClick={() => setSelected("create")}
              className={`${
                selected === "create"
                  ? "text-black"
                  : place === "create" && selected === "" && "text-black"
              } self-end`}
            >
              יצירת הזמנה
            </motion.p>
            <motion.p
              animate={
                isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.5 }
              }
              transition={
                isOpen && {
                  opacity: { delay: 1, duration: 0.9 },
                  scale: { delay: 1, duration: 0.9 },
                }
              }
              onClick={() => setSelected("profile")}
              className={`${
                selected === "profile"
                  ? "text-black"
                  : place === "profile" && selected === "" && "text-black"
              } self-end`}
            >
              האיזור האישי
            </motion.p>
            <motion.p
              animate={
                isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.5 }
              }
              transition={
                isOpen && {
                  opacity: { delay: 1, duration: 0.9 },
                  scale: { delay: 1, duration: 0.9 },
                }
              }
              onClick={() => setSelected("about")}
              className={`${
                selected === "about"
                  ? "text-black"
                  : place === "about" && selected === "" && "text-black"
              } self-end`}
            >
              קצת עלינו
            </motion.p>
            <motion.p
              animate={
                isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.5 }
              }
              transition={
                isOpen && {
                  opacity: { delay: 1, duration: 0.9 },
                  scale: { delay: 1, duration: 0.9 },
                }
              }
              onClick={() => setSelected("problem")}
              className={`${
                selected === "problem"
                  ? "text-black"
                  : place === "problem" && selected === "" && "text-black"
              } text-center`}
            >
              נתקלתם בתקלה? לחצו כאן ודווחו לנו
            </motion.p>
          </div>
        </motion.div>
        <div
          style={{ width: `${windowWidth - 237 - 35}px` }}
          className="hidden md:block md:pointer-events-auto md:h-full md:absolute md:right-0"
        >
          <motion.div
            animate={
              isOpen
                ? { height: "263px", pointerEvents: "auto" }
                : { height: 0, pointerEvents: "none" }
            }
            transition={
              isOpen ? { height: { duration: 1 } } : { height: { duration: 2 } }
            }
            className="absolute h-[0px] w-full top-0 bg-per/90 backdrop-blur-[4px] right-0 rounded-l-[5px] flex items-end xl:hidden"
          >
            <div className="w-full text-white h-[200px] px-[30px] flex flex-col justify-evenly text-right divide-y">
              {placeObj &&
                placeObj.links.map((item, index) => (
                  <motion.div
                    animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
                    transition={
                      isOpen
                        ? {
                            opacity: { delay: 0.6, duration: 0.5 },
                          }
                        : { opacity: { delay: index * 0.2, duration: 0.5 } }
                    }
                    key={item && item.target}
                    onClick={() => setSelected(item && item.target)}
                    className="h-full opacity-0 flex items-center w-full cursor-pointer"
                  >
                    <p className="w-full pointer-events-none">
                      {item && item.text}
                    </p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
          <div className="absolute w-full h-full text-black/60 rounded-l-[5px] bg-white shadow-25 flex items-center justify-between px-[20px]">
            <motion.div
              animate={isOpen ? { color: "#BA53EB" } : { color: "#000000" }}
              className="xl:hidden"
            >
              <ChevronDownIcon
                onClick={() => setIsOpen(!isOpen)}
                className="w-[20px] cursor-pointer"
              />
            </motion.div>
            <p
              className={
                place === "problem"
                  ? "cursor-default text-black bg-yel px-2 rounded-[5px] shadow-25"
                  : "cursor-pointer"
              }
              onClick={() => place !== "problem" && setSelected("problem")}
            >
              נתקלתם בתקלה? לחצו כאן ודווחו לנו
            </p>
            <div className="hidden xl:flex xl:space-x-[75px] xl:cursor-default">
              <p
                onClick={() => {
                  setTimeout(() => {
                    router.push("/About");
                  }, 800);
                }}
                className={`${
                  place === "about"
                    ? "text-black px-3 bg-yel rounded-[5px] shadow-25"
                    : "text-black/60 cursor-pointer"
                }`}
              >
                קצת עלינו
              </p>
              <p
                onClick={() => {
                  setTimeout(() => {
                    router.push("/Profile");
                  }, 800);
                }}
                className={`${
                  place === "profile"
                    ? "text-black px-3 bg-yel rounded-[5px] shadow-25"
                    : "text-black/60 cursor-pointer"
                }`}
              >
                האיזור האישי
              </p>
              <p
                onClick={() => {
                  setTimeout(() => {
                    router.push("/Create");
                  }, 800);
                }}
                className={`${
                  place === "create"
                    ? "text-black px-3 bg-yel rounded-[5px] shadow-25"
                    : "text-black/60 cursor-pointer"
                }`}
              >
                יצירת הזמנה
              </p>
              <p
                onClick={() => {
                  setTimeout(() => {
                    router.push("/");
                  }, 800);
                }}
                className={`${
                  place === "home"
                    ? "text-black px-3 bg-yel rounded-[5px] shadow-25"
                    : "text-black/60 cursor-pointer"
                }`}
              >
                דף הבית
              </p>
            </div>
            <p
              className={`${
                /*prettier-ignore*/ place === "problem" || place === "user" 
                  ? "cursor-pointer"
                  : "bg-yel px-2 rounded-[5px] shadow-25 text-black cursor-default xl:hidden"
              } xl:hidden`}
              onClick={() => {
                if (place === "problem" || place === "user") {
                  setTimeout(() => {
                    router.push("/");
                  }, 800);
                }
              }}
            >
              {placeObj && placeObj.current}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default NewMenu;
