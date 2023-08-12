import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import Navbar from "./components/navbar";
import StatusMovie from "./components/selectedMovie";
import ApiMovies from "./components/selection";
import { fetchData, findData } from "./components/getApi";
import axios from "axios";

function App() {
  const [movie, setMovieId] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  useEffect(() => {
    setFetchedData(findData(movie));
  }, []);
  useEffect(() => {
    setMovieId(fetchData());
  }, []);
  const link = "https://image.tmdb.org/t/p/original/";

  const ref = useRef(null);
  function movieStatus(src) {
    setMovieId(src.id); //change the movie id
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
        key={fetchedData}
        className=" relative bg-cover bg-center bg-no-repeat p-3"
        style={{
          backgroundImage: `url(${link + fetchedData?.backdrop_path})`,
        }}
      >
        <Navbar />
        <div className="divisionOne mt-14">
          <StatusMovie movie={fetchedData?.results?.[0]?.id} statusRef={ref} />
        </div>
      </div>
      <main className=" bg-slate-800 p-3">
        <ApiMovies changeSrc={movieStatus} />
      </main>
    </>
  );
}

export default App;
