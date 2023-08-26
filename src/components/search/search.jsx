import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useTransition } from "react";
import { fetchMovieByName } from "../../apis/getApi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SkeletonBar, { SkeletonColumn } from "../../skeletons/skeletons";

export default function Search() {
  const [searchName, setSearchName] = useState("avenger");
  const [inputText, setInputText] = useState("");
  const [isPending, startTransition] = useTransition();

  const { data, status, error, isFetching } = useQuery({
    queryKey: ["searchMovie", searchName],
    queryFn: () => fetchMovieByName(searchName),
    keepPreviousData: true,
  });
  return (
    <div className=" bg-slate-800 pt-14 mt-3">
      <div className="flex justify-center items-center m-0 h-full">
        <input
          type="text"
          value={inputText}
          autoComplete="on"
          onChange={(e) => setInputText(e.target.value)}
          className=" rounded-sm p-1 focus:outline-none focus:shadow-outline mr-2 "
          placeholder="search movies.."
        />
        <FontAwesomeIcon
          onClick={() => setSearchName(inputText)}
          icon={faSearch}
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
      <div className=" grid ph-size:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  gap-8 p-10 ">
        {error && <div> there is some error {error.message}</div>}
        {status === "loading"
          ? [1, 2, 3, 4, 5, 6].map((number) => (
              <SkeletonColumn key={number} percent={"300px"} />
            ))
          : data?.results.map((movie) => (
              <MoviePoster movie={movie} key={movie.id} />
            ))}
      </div>
    </div>
  );
}

function MoviePoster({ movie }) {
  const [isHover, setIsHover] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [seeDetail, setSeeDetail] = useState(false);

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
    return <div className={` bg-opacity-50 rounded-md bg-red-900 `}></div>;
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
          className="p-1 pr-2 pl-2 bg-green-400 text-white rounded-3xl text-md absolute top-3 right-3 drop-shadow-xl"
        >
          <Link to={`/search/${movie.id}`} className="text-white">
            Check
          </Link>
        </motion.button>
      )}
    </motion.div>
  );
}
