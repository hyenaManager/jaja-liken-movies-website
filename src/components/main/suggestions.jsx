import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SkeletonBar from "/src/skeletons/skeletons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function SuggestMovies({ suggestGenre, changeMovieId }) {
  const [trendingSlideWidth, setTrendingSlideWidth] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState();
  const slideRef = useRef(null);
  const link = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    setTimeout(() => {
      if (suggestGenre) {
        fetchTrendingMovies();
      }
    }, [3000]);
  }, [suggestGenre]);
  useEffect(
    () =>
      setTrendingSlideWidth(
        slideRef.current.scrollWidth - slideRef.current.offsetWidth
      ),
    [trendingMovies]
  );
  function fetchTrendingMovies() {
    const options = {
      method: "GET",
      url:
        "https://api.themoviedb.org/3/discover/movie?api_key=3ef5e904ed5cd56bc8754ff22d082d94&with_genres=" +
        suggestGenre,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWY1ZTkwNGVkNWNkNTZiYzg3NTRmZjIyZDA4MmQ5NCIsInN1YiI6IjY0ZDcxZDY3YjZjMjY0MTE1NzUzNjIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOaUcA7pG53bkWSCcnxRYJRFTbY95LGjLKl0cux84S4",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setTrendingMovies(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <>
      <h3 className=" font-kanit p-2 ph-size:max-w-general sm:max-w-none text-white text-4xl flex justify-start bg-gradient-to-r from-purple-500 to-pink-500 ">
        You may also like
      </h3>
      <div
        ref={slideRef}
        className=" overflow-hidden cursor-grab ph-size:max-w-general sm:max-w-none flex bg-gradient-to-r from-purple-500 to-pink-500 sm:h-80"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -trendingSlideWidth }}
          className={
            " item-slider flex " +
            (!trendingMovies &&
              " justify-center items-center ph-size:w-full sm:w-full")
          }
        >
          {trendingMovies?.results?.map((movie) => (
            <motion.div
              key={movie.original_title}
              className="img-container ph-size:w-40 ph-size:max-h-small sm:w-64 sm:max-h-normal p-4 relative"
            >
              <motion.img
                alt={movie.original_title}
                src={link + movie.poster_path}
                className=" w-full h-full cursor-grab pointer-events-none "
              />
              <motion.button
                whileHover={{ scale: 1.3 }}
                onClick={() => {
                  changeMovieId(movie);
                }}
                className={
                  "p-1 pr-2 pl-2 bg-fuchsia-600 text-white rounded-full drop-shadow-xl text-md absolute top-2 right-2 z-20"
                }
              >
                <span className=" text-white">check</span>
              </motion.button>
            </motion.div>
          ))}
          {!trendingMovies && (
            <div className=" flex flex-col justify-center items-center ">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className=" flex items-center"
              >
                <SkeletonBar percent={"200px"} />
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className=" flex items-center"
              >
                <SkeletonBar percent={"200px"} />
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className=" flex items-center"
              >
                <SkeletonBar percent={"200px"} />
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
