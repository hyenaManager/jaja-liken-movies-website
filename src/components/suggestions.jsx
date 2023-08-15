import axios from "axios";
import { useEffect, useState } from "react";

export default function SuggestMovies() {
  const [trendingMovies, setTrendingMovies] = useState();
  const link = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    fetchTrendingMovies();
  }, []);
  function fetchTrendingMovies() {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZWY1ZTkwNGVkNWNkNTZiYzg3NTRmZjIyZDA4MmQ5NCIsInN1YiI6IjY0ZDcxZDY3YjZjMjY0MTE1NzUzNjIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOaUcA7pG53bkWSCcnxRYJRFTbY95LGjLKl0cux84S4",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setTrendingMovies(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <>
      <div className=" ph-size:max-w-general sm:max-w-none flex bg-gradient-to-r from-purple-500 to-pink-500 h-80">
        <div className=" item-slider min-w-100">
          {trendingMovies?.results?.map((movie) => (
            <div className="img-container ">
              <img alt={movie.original_title} src={link + movie.poster_path} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
