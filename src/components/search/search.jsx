import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { fetchMovieByName } from "../../apis/getApi";

export default function Search() {
  const [searchName, setSearchName] = useState("avatar");
  const [isPending, startTransition] = useTransition();

  const { data, status, error } = useQuery({
    queryKey: ["searchMovie", searchName],
    queryFn: () => fetchMovieByName(searchName),
  });

  return (
    <div className=" bg-slate-800 w-full h-full pt-14 mt-3">
      <div className="flex justify-center items-center m-0">
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className=" rounded-sm p-1 focus:outline-none focus:shadow-outline "
          placeholder="search movies.."
        />
        <FontAwesomeIcon
          icon={faSearch}
          className=" cursor-auto text-slate-300"
        />
      </div>
      <div className=" grid grid-cols-6 gap-8 ">
        {status === "loading" ? (
          <div className=" text-4xl">Loading........</div>
        ) : (
          data?.results.map((movie) => (
            <img
              key={movie.poster_path}
              src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
            />
          ))
        )}
      </div>
    </div>
  );
}
