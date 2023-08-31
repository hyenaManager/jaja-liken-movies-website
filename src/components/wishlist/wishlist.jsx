import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function WishList({ wishlist, removeFromWishlist }) {
  return (
    <>
      <div
        className=" pt-14 mt-3 bg-no-repeat min-h-fullvh "
        style={{ backgroundImage: "url('bgBlue.jpg')" }}
      >
        <div className=" h-full w-full grid ph-size:grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  gap-8 p-10 ">
          {/* {error && <div> there is some error {error.message}</div>} */}
          {wishlist.length === 0 ? (
            <div className=" text-4xl">There is no movie you add....</div>
          ) : (
            wishlist.map((movie) => (
              <MoviePoster
                movie={movie}
                key={movie.id}
                removeFromWishlist={removeFromWishlist}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
function MoviePoster({ movie, removeFromWishlist }) {
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
          className={`w-full h-full bg-opacity-10 rounded-md bg-blue-900 absolute flex flex-col justify-center items-center`}
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
          onClick={() => removeFromWishlist(movie)}
          className=" z-20  p-1 pr-2 pl-2 bg-red-400 text-white rounded-md text-md drop-shadow-xl absolute top-3 right-3"
        >
          remove
        </motion.button>
      )}
      {isHover && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.2 }}
          className=" z-20 p-1 pr-2 pl-2 bg-green-400 text-white rounded-md text-md drop-shadow-xl absolute top-3 left-3"
        >
          <Link to={`/search/${movie.id}`} className="text-white">
            Check
          </Link>
        </motion.button>
      )}
    </motion.div>
  );
}
