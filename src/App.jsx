import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Navbar from "./components/navbar";
import StatusMovie from "./components/selectedMovie";
import MovieList from "./components/selection";
import { movies } from "./components/datas";

function App() {
  const [movie, setMovie] = useState(movies[0]);

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
      <div className=" relative bg-gradient-to-r from-slate-600 via-slate-800 to-slate-800 p-3">
        <Navbar />
        <div className="divisionOne mt-14">
          <StatusMovie movie={movie} statusRef={ref} />
        </div>
      </div>
      <main className=" bg-slate-800 p-3">
        <MovieList changeSrc={movieStatus} />
      </main>
    </>
  );
}

export default App;
