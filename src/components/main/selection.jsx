import {
  faChevronDown,
  faChevronUp,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { SkeletonColumn } from "/src/skeletons/skeletons";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../apis/getApi";

export default function ApiMovies({ movie, changeSrc }) {
  // const [fetchedData, setFetchedData] = useState(null);
  const [requestedCatagory, setRequestedCatagory] = useState("popular");
  const catagoryRef = useRef("Popular");

  function handleCatagory(type, catagory) {
    setRequestedCatagory(type);
    catagoryRef.current = catagory;
  }
  const { status, data } = useQuery({
    queryKey: ["videoPosters", requestedCatagory],
    queryFn: () => fetchMovies(requestedCatagory),
    keepPreviousData: true,
  });

  const moviesList = data?.results?.map((movie) => (
    <Movie movie={movie} key={movie.id} changeSrc={changeSrc} />
  ));
  const skeletonImgs = [1, 2, 3, 4, 5, 6].map((num) => (
    <div key={num} className=" ph-size:max-w-screen-generalSize sm:max-w-none">
      <SkeletonColumn percent={"300px"} />
    </div>
  ));
  return (
    <>
      <div className=" selectionNav flex justify-between p-2 ph-size:max-w-screen-generalSize sm:max-w-none">
        <SelectionHeadDropdown
          name={catagoryRef.current}
          handleCatagory={handleCatagory}
        />
        <div className="flex justify-start items-center">
          <input
            type="text"
            className=" rounded-sm p-1 focus:outline-none focus:shadow-outline "
            placeholder="search movies.."
          />
          <FontAwesomeIcon
            icon={faSearch}
            className=" cursor-auto text-slate-300"
          />
        </div>
      </div>
      <div className="selectionImgs grid ph-size:gap-3 sm:gap-8 ph-size:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6  font-head ph-size:p-1 sm:p-3">
        {moviesList}
        {status === "loading" && skeletonImgs}
      </div>
    </>
  );
}

function SelectionHeadDropdown({ name, handleCatagory }) {
  const [hidden, setHidden] = useState(true);
  const Type = ["Now Playing", "Popular", "Top Rated", "Upcoming"];
  const ApiName = ["now_playing", "popular", "top_rated", "upcoming"];
  return (
    <div className="relative inline-block text-left z-20" key={name}>
      <button
        onClick={(e) => {
          setHidden(!hidden);
          e.stopPropagation();
        }}
        type="button"
        className="inline-flex justify-center items-center w-full rounded-md text-lg font-head text-white"
        id="options-menu"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {name}
        {hidden ? (
          <FontAwesomeIcon icon={faChevronDown} className=" ml-1" />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} className=" ml-1" />
        )}
      </button>

      <div
        className={
          " origin-top-right absolute right-0 mt-2 h-32 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 " +
          (hidden ? " hidden" : null)
        }
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1 overflow-x-hidden " role="none">
          {Type.map((data, index) => (
            <button
              onClick={() => {
                handleCatagory(ApiName[index], data);
                setHidden(!hidden);
              }}
              key={data}
              className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200 hover:text-gray-900"
              role="menuitem"
            >
              {data}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Movie({ movie, changeSrc }) {
  const [isHover, setIsHover] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    // Load the image source when the component mounts
    const source = "https://image.tmdb.org/t/p/original" + movie.poster_path;
    const img = new Image();
    img.src = source;
    img.onload = () => {
      setImgSrc(source);
    };
  }, [movie.poster_path]);

  if (!imgSrc) {
    return (
      <div
        className={` min-h-imgHeight bg-opacity-50 rounded-md bg-red-900 `}
      ></div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className="flex flex-col relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Display the movie details */}

      <motion.img
        loading="lazy"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        src={imgSrc}
        className="rounded-md"
      />

      {/* Check movie button */}
      {isHover && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.3 }}
          onClick={() => changeSrc(movie)}
          className="p-1 pr-2 pl-2 bg-green-400 text-white rounded-3xl text-md absolute top-3 right-3 drop-shadow-xl"
        >
          <span className="text-white">Check</span>
        </motion.button>
      )}
    </motion.div>
  );
}
