import {
  faChevronDown,
  faChevronUp,
  faPlay,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { SkeletonColumn } from "../skeletons/skeletons";
import { motion } from "framer-motion";

export default function ApiMovies({ movie, changeSrc }) {
  const [fetchedData, setFetchedData] = useState(null);
  const [requestedCatagory, setRequestedCatagory] = useState("popular");

  //for console
  const imgRef = useRef();
  //filtering movie by type
  function handleCatagory(type) {
    setFetchedData(null);
    setRequestedCatagory(type);
  }
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, [3000]);
  }, [requestedCatagory]);
  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/movie/${requestedCatagory}?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWY1ZTkwNGVkNWNkNTZiYzg3NTRmZjIyZDA4MmQ5NCIsInN1YiI6IjY0ZDcxZDY3YjZjMjY0MTE1NzUzNjIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOaUcA7pG53bkWSCcnxRYJRFTbY95LGjLKl0cux84S4",
      },
    };

    axios(url, options)
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };
  const moviesList = fetchedData?.results?.map((movie) => (
    <Movie movie={movie} key={movie.id} changeSrc={changeSrc} imgRef={imgRef} />
  ));
  const skeletonImgs = [1, 2, 3, 4].map((num) => (
    <div key={num}>
      <SkeletonColumn percent={"390px"} />
    </div>
  ));
  return (
    <>
      <div className=" selectionNav flex justify-between p-2">
        <SelectionHeadDropdown
          name={"Catagories"}
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
      <div className="selectionImgs grid ph-size:gap-3 sm:gap-8 ph-size:grid-cols-2 sm:grid-cols-2 md:grid-cols-4  font-head ph-size:p-1 sm:p-3">
        {moviesList}
        {!fetchedData && skeletonImgs}
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
                handleCatagory(ApiName[index]);
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

function Movie({ movie, changeSrc, imgRef }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" flex flex-col relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* blah blah */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={imgRef}
        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
        alt={movie.original_title}
        className="rounded-md "
      />
      <span className="ph-size:text-sm sm:text-lg text-white text-start capitalize">
        {movie.original_title}
      </span>
      {/* check movie button */}
      {isHover && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.3 }}
          onClick={() => changeSrc(movie)}
          className={
            "p-1 pr-2 pl-2 bg-green-400 text-white rounded-3xl text-md absolute top-3 right-3 drop-shadow-xl"
          }
        >
          <span className=" text-white">check</span>
        </motion.button>
      )}
    </motion.div>
  );
}
