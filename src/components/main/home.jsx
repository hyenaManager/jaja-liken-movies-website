import { useRef, useState, useTransition } from "react";
import Head from "./selectedMovie";
import ApiMovies from "./selection";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../apis/getApi";

console.log("this is local storage" + localStorage);

function Main() {
  const [movieId, setMovieId] = useState(null);
  const headRef = useRef(null);
  const [isPending, startTransition] = useTransition();

  function changeSrcId(src) {
    jumpToTop();
    startTransition(() =>
      setTimeout(() => {
        setMovieId(src.id);
      }, 700)
    );
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
    queryKey: ["videoPosters", "popular"],
    queryFn: fetchMovies("popular"),
  });

  return (
    <>
      <div className=" LikenMovieApp relative ph-size:max-w-screen-generalSize sm:max-w-none">
        <div key={movieId} className=" pt-3  bg-red-700" ref={headRef}>
          <Head
            movieId={movieId || data?.results?.[0]?.id}
            changeMovieId={changeSrcId}
          />
        </div>
        <main className=" showedMovies bg-slate-800 ph-size:p-1 ph-size:mr-5 ph-size:ml-5 sm:p-6 sm:mr-12 sm:ml-12 ">
          <ApiMovies changeSrc={changeSrcId} />
        </main>
      </div>
    </>
  );
}

export default Main;
