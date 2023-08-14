import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Navbar from "./components/navbar";
import Head from "./components/selectedMovie";
import ApiMovies from "./components/selection";
import axios from "axios";

function App() {
  const [fetchedMovies, setFetchedMovies] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const link = "https://image.tmdb.org/t/p/original/";
  const headRef = useRef(null);
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
      <div key={movieId} className=" pt-3  bg-red-700" ref={headRef}>
        <Navbar />
        <Head movieId={movieId || fetchedMovies?.results?.[0]?.id} />
      </div>
      <main className=" bg-slate-800 p-6 mr-12 ml-12 ">
        <ApiMovies changeSrc={movieStatus} />
      </main>
    </>
  );
}

export default App;
