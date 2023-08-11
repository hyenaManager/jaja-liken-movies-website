import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Navbar from "./components/navbar";
import StatusMovie from "./components/selectedMovie";
import MovieList from "./components/selection";

function App() {
  const [movie, setMovie] = useState("/interCover.jpg");
  function movieStatus(src) {
    setMovie(src);
  }
  return (
    <>
      <div className=" relative bg-gradient-to-r from-slate-600 via-slate-800 to-slate-800 p-3">
        <Navbar />
        <div className="divisionOne mt-11">
          <StatusMovie movieSrc={movie} />
        </div>
      </div>
      <main className=" bg-slate-800 p-3">
        <MovieList changeSrc={movieStatus} />
      </main>
    </>
  );
}

export default App;
