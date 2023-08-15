import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Navbar, { SmallNavbar } from "./components/navbar";
import Head from "./components/selectedMovie";
import ApiMovies from "./components/selection";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

function App() {
  const [fetchedMovies, setFetchedMovies] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const link = "https://image.tmdb.org/t/p/original/";
  const headRef = useRef(null);
  const [smallNav, setSmallNav] = useState(false);
  function toggleNav() {
    setSmallNav(!smallNav);
  }
  function movieStatus(src) {
    setMovieId(src.id); //change the movie src
  }
  useEffect(() => {
    if (movieId !== null) {
      headRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [movieId]);
  //for the first time movieId
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
        setFetchedMovies(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };

  // whenever user click check blink to top
  useEffect(() => {
    if (fetchedMovies !== null) {
      headRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [fetchedMovies]);
  return (
    <>
      <div className=" LikenMovieApp relative ph-size:max-w-screen-generalSize sm:max-w-none">
        <div key={movieId} className=" pt-3  bg-red-700" ref={headRef}>
          <Navbar toggleNav={toggleNav} />
          <Head movieId={movieId || fetchedMovies?.results?.[0]?.id} />
        </div>
        <main className=" showedMovies bg-slate-800 ph-size:p-1 ph-size:mr-5 ph-size:ml-5 sm:p-6 sm:mr-12 sm:ml-12 ">
          <ApiMovies changeSrc={movieStatus} />
        </main>
        <AnimatePresence>
          {smallNav && <SmallNavbar toggleNav={toggleNav} />}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
