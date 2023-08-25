import { faBars, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ toggleNav }) {
  const [selectedNav, setSelectedNav] = useState("main");
  const bottomBarClass = " border-b-2 border-b-red-600";

  return (
    <>
      <nav className="navbar flex justify-between items-center text-white  fixed top-0 right-0 left-0 bg-slate-900 p-2 z-30">
        <div className=" font-kanit uppercase text-4xl flex items-center mr-14">
          <FontAwesomeIcon icon={faVideo} className=" text-red-500 mr-3" />
          <span className=" text-2xl font-head font-bold">Liken</span>
        </div>
        <ul className="  list-none justify-between ph-size:hidden sm:flex font-kanit text-white uppercase w-full items-center cursor-pointer">
          <li
            onClick={() => setSelectedNav("main")}
            className={
              "  hover:text-red-300 p-2  text-sm " +
              (selectedNav === "main" && bottomBarClass)
            }
          >
            <Link to={"/"}>main</Link>
          </li>
          <li
            onClick={() => setSelectedNav("schedules")}
            className={
              "  hover:text-red-300 p-2  text-sm " +
              (selectedNav === "schedules" && bottomBarClass)
            }
          >
            wishlist
          </li>
          <li
            onClick={() => setSelectedNav("tickets")}
            className={
              "  hover:text-red-300 p-2  text-sm " +
              (selectedNav === "tickets" && bottomBarClass)
            }
          >
            Liken social
          </li>
          <li
            onClick={() => setSelectedNav("contact")}
            className={
              "  hover:text-red-300 p-2  text-sm " +
              (selectedNav === "contact" && bottomBarClass)
            }
          >
            contact
          </li>
          <li
            onClick={() => setSelectedNav("search")}
            className={
              "  hover:text-red-300 p-2  text-sm " +
              (selectedNav === "search" && bottomBarClass)
            }
          >
            <Link to={"search"}>search</Link>{" "}
          </li>
          <li
            onClick={() => setSelectedNav("login")}
            className=" hover:text-red-300 p-2  text-sm"
          >
            login
          </li>
        </ul>
        <FontAwesomeIcon
          icon={faBars}
          className=" text-white sm:hidden text-2xl cursor-pointer z-50"
          onClick={toggleNav}
        />
      </nav>
    </>
  );
}

export function SmallNavbar({ toggleNav }) {
  return (
    <>
      <nav
        onClick={toggleNav}
        className="smallNav w-full  z-40 backdrop-blur-sm bg-white/50 fixed top-0 left-0 font-kanit text-white uppercase h-full cursor-pointer"
      >
        <motion.ul
          initial={{ x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          exit={{ opacity: 0, x: "-100vw" }}
          className="top-0  left-0 w-1/3 flex flex-col items-center h-full z-50 bg-slate-800 cursor-pointer"
        >
          <li
            onClick={toggleNav}
            className={"  hover:text-red-300 p-2  text-sm cursor-pointer"}
          >
            Back
          </li>
          <li
            // onClick={() => setSelectedNav("main")}
            className={"  hover:text-red-300 p-2  text-sm cursor-pointer"}
          >
            <Link to={"/"}>main</Link>
          </li>
          <li
            // onClick={() => setSelectedNav("schedules")}
            className={"  hover:text-red-300 p-2  text-sm cursor-pointer"}
          >
            schedules
          </li>
          <li
            // onClick={() => setSelectedNav("tickets")}
            className={"  hover:text-red-300 p-2  text-sm cursor-pointer"}
          >
            tickets
          </li>
          <li
            // onClick={() => setSelectedNav("news")}
            className={"  hover:text-red-300 p-2  text-sm cursor-pointer"}
          >
            news
          </li>
          <li
            // onClick={() => setSelectedNav("contact")}
            className={"  hover:text-red-300 p-2  text-sm cursor-pointer"}
          >
            contact
          </li>
          <li
            // onClick={() => setSelectedNav("login")}
            className=" hover:text-red-300 p-2  text-sm"
          >
            login
          </li>
        </motion.ul>
      </nav>
    </>
  );
}
