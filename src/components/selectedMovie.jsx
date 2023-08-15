import {
  faCircle,
  faClock,
  faClosedCaptioning,
  faEllipsis,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { availableDates } from "./datas";
import axios from "axios";
import Skeleton, { ImgSkeleton, SkeletonText } from "../skeletons/skeletons";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import SkeletonBar from "../skeletons/skeletons";
import "/src/styles/queries.css";
export default function Head({ movieId }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [overviewWidth, setOverviewWidth] = useState(null);

  const elementRef = useRef(null);

  const height = elementRef?.current?.clientHeight;

  useEffect(() => {
    setTimeout(() => findData(movieId), [4000]);
  }, [movieId]);

  useEffect(() => {
    if (selectedMovie && elementRef.current.clientHeight !== 48) {
      const height = elementRef.current.clientHeight;

      setOverviewWidth(height);
    }
  }, [selectedMovie]);

  const link = "https://image.tmdb.org/t/p/original/";
  //find movie by movie id
  const findData = async (id) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWY1ZTkwNGVkNWNkNTZiYzg3NTRmZjIyZDA4MmQ5NCIsInN1YiI6IjY0ZDcxZDY3YjZjMjY0MTE1NzUzNjIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOaUcA7pG53bkWSCcnxRYJRFTbY95LGjLKl0cux84S4",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSelectedMovie(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <>
      <div
        className={
          "headParentDiv  mt-10 " + (!selectedMovie && " bg-slate-300")
        }
        style={{
          backgroundImage: `url(${link + selectedMovie?.backdrop_path})`,
        }}
      >
        {/* movie covers */}

        <div
          className={
            "movieCover flex ph-size:flex-col ipad:flex-row font-kanit mt-9 p-3 justify-start items-start "
          }
        >
          {/* movie img */}

          {!selectedMovie ? (
            <ImgSkeleton />
          ) : (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={link + selectedMovie?.poster_path}
              className=" w-80 h-96 mr-4 object-cover rounded-lg drop-shadow-md border-2 border-white"
              alt="instetallar"
            />
          )}

          {/* movie details */}
          <div
            className="flex flex-col text-slate-100 font-head  justify-start "
            style={{ textShadow: "2px 2px 8px black" }}
          >
            <span className="  mb-3 text-lg font-bold">
              {selectedMovie?.release_date}
              {!selectedMovie && <SkeletonBar percent={"20%"} />}
            </span>
            <h2 className=" text-4xl mb-3 font-bold drop-shadow-md capitalize">
              {selectedMovie?.title}
              {!selectedMovie && <SkeletonBar percent={"50%"} />}
            </h2>
            {/* about movie */}
            <div className="flex  mb-3 text-lg ">
              <span className=" mr-4 drop-shadow-md ">
                {selectedMovie?.genres?.[1]?.name}
                {!selectedMovie && <SkeletonBar percent={"50px"} />}
              </span>
              <ul className=" flex  ">
                <li className=" mr-3 ml-3 drop-shadow-md border-b-4 border-green-500">
                  {selectedMovie?.genres?.[2]?.name}
                  {!selectedMovie && <SkeletonBar percent={"50px"} />}
                </li>
                <li className=" mr-3 ml-3 drop-shadow-md border-b-4 border-green-500">
                  {selectedMovie?.genres?.[0]?.name}
                  {!selectedMovie && <SkeletonBar percent={"50px"} />}
                </li>
              </ul>
            </div>
            {/* short story or overview  text */}
            <div className=" mb-3 text-xl drop-shadow-m6 text-slate-100 font-pureStyle">
              {selectedMovie && (
                <p
                  ref={elementRef}
                  //implement readmore function only when the text is heigher that 48px
                  style={
                    overviewWidth > 56 && !readMore
                      ? { maxHeight: "48px", overflow: "hidden" }
                      : null
                  }
                >
                  {selectedMovie?.overview}
                </p>
              )}
              {/* read MOre button */}
              {/* show the readmore button only when api is fetched and text width is > 48px */}
              {selectedMovie && overviewWidth > 56 && (
                <button
                  className=" flex justify-start items-center text-white "
                  onClick={() => setReadMore(!readMore)}
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className=" mr-1 text-2xl items-center drop-shadow-lg"
                  />
                  <span className=" text-xl flex items-center drop-shadow-lg">
                    {readMore ? "show less" : "read more"}
                  </span>
                </button>
              )}

              {!selectedMovie && <SkeletonBar percent={"90%"} />}
              {!selectedMovie && <SkeletonBar percent={"85%"} />}
              {!selectedMovie && <SkeletonBar percent={"70%"} />}
              {!selectedMovie && <SkeletonBar percent={"40%"} />}
            </div>
            {/* movies rating and time */}
            <ul className=" list-none flex mb-3 text-lg">
              <li className=" flex mr-10 justify-start items-center">
                <FontAwesomeIcon icon={faClock} className=" text-teal-300" />
                <span>
                  {selectedMovie && selectedMovie.runtime + " min"}
                  {!selectedMovie && <SkeletonBar percent={"70px"} />}
                </span>
              </li>
              <li className=" flex mr-10 justify-start items-center">
                <FontAwesomeIcon
                  icon={faClosedCaptioning}
                  className=" text-slate-200"
                />
                <span>
                  {selectedMovie && "subtitle"}
                  {!selectedMovie && <SkeletonBar percent={"70px"} />}
                </span>
              </li>
              <li className=" flex justify-start items-center">
                <FontAwesomeIcon icon={faCircle} className=" text-red-700" />
                <span>
                  {selectedMovie &&
                    "imdb " + selectedMovie?.vote_average + " /10"}
                  {!selectedMovie && <SkeletonBar percent={"70px"} />}
                </span>
              </li>
            </ul>
            {/* option mode show only after api is fteched */}
            {selectedMovie && (
              <div className=" flex justify-start items-end">
                {/* trailer button*/}
                <button className=" mr-5 p-3 pr-4 pl-4 hover:bg-red-700 bg-red-500 text-white rounded-3xl text-lg">
                  <FontAwesomeIcon icon={faPlay} className="mr-2 text-white" />
                  <span className=" text-white">watch trailer</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* By ticket or Watch widget*/}
      </div>
    </>
  );
}
function TicketBuy() {
  return (
    <>
      <div className=" flex justify-between items-center bg-slate-950 mt-1 font-head p-10">
        {/* choose date */}
        <div className=" flex flex-col">
          <span className=" text-white">CHOOSE DATE: </span>
          {/* selections of dates */}
          <DateTime option={"date"} />
        </div>
        {/* choose times */}
        <div className=" flex flex-col">
          <span className=" text-white">CHOOSE DATE: </span>
          {/* selections of times */}
          <DateTime option={"time"} />
        </div>
        {/* buy ticket button */}
        <button className=" mr-5 p-2 w-32 h-12 pr-4 pl-4 flex items-center hover:bg-red-700 bg-red-500 text-white rounded-3xl text-lg">
          <span className=" text-white">Buy Ticket</span>
        </button>
      </div>
    </>
  );
}

function DateTime({ option }) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(4);
  const [selectedDate, setSelectedDate] = useState("none");

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

  const pagList =
    option === "date"
      ? availableDates.map((avaDate, index) => {
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
        })
      : availableDates.map((avaDate, index) => {
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
