import { faBars, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ toggleNav }) {
  const [selectedNav, setSelectedNav] = useState("main");
  const bottomBarClass = " border-b-2 border-b-red-600";

  function notAvailableLink() {
    return alert("not available right now 😶");
  }

  return (
    <>
      <nav className="navbar flex justify-between items-center text-white  fixed top-0 right-0 left-0 bg-slate-900 p-2 z-30">
        <div className=" font-kanit uppercase text-4xl flex items-center mr-14">
          <FontAwesomeIcon icon={faVideo} className=" text-red-500 mr-3" />
          <span className=" text-2xl font-head font-bold">Liken</span>
        </div>
        <ul className="  list-none justify-between ph-size:hidden sm:flex font-kanit text-white uppercase w-full items-center cursor-pointer">
          <li className={"  hover:text-red-300 p-2  text-sm "}>
            <Link to={"/"}>main</Link>
          </li>
          <li
            onClick={() => notAvailableLink()}
            className={"  hover:text-red-300 p-2  text-sm "}
          >
            wishlist
          </li>
          <li
            onClick={() => notAvailableLink()}
            className={"  hover:text-red-300 p-2  text-sm "}
          >
            Liken social
          </li>
          <li
            onClick={() => notAvailableLink()}
            className={"  hover:text-red-300 p-2  text-sm "}
          >
            contact
          </li>
          <li className={"  hover:text-red-300 p-2  text-sm "}>
            <Link to={"search"}>search</Link>{" "}
          </li>
          <li
            onClick={() => notAvailableLink()}
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
  function notAvailableLink() {
    return alert("not available right now 😶");
  }
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
          className="top-0  left-0 w-2/5 flex flex-col items-center h-full z-50 bg-slate-800 cursor-pointer"
        >
          <li
            onClick={toggleNav}
            className={
              "  hover:text-red-300 p-3 mt-2  text-lg  cursor-pointer "
            }
          >
            Back
          </li>
          <li
            onClick={toggleNav}
            className={
              "  hover:text-red-300 p-3 mt-2  text-lg  cursor-pointer "
            }
          >
            <Link to={"/"}>main</Link>
          </li>
          <li
            onClick={notAvailableLink}
            className={
              "  hover:text-red-300 p-3 mt-2  text-lg  cursor-pointer "
            }
          >
            favourite
          </li>
          <li
            onClick={notAvailableLink}
            className={
              "  hover:text-red-300 p-3 mt-2  text-lg  cursor-pointer "
            }
          >
            Liken Social
          </li>
          <li
            onClick={notAvailableLink}
            className={
              "  hover:text-red-300 p-3 mt-2  text-lg  cursor-pointer "
            }
          >
            contact
          </li>
          <li
            className={
              "  hover:text-red-300 p-3 mt-2  text-lg  cursor-pointer "
            }
          >
            <Link to={"search"} onClick={toggleNav}>
              search
            </Link>
          </li>
          <li
            onClick={notAvailableLink}
            className=" hover:text-red-300 p-3 mt-2  text-lg "
          >
            login
          </li>
        </motion.ul>
      </nav>
    </>
  );
}
