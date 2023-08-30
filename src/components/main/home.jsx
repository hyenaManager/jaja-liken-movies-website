import { useRef, useState, useTransition } from "react";
import Head from "./checkedMovie";
import CatagoryMovies from "./catagoryMovie";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../apis/getApi";

function Main({ wishlist, addToWishlist, removeFromWishlist }) {
  const [movieId, setMovieId] = useState(null);
  const [movieCatagory, setMovieCatagory] = useState("popular");
  const headRef = useRef(null);
  function changeMovieId(src) {
    jumpToTop();

    setMovieId(src.id);
  }

  function jumpToTop() {
    //scroll selected movie to up
    headRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  //for the first time movieId
  const { status, data } = useQuery({
    queryKey: ["videoPosters", movieCatagory],
    queryFn: fetchMovies(movieCatagory),
  });

  return (
    <>
      <div className=" LikenMovieApp relative ph-size:max-w-screen-generalSize sm:max-w-none">
        <div key={movieId} className=" pt-3" ref={headRef}>
          <Head
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            movieId={movieId || data?.results?.[0]?.id}
            changeMovieId={changeMovieId}
          />
        </div>
        <main className=" showedMovies bg-slate-800 ph-size:p-1 ph-size:mr-5 ph-size:ml-5 sm:p-6 sm:mr-5 sm:ml-5 ">
          <CatagoryMovies
            changeMovieId={changeMovieId}
            changeCatagory={setMovieCatagory}
            movieCatagory={movieCatagory}
          />
        </main>
      </div>
    </>
  );
}

export default Main;
