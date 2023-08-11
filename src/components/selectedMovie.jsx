import {
  faCircle,
  faClock,
  faClosedCaptioning,
  faEllipsis,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function StatusMovie({ movieSrc }) {
  return (
    <>
      <div className=" ml-10 flex flex-col font-kanit">
        <div className=" flex justify-start ">
          {/* movie img */}
          <img
            src={movieSrc}
            className=" w-80 h-96 object-cover bg-slate-400 mr-10 rounded-lg"
            alt="instetallar"
          />
          {/* movie details */}
          <div className="flex flex-col max-w-sm h-96 text-slate-50 ">
            <span className="  mb-3">2017</span>
            <h2 className=" text-4xl mb-3 font-bold drop-shadow-md">
              Intestallar reunion
            </h2>
            {/* about movie */}
            <div className="flex  mb-3 text-lg">
              <span className=" mr-4">science fiction </span>
              <ul className=" list-disc flex  ">
                <li className=" mr-3 ml-3">fiction</li>
                <li className=" mr-3 ml-3">science</li>
              </ul>
            </div>
            {/* short story */}
            <p className=" mb-3">
              When Earth becomes uninhabitable in the future, a farmer and
              ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft,
              along with a team of researchers, to find a new planet for humans.
            </p>
            {/* movies rating and time */}
            <ul className=" list-none flex mb-3 text-lg">
              <li className=" mr-3 flex justify-start items-center">
                <FontAwesomeIcon icon={faClock} className=" text-teal-300" />
                <span>160 min</span>
              </li>
              <li className=" mr-3 flex justify-start items-center">
                <FontAwesomeIcon
                  icon={faClosedCaptioning}
                  className=" text-slate-200"
                />
                <span>subtitle</span>
              </li>
              <li className=" mr-3 flex justify-start items-center">
                <FontAwesomeIcon icon={faCircle} className=" text-red-700" />
                <span>imdb 9.1/10</span>
              </li>
            </ul>
            {/* option mode */}
            <div className=" flex justify-start mb-3">
              {/* trailer button*/}
              <button className=" mr-5 p-3 pr-4 pl-4 hover:bg-red-700 bg-red-500 text-white rounded-3xl text-lg">
                <FontAwesomeIcon icon={faPlay} className="mr-2 text-white" />
                <span className=" text-white">watch trailer</span>
              </button>
              {/* read more */}
              <div className=" flex justify-center items-center text-white cursor-pointer ">
                <FontAwesomeIcon
                  icon={faEllipsis}
                  className=" mr-1 text-4xl items-center"
                />
                <span className=" text-2xl flex items-center">read more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center bg-slate-900 mt-1 rounded-md font-head p-10">
        {/* choose date */}
        <div className=" flex flex-col">
          <span className=" text-white">CHOOSE DATE: </span>
          {/* selections of dates */}
          <ChooseDate />
        </div>
        {/* choose times */}
        <div className=" flex flex-col">
          <span className=" text-white">CHOOSE DATE: </span>
          {/* selections of times */}
          <ChooseDate />
        </div>
        {/* buy ticket button */}
        <button className=" mr-5 p-2 w-32 h-12 pr-4 pl-4 flex items-center hover:bg-red-700 bg-red-500 text-white rounded-3xl text-lg">
          <span className=" text-white">Buy Ticket</span>
        </button>
      </div>
    </>
  );
}

function ChooseDate() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(4);
  const [selectedDate, setSelectedDate] = useState("none");
  const availableDates = [
    { id: 0, month: "Jun", day: "Sunday", date: "1st" },
    { id: 1, month: "Aug", day: "Tuesday", date: "15th" },
    { id: 2, month: "Mar", day: "Thursday", date: "8th" },
    { id: 3, month: "Nov", day: "Monday", date: "21st" },
    { id: 4, month: "Apr", day: "Friday", date: "16th" },
    { id: 5, month: "Sep", day: "Wednesday", date: "30th" },
    { id: 6, month: "Dec", day: "Saturday", date: "12th" },
    { id: 7, month: "Jan", day: "Tuesday", date: "4th" },
    { id: 8, month: "May", day: "Thursday", date: "27th" },
    { id: 9, month: "Oct", day: "Sunday", date: "23rd" },
  ];
  function reduce() {
    if (min !== 0) {
      setMin(min - 1);
      setMax(max - 1);
    }
  }
  function increase() {
    if (max !== availableDates.length - 1) {
      setMin(min + 1);
      setMax(max + 1);
    }
  }

  const pagList = availableDates.map((avaDate, index) => {
    if (min <= index && index <= max) {
      return (
        <button
          onClick={() => setSelectedDate(avaDate.id)}
          className={
            " flex flex-col justify-center items-center text-slate-200 p-1 " +
            (selectedDate === avaDate.id && "border-b-2 border-b-red-600")
          }
          key={avaDate.id}
        >
          <span className=" text-slate-400 text-sm">
            {avaDate.month.toUpperCase() + " " + avaDate.date}
          </span>
          <span className=" uppercase">{avaDate.day}</span>
        </button>
      );
    } else {
      return;
    }
  });
  return (
    <>
      <div className=" flex ">
        <button
          className=" font-bold text-red-700 text-lg mr-2"
          onClick={() => reduce()}
        >
          {"<"}
        </button>
        {pagList}
        <button
          className=" font-bold text-red-700 text-lg ml-2"
          onClick={() => increase()}
        >
          {">"}
        </button>
      </div>
    </>
  );
}
