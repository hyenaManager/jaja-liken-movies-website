import {
  faCircle,
  faClock,
  faClosedCaptioning,
  faEllipsis,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { availableDates } from "./datas";
import axios from "axios";
import Skeleton, { ImgSkeleton, SkeletonText } from "../skeletons/skeletons";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import SkeletonBar from "../skeletons/skeletons";
export default function Head({ movieId }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    setTimeout(() => findData(movieId), [4000]);
  }, [movieId]);

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
          " bg-cover bg-center bg-no-repeat mt-10 " +
          (!selectedMovie && " bg-slate-300")
        }
        style={{
          backgroundImage: `url(${link + selectedMovie?.backdrop_path})`,
        }}
      >
        {/* movie covers */}
        <div className=" ml-10 flex flex-col font-kanit pt-9">
          <div className=" flex justify-start ">
            {/* movie img */}

            {!selectedMovie ? (
              <ImgSkeleton />
            ) : (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={link + selectedMovie?.poster_path}
                className=" w-80 h-96 object-cover mr-10 rounded-lg drop-shadow-md"
                alt="instetallar"
              />
            )}

            {/* movie details */}
            <div
              className="flex flex-col h-96 text-slate-100 font-head"
              style={{ textShadow: "2px 2px 8px black" }}
            >
              <span className="  mb-3 text-lg font-bold">
                {selectedMovie?.release_date}
                {!selectedMovie && <SkeletonBar percent={"100px"} />}
              </span>
              <h2 className=" text-4xl mb-3 font-bold drop-shadow-md capitalize">
                {selectedMovie?.title}
                {!selectedMovie && <SkeletonBar percent={"400px"} />}
              </h2>
              {/* about movie */}
              <div className="flex  mb-3 text-lg">
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
              {/* short story */}
              <div className=" mb-3 text-xl drop-shadow-m6 text-slate-100 font-pureStyle">
                {selectedMovie?.overview}
                {!selectedMovie && <SkeletonBar percent={"800px"} />}
                {!selectedMovie && <SkeletonBar percent={"800px"} />}
                {!selectedMovie && <SkeletonBar percent={"600px"} />}
                {!selectedMovie && <SkeletonBar percent={"400px"} />}
              </div>
              {/* movies rating and time */}
              <ul className=" list-none flex mb-3 text-lg">
                <li className=" mr-3 flex justify-start items-center">
                  <FontAwesomeIcon icon={faClock} className=" text-teal-300" />
                  <span>
                    {selectedMovie && selectedMovie.runtime + " min"}
                    {!selectedMovie && <SkeletonBar percent={"70px"} />}
                  </span>
                </li>
                <li className=" mr-3 flex justify-start items-center">
                  <FontAwesomeIcon
                    icon={faClosedCaptioning}
                    className=" text-slate-200"
                  />
                  <span>
                    {selectedMovie && "subtitle"}
                    {!selectedMovie && <SkeletonBar percent={"70px"} />}
                  </span>
                </li>
                <li className=" mr-3 flex justify-start items-center">
                  <FontAwesomeIcon icon={faCircle} className=" text-red-700" />
                  <span>
                    {selectedMovie &&
                      "liken rate " + selectedMovie?.vote_average + " /10"}
                    {!selectedMovie && <SkeletonBar percent={"70px"} />}
                  </span>
                </li>
              </ul>
              {/* option mode show only after api is fteched */}
              {selectedMovie && (
                <div className=" flex justify-start mb-3">
                  {/* trailer button*/}
                  <button className=" mr-5 p-3 pr-4 pl-4 hover:bg-red-700 bg-red-500 text-white rounded-3xl text-lg">
                    <FontAwesomeIcon
                      icon={faPlay}
                      className="mr-2 text-white"
                    />
                    <span className=" text-white">watch trailer</span>
                  </button>
                  {/* read more */}
                  <div className=" flex justify-center items-center text-white cursor-pointer ">
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      className=" mr-1 text-4xl items-center"
                    />
                    <span className=" text-2xl flex items-center">
                      read more
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* By ticket or Watch widget*/}
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
