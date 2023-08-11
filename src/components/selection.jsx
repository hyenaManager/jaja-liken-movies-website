import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

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
          onClick={() => changeSrc(movie.source)}
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

const movies = [
  { name: "starwar", id: 0, source: "/starwar.jpg" },
  { name: "marvel", id: 1, source: "/marvel.jpg" },
  { name: "titanic", id: 2, source: "/titanic.png" },
  { name: "flash", id: 3, source: "/speed.jpg" },
  { name: "joker", id: 4, source: "/joker.jpg" },
  { name: "twilight", id: 5, source: "/twilight.jpg" },
  { name: "Tomcruise", id: 6, source: "/tomcruise.jpg" },
  { name: "hobbit", id: 7, source: "/hobbit.jpg" },
  { name: "deadpool", id: 8, source: "/deadpool.png" },
  { name: "intution", id: 9, source: "/horror.jpg" },
  { name: "A quite place", id: 10, source: "/inception.jpg" },
  { name: "matrix", id: 11, source: "/matrix.jpg" },
];
