import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Navbar() {
  const [selectedNav, setSelectedNav] = useState("main");
  return (
    <>
      <nav className="flex justify-between text-white  fixed top-0 right-0 left-0 bg-slate-900 p-2 z-10">
        <div className=" font-kanit uppercase text-4xl mr-14 flex items-center">
          <FontAwesomeIcon icon={faVideo} className=" text-red-500 mr-3" />
          <span className=" text-2xl font-head font-bold">Liken</span>
        </div>
        <ul className="  list-none  flex justify-evenly font-kanit text-white uppercase w-full items-center cursor-pointer">
          <li
            onClick={() => setSelectedNav("main")}
            className={
              "  hover:text-red-300  text-sm " +
              (selectedNav === "main" && " border-b-4 border-b-red-600")
            }
          >
            main
          </li>
          <li
            onClick={() => setSelectedNav("schedules")}
            className={
              "  hover:text-red-300  text-sm " +
              (selectedNav === "schedules" && " border-b-4 border-b-red-600")
            }
          >
            schedules
          </li>
          <li
            onClick={() => setSelectedNav("tickets")}
            className={
              "  hover:text-red-300  text-sm " +
              (selectedNav === "tickets" && " border-b-4 border-b-red-600")
            }
          >
            tickets
          </li>
          <li
            onClick={() => setSelectedNav("news")}
            className={
              "  hover:text-red-300  text-sm " +
              (selectedNav === "news" && " border-b-4 border-b-red-600")
            }
          >
            news
          </li>
          <li
            onClick={() => setSelectedNav("contact")}
            className={
              "  hover:text-red-300  text-sm " +
              (selectedNav === "contact" && " border-b-4 border-b-red-600")
            }
          >
            contact
          </li>
          <li
            onClick={() => setSelectedNav("login")}
            className=" hover:text-red-300  text-sm"
          >
            login
          </li>
        </ul>
      </nav>
    </>
  );
}
