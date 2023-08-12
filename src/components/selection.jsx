import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { movies } from "./datas";

export default function MovieList({ changeSrc }) {
  const moviesList = movies.map((movie) => (
    <Movie movie={movie} key={movie.name} changeSrc={changeSrc} />
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
        src={movie.source}
        alt={movie.name}
        className="rounded-md w-78 h-103 object-cover "
      />
      <span className="text-lg text-white text-start capitalize">
        {movie.name}
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
