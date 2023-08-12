import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Navbar from "./components/navbar";
import StatusMovie from "./components/selectedMovie";
import ApiMovies from "./components/selection";

function App() {
  const [movie, setMovie] = useState(null);
  const link = "https://image.tmdb.org/t/p/original/";
  const defaultSrc = "rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg";

  const ref = useRef(null);
  function movieStatus(src) {
    setMovie(src); //change the movie src
  }
  useEffect(() => {
    if (movie !== null) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [movie]);
  return (
    <>
      <div
        key={movie === null ? "movie" : movie.original_title}
        className=" relative bg-cover bg-center bg-no-repeat p-3"
        style={{
          backgroundImage:
            movie === null
              ? `url(${link + defaultSrc})`
              : `url(${link + movie.backdrop_path})`,
        }}
      >
        <Navbar />
        <div className="divisionOne mt-14">
          <StatusMovie movie={movie} statusRef={ref} />
        </div>
      </div>
      <main className=" bg-slate-800 p-3">
        <ApiMovies changeSrc={movieStatus} />
      </main>
    </>
  );
}

export default App;
