import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SkeletonBar from "/src/skeletons/skeletons";
import { useQuery } from "@tanstack/react-query";
import { fetchSuggestVideos } from "../../apis/getApi";

export default function SuggestMovies({ suggestGenre, changeMovieId }) {
  const [trendingSlideWidth, setTrendingSlideWidth] = useState(null);
  const slideRef = useRef(null);

  const { status, data } = useQuery({
    queryKey: ["suggestVideo", suggestGenre],
    queryFn: () => fetchSuggestVideos(suggestGenre),
    keepPreviousData: false,
  });
  useEffect(() => {
    if (data) {
      setTrendingSlideWidth(
        slideRef.current.scrollWidth - slideRef.current.offsetWidth
      );
    }
  }, [data]);

  if (status === "error") return <p>Error......</p>;
  return (
    <>
      <h3 className=" border-t-4 border-white font-kanit p-2 ph-size:max-w-general sm:max-w-none text-white text-4xl flex justify-start bg-gradient-to-r from-purple-500 to-pink-500 ">
        You may also like
      </h3>
      <div
        ref={slideRef}
        className=" border-b-4 border-white overflow-hidden cursor-grab ph-size:max-w-general sm:max-w-none flex bg-gradient-to-r from-purple-500 to-pink-500 sm:h-80"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -trendingSlideWidth }}
          className={
            " item-slider flex " +
            (!data && " justify-center items-center ph-size:w-full sm:w-full")
          }
        >
          {data?.results?.map((movie) => (
            <Movie
              movie={movie}
              key={movie.poster_path}
              changeMovieId={changeMovieId}
            />
          ))}
          {!data && (
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

function Movie({ movie, changeMovieId }) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [imageNotAvailable, setImageNotAvailable] = useState(false);
  const link = "https://image.tmdb.org/t/p/original";

  return (
    <motion.div
      key={movie.original_title}
      className="img-container ph-size:w-40 ph-size:max-h-small sm:w-64 sm:max-h-normal p-4 relative "
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: imageIsLoaded ? 1 : 0 }}
        src={link + movie.poster_path}
        onLoad={() => setImageIsLoaded(true)}
        onError={() => setImageNotAvailable(true)}
        className=" w-64 cursor-grab pointer-events-none relative z-10 "
      />
      <div className=" absolute w-64 bg-opacity-50 rounded-md bg-red-900 "></div>
      {imageNotAvailable && (
        <div className=" text-lg absolute w-64 bg-opacity-50 rounded-md bg-red-900 flex justify-center items-center">
          <div>Image Not Available!</div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.3 }}
        onClick={() => {
          changeMovieId(movie);
        }}
        className={
          " p-1 pr-2 pl-2 bg-fuchsia-600 text-white rounded-full drop-shadow-xl text-md absolute top-2 right-2 z-20"
        }
      >
        <span className=" text-white">check</span>
      </motion.button>
    </motion.div>
  );
}
