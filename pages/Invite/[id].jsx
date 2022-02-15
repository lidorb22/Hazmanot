import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/outline";

function Invite() {
  const [menuOpen, isMenuOpen] = useState(false);
  const [drawElements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [action, setAction] = useState("none");
  const [windowCord, setWindowCords] = useState({
    width: 200,
    height: 200,
  });
  const menuAnim = {
    open: { height: "300px", width: "350px" },
    closed: { height: "1.5rem", width: "13rem" },
  };
  const router = useRouter();
  const { id } = router.query;

  let canvas;
  let ctx;

  useLayoutEffect(() => {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawElements.forEach((element) => draw(element));
  }, [drawElements]);

  const draw = (element) => {
    switch (element.shapeType) {
      case "rectangle":
        ctx.fillStyle = element.shapeColor;
        ctx.fillRect(
          element.x1,
          element.y1,
          element.x2 - element.x1,
          element.y2 - element.y1
        );
        break;
    }
  };

  const colorAndDeploy = (event) => {
    CreateElement(event.target.id);
    setAction("none");
    isMenuOpen(false);
  };

  const CreateElement = (color, x1, y1, x2, y2, id, shape) => {
    switch (action) {
      case "text":
        console.log("this is a text");
        break;
      case "rectangle":
        let itemId = drawElements.length;
        const newElement = {
          x1: 87,
          y1: 162,
          x2: 262,
          y2: 487,
          shapeType: "rectangle",
          shapeColor: color,
          id: itemId,
        };
        setElements([...drawElements, newElement]);
        break;
      case "Moving":
        const movingElement = {
          x1,
          y1,
          x2,
          y2,
          shapeType: shape,
          shapeColor: color,
          id,
        };
        return { ...movingElement };
    }
  };

  const updateElements = (id, x1, y1, x2, y2, shape, color) => {
    const updateElement = CreateElement(color, x1, y1, x2, y2, id, shape);
    const elementsCopy = [...drawElements];
    elementsCopy[id] = updateElement;
    setElements(elementsCopy);
  };

  const isWithInElement = (element, x, y) => {
    const { x1, x2, y1, y2 } = element;
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
  };

  const getElementAtPosition = (x, y, elements) => {
    return elements.find((item) => isWithInElement(item, x, y));
  };

  const clickDown = (event) => {
    let xPoint;
    let yPoint;
    if (event._reactName === "onMouseDown") {
      const { clientX, clientY } = event;
      xPoint = Math.floor((windowCord.width / 2 - 350 / 2 - clientX) * -1);
      yPoint = Math.floor((windowCord.height / 2 - 650 / 2 - clientY) * -1);
    } else if (event._reactName === "onTouchStart") {
      const { screenX, screenY } = event.touches[0];
      xPoint = Math.floor((windowCord.width / 2 - 350 / 2 - screenX) * -1);
      yPoint = Math.floor((windowCord.height / 2 - 650 / 2 - screenY) * -1);
    }
    const element = getElementAtPosition(xPoint, yPoint, drawElements);
    element && console.log(element);
    console.log(xPoint + " " + yPoint);
    if (element) {
      const offsetX = xPoint - element.x1;
      const offsetY = yPoint - element.y1;
      setSelectedElement({ ...element, offsetX, offsetY });
      setAction("Moving");
    }
  };

  const clickMove = (event) => {
    let xPoint;
    let yPoint;
    if (event._reactName === "onMouseMove") {
      const { clientX, clientY } = event;
      xPoint = Math.floor((windowCord.width / 2 - 350 / 2 - clientX) * -1);
      yPoint = Math.floor((windowCord.height / 2 - 650 / 2 - clientY) * -1);
    } else if (event._reactName === "onTouchMove") {
      const { screenX, screenY } = event.touches[0];
      xPoint = Math.floor((windowCord.width / 2 - 350 / 2 - screenX) * -1);
      yPoint = Math.floor((windowCord.height / 2 - 650 / 2 - screenY) * -1);
    }
    if (action === "none") {
      event.target.style.cursor = getElementAtPosition(
        xPoint,
        yPoint,
        drawElements
      )
        ? "move"
        : "default";
    }
    if (action === "Moving") {
      const { id, x1, y1, x2, y2, shapeType, shapeColor, offsetX, offsetY } =
        selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX = xPoint - offsetX;
      const newY = yPoint - offsetY;
      updateElements(
        id,
        newX,
        newY,
        newX + width,
        newY + height,
        shapeType,
        shapeColor
      );
    }
  };

  const clickUp = () => {
    setAction("none");
    setSelectedElement(null);
  };

  const resizeHandle = () => {
    setWindowCords({ width: window.innerWidth, height: window.innerHeight });
    console.log("resizeHandle");
  };

  useEffect(() => {
    resizeHandle();
    window.addEventListener("resize", resizeHandle, false);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-blue-200 flex items-center justify-center">
      <div>
        <canvas
          id="myCanvas"
          className="bg-gray-200 shadow-try"
          width={"350px"}
          height={"650px"}
          onMouseDown={clickDown}
          onTouchStart={clickDown}
          onMouseUp={clickUp}
          onTouchEnd={clickUp}
          onMouseMove={clickMove}
          onTouchMove={clickMove}
        />
      </div>
      <motion.div
        animate={menuOpen ? "open" : "closed"}
        variants={menuAnim}
        transition={{
          height: {
            type: "spring",
            bounce: 0,
            stiffness: 40,
            mass: 0.6,
          },
        }}
        className="fixed bottom-12 w-52 h-6 bg-black bg-opacity-70 rounded-md flex"
      >
        {!menuOpen ? (
          <p
            onClick={() => isMenuOpen(true)}
            className="text-md w-full text-center font-bold tracking-widest text-white"
          >
            עיצוב
          </p>
        ) : (
          <div className="w-full h-full text-white mx-2 p-2 flex flex-row space-x-3 text-3xl">
            <div className="absolute bottom-2 left-0 w-full flex flex-col z-10">
              <div
                onClick={() => isMenuOpen(false)}
                className="bg-blue-300 rounded-lg h-10 w-10 self-center flex justify-center"
              >
                <ChevronDownIcon className="w-6 text-black pointer-events-none" />
              </div>
            </div>
            <p id="text" onClick={(e) => setAction(e.target.id)}>
              Text
            </p>
            <p id="rectangle" onClick={(e) => setAction(e.target.id)}>
              rectangle
            </p>
            {action !== "none" && (
              <div className="absolute top-0 right-0 w-full h-full bg-black bg-opacity-80">
                <div className="w-full h-full p-5 grid grid-rows-3 grid-cols-2 text-lg text-black items-center justify-items-center">
                  <div
                    id="red"
                    onClick={(e) => colorAndDeploy(e)}
                    className="bg-red-600 w-14 h-14 rounded-full flex justify-center items-center "
                  >
                    <p className="pointer-events-none">Red</p>
                  </div>
                  <div
                    id="blue"
                    onClick={(e) => colorAndDeploy(e)}
                    className="bg-blue-500 w-14 h-14 rounded-full flex justify-center items-center"
                  >
                    <p className="pointer-events-none">blue</p>
                  </div>
                  <div
                    id="pink"
                    onClick={(e) => colorAndDeploy(e)}
                    className="bg-pink-400 w-14 h-14 rounded-full flex justify-center items-center"
                  >
                    <p className="pointer-events-none">pink</p>
                  </div>
                  <div
                    id="green"
                    onClick={(e) => colorAndDeploy(e)}
                    className="bg-green-600 w-14 h-14 rounded-full flex justify-center items-center"
                  >
                    <p className="pointer-events-none">green</p>
                  </div>
                  <div
                    id="orange"
                    onClick={(e) => colorAndDeploy(e)}
                    className="bg-orange-400 w-14 h-14 rounded-full flex justify-center items-center"
                  >
                    <p className="pointer-events-none">orange</p>
                  </div>
                  <div
                    id="white"
                    onClick={(e) => colorAndDeploy(e)}
                    className="bg-white w-14 h-14 rounded-full flex justify-center items-center"
                  >
                    <p className="pointer-events-none">white</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Invite;
