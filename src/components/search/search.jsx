import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useTransition } from "react";
import { fetchMovieByName } from "../../apis/getApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SkeletonBar, { SkeletonColumn } from "../../skeletons/skeletons";

export default function Search({ defaultSearchText, changeDefaultSearchText }) {
  const [searchName, setSearchName] = useState(defaultSearchText);
  const [inputName, setInputName] = useState("");
  const [isPending, startTransition] = useTransition();

  const { data, status, error, isFetching } = useQuery({
    queryKey: ["searchMovie", searchName],
    queryFn: () => fetchMovieByName(searchName),
    keepPreviousData: true,
  });

  return (
    <div
      className=" pt-14 mt-3 bg-no-repeat h-full "
      style={{ backgroundImage: "url('bgBlue.jpg')" }}
    >
      <div className="flex justify-center items-center m-0 h-full">
        <input
          type="text"
          value={inputName}
          autoComplete="on"
          onChange={(e) => {
            setInputName(e.target.value);
          }}
          className=" rounded-sm p-1 focus:outline-none focus:shadow-outline mr-2 "
          placeholder="search movies.."
        />
        <FontAwesomeIcon
          icon={faSearch}
          onClick={() => {
            setSearchName(inputName);
            changeDefaultSearchText(inputName);
          }}
          className=" cursor-pointer text-slate-300 text-xl hover:text-green-400"
        />
      </div>
      <div className=" flex justify-center items-center font-kanit text-2xl text-yellow-50">
        Becarefull what you search 🙄 
      </div>
      {data?.results?.length < 1 && (
        <div className=" flex justify-center items-center font-kanit text-red-400">
          {" "}
          Sorry we could'nt find any movie match with {searchName} ☹️ 
        </div>
      )}
      <div className=" h-full w-full grid ph-size:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  gap-8 p-10 ">
        {/* {error && <div> there is some error {error.message}</div>} */}
        {status === "loading"
          ? [1, 2, 3, 4, 5, 6].map((number) => (
              <SkeletonColumn key={number} percent={"300px"} />
            ))
          : data?.results?.map((movie) => (
              <MoviePoster movie={movie} key={movie.id} />
            ))}
      </div>
    </div>
  );
}

function MoviePoster({ movie }) {
  const [isHover, setIsHover] = useState(false);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [imageNotFound, setImageNotFound] = useState(false);
  const link = "https://image.tmdb.org/t/p/original";
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
        animate={{ opacity: imageIsLoaded ? 1 : 0 }}
        src={link + movie.poster_path}
        onLoad={() => setImageIsLoaded(true)}
        className="rounded-md z-10"
        onError={() => setImageNotFound(true)}
      />
      {/* place holder image */}

      <div
        className={` bg-opacity-50 rounded-md bg-blue-900 absolute w-full h-full`}
      ></div>
      {imageNotFound && (
        <div
          className={`w-full h-full bg-opacity-50 rounded-md bg-blue-900 absolute flex flex-col justify-center items-center`}
        >
          <span className=" font-kanit text-lg text-white ">{movie.title}</span>
          <span className=" font-kanit text-lg text-white ">
            Image Not Available ❕
          </span>
        </div>
      )}

      {/* Check movie button */}
      {isHover && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.3 }}
          className=" z-20 p-1 pr-2 pl-2 bg-green-400 text-white rounded-3xl text-md absolute top-3 right-3 drop-shadow-xl"
        >
          <Link to={`/search/${movie.id}`} className="text-white">
            Check
          </Link>
        </motion.button>
      )}
    </motion.div>
  );
}
