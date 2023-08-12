import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { movies } from "./datas";
import axios from "axios";
import { motion } from "framer-motion";

export default function ApiMovies({ movie, changeSrc }) {
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
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
