import {
  faClock,
  faClosedCaptioning,
  faEllipsis,
  faPlay,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ImgSkeleton } from "/src/skeletons/skeletons";
import { motion } from "framer-motion";
import SkeletonBar from "/src/skeletons/skeletons";
import "/src/styles/queries.css";

import { useQuery } from "@tanstack/react-query";
import { fetchExactMovie } from "../../apis/getApi";
import { useParams } from "react-router-dom";
import TrailerVideo from "../main/trailerVideo";

export default function Detail() {
  const { movieId } = useParams();
  const [readMore, setReadMore] = useState(false);
  const [overviewWidth, setOverviewWidth] = useState(null);
  const [watchTrailer, setWatchTrailer] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  //fetching exactly one movie match with movieId
  const { status, data } = useQuery({
    queryKey: ["headMovie", movieId],
    queryFn: () => fetchExactMovie(movieId),
    keepPreviousData: true,
  });

  const link = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    // Load the image source when the component mounts
    const source = link + data?.poster_path;
    const img = new Image();
    img.src = source;
    img.onload = () => {
      setImgSrc(source);
    };
  }, [data?.poster_path]);

  return (
    <>
      <div
        className={
          "headParentDiv relative  mt-14 pb-5 h-fullvh" +
          (!data && " bg-slate-300")
        }
        style={{
          backgroundImage: `url(${link + data?.backdrop_path})`,
        }}
      >
        {/* if error  */}
        {status === "error" && (
          <div className=" text-4x text-red-600 w-full h-full p-5">
            This page not available.... :(
          </div>
        )}
        {/* movie covers */}

        <div
          className={
            "movieCover flex ph-size:flex-col ipad:flex-row font-kanit mt-9 p-3 justify-start items-start "
          }
        >
          {/* movie img */}

          {!data && !imgSrc ? (
            <ImgSkeleton />
          ) : (
            <motion.img
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              src={imgSrc}
              className=" w-1/4 h-1/4 mr-4 object-cover rounded-lg drop-shadow-md border-2 border-white bg-red-900"
            />
          )}

          {/* movie details */}
          <div
            className="flex flex-col text-slate-100 font-head  justify-start "
            style={{ textShadow: "2px 2px 8px black" }}
          >
            <span className="  mb-3 text-lg font-bold">
              {data?.release_date}
              {!data && <SkeletonBar percent={"20%"} />}
            </span>
            <h2 className=" ph-size:text-sm sm:text-4xl mb-3 font-bold drop-shadow-md capitalize">
              {data?.title}
              {!data && <SkeletonBar percent={"50%"} />}
            </h2>
            {/* about movie */}
            <div className="flex  mb-3 text-lg ">
              <span className=" mr-4 drop-shadow-md ">
                {data?.genres?.[1]?.name}
                {!data && <SkeletonBar percent={"50px"} />}
              </span>
              <ul className=" flex  ">
                <li className=" mr-3 ml-3 drop-shadow-md border-b-4 border-green-500">
                  {data?.genres?.[2]?.name}
                  {!data && <SkeletonBar percent={"50px"} />}
                </li>
                <li className=" mr-3 ml-3 drop-shadow-md border-b-4 border-green-500">
                  {data?.genres?.[0]?.name}
                  {!data && <SkeletonBar percent={"50px"} />}
                </li>
              </ul>
            </div>
            {/* short story or overview  text */}
            <div className=" mb-3 text-xl drop-shadow-m6 text-slate-100 font-pureStyle">
              {data && (
                <p
                  //implement readmore function only when the text is heigher that 48px
                  style={
                    overviewWidth > 56 && !readMore
                      ? { maxHeight: "48px", overflow: "hidden" }
                      : null
                  }
                >
                  {data?.overview}
                </p>
              )}
              {/* read MOre button */}
              {/* show the readmore button only when api is fetched and text width is > 48px */}
              {data && overviewWidth > 56 && (
                <button
                  className=" flex justify-start items-center text-white "
                  onClick={() => setReadMore(!readMore)}
                  style={{ textShadow: "2px 2px 8px black" }}
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className=" mr-1 text-2xl items-center "
                    style={{ textShadow: "2px 2px 8px black" }}
                  />
                  <span className=" text-xl flex items-center ">
                    {readMore ? "show less" : "read more"}
                  </span>
                </button>
              )}

              {!data && <SkeletonBar percent={"90%"} />}
              {!data && <SkeletonBar percent={"85%"} />}
              {!data && <SkeletonBar percent={"70%"} />}
              {!data && <SkeletonBar percent={"40%"} />}
            </div>
            {/* movies rating and time */}
            <ul className=" list-none flex mb-3 text-lg">
              <li className=" flex mr-10 justify-start items-center">
                <FontAwesomeIcon icon={faClock} className=" text-teal-300" />
                <span>
                  {data && data.runtime + " min"}
                  {!data && <SkeletonBar percent={"70px"} />}
                </span>
              </li>
              <li className=" flex mr-10 justify-start items-center">
                <FontAwesomeIcon
                  icon={faClosedCaptioning}
                  className=" text-slate-200"
                />
                <span>
                  {data && "subtitle"}
                  {!data && <SkeletonBar percent={"70px"} />}
                </span>
              </li>
              <li className=" flex justify-start items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className=" text-yellow-500 text-xl flex items-center justify-center"
                />
                <span>
                  {data && "imdb " + data?.vote_average + " /10"}
                  {!data && <SkeletonBar percent={"70px"} />}
                </span>
              </li>
            </ul>
            {/* option mode watch trailer and add wishlist mode show only after api is fteched */}
            {data && (
              <div className=" flex justify-start items-center">
                {/* trailer button*/}
                <button
                  onClick={() => setWatchTrailer(!watchTrailer)}
                  className=" mr-5 p-3 pr-4 pl-4 hover:bg-red-700 bg-red-500 text-white rounded-3xl text-lg"
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2 text-white" />
                  <span className=" text-white">watch trailer</span>
                </button>
                {/* add to wishlist button */}
                <button
                  // onClick={() => setWatchTrailer(!watchTrailer)}
                  className=" mr-5 p-3 pr-4 pl-4 hover:bg-green-700 bg-green-500 text-white rounded-3xl text-lg"
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 text-white" />
                  <span className=" text-white">wishlist</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* You may also like*/}
        {watchTrailer && (
          <TrailerVideo
            toggleVideo={() => setWatchTrailer(!watchTrailer)}
            movieSource={data}
          />
        )}
      </div>
    </>
  );
}
