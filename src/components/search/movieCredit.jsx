import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SkeletonBar from "/src/skeletons/skeletons";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieCredit } from "../../apis/getApi";

export default function Credits({ movieId }) {
  const [trendingSlideWidth, setTrendingSlideWidth] = useState(null);
  const slideRef = useRef(null);

  const { status, data } = useQuery({
    queryKey: ["suggestVideo", movieId],
    queryFn: () => fetchMovieCredit(movieId),
    keepPreviousData: false,
  });
  const cast = data?.cast;

  useEffect(() => {
    if (cast) {
      setTrendingSlideWidth(
        slideRef.current.scrollWidth - slideRef.current.offsetWidth
      );
    }
  }, [cast]);

  if (status === "error") return <p>Error......</p>;
  return (
    <>
      <h3 className=" border-t-2 border-white font-kanit p-1 ph-size:max-w-general sm:max-w-none text-white text-2xl flex justify-start bg-slate-900 ">
        Cast
      </h3>
      <div
        ref={slideRef}
        className=" border-b-2 border-white overflow-hidden cursor-grab ph-size:max-w-general sm:max-w-none flex bg-slate-950 sm:h-96"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -trendingSlideWidth }}
          className={
            " item-slider flex " +
            (!data && " justify-center items-center ph-size:w-full sm:w-full")
          }
        >
          {cast?.map((profile) => (
            <Profile profile={profile} key={profile.name} />
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

function Profile({ profile }) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [imageNotAvailable, setImageNotAvailable] = useState(false);
  const link = "https://image.tmdb.org/t/p/original";
  console.log(profile);

  return (
    <motion.div className="img-container ph-size:w-40 ph-size:max-h-small sm:w-64 sm:max-h-normal p-4 relative ">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: imageIsLoaded ? 1 : 0 }}
        whileDrag={{ cursor: "grab" }}
        src={
          profile.profile_path
            ? link + profile.profile_path
            : "/public/defaultProfile.jpeg"
        }
        onLoad={() => setImageIsLoaded(true)}
        onError={() => setImageNotAvailable(true)}
        className=" w-full h-full cursor-grab pointer-events-none relative"
      />
      {/* <div className=" text-lg absolute w-full h-full bg-opacity-50 rounded-md bg-red-900 flex justify-center items-center"></div>
      {imageNotAvailable && (
        <div className=" text-lg absolute w-full h-full bg-opacity-50 rounded-md bg-red-900 flex justify-center items-center">
          <div>Image Not Available!</div>
        </div>
      )} */}
      <div className=" flex flex-col justify-center items-center absolute bottom-0 left-0 right-0 bg-slate-800">
        <div className=" text-yellow-200 font-kanit items-center">
          {profile.name}
        </div>
        <div className=" text-white font-head flex justify-center items-center">
          as {profile.character}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.3 }}
        // onClick={() => {
        // (movie);
        // }}
        className={
          "p-1 pr-2 pl-2 bg-fuchsia-600 text-white rounded-full drop-shadow-xl text-md absolute top-2 right-2 z-20"
        }
      >
        <span className=" text-white">check</span>
      </motion.button>
    </motion.div>
  );
}
