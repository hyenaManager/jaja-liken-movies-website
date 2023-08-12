import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { movies } from "./datas";
import axios from "axios";
import { motion } from "framer-motion";
import { fetchData } from "./getApi";

export default function ApiMovies({ changeSrc }) {
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    async function fetch() {
      const data = await fetchData();
      setFetchedData(data);
    }
  }, []);
  console.log(fetchData);
  const moviesList = fetchedData?.results?.map((movie) => (
    <Movie movie={movie} key={movie.id} changeSrc={changeSrc} />
  ));
  return (
    <>
      <div className=" grid grid-cols-4 gap-8 font-head">{moviesList}</div>
    </>
  );
}

function Movie({ movie, changeSrc }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className=" flex flex-col relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* blah blah */}
      <img
        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
        alt={movie.original_title}
        className="rounded-md w-78 h-103 object-cover "
      />
      <span className="text-lg text-white text-start capitalize">
        {movie.original_title}
      </span>
      {/* check movie button */}
      {isHover && (
        <button
          onClick={() => changeSrc(movie)}
          className={
            "p-1 pr-2 pl-2 bg-red-700 text-white rounded-3xl text-md absolute top-3 right-3 "
          }
        >
          <span className=" text-white">check</span>
        </button>
      )}
    </div>
  );
}
