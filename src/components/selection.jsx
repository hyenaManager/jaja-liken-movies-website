import { faPlay, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ApiMovies({ movie, changeSrc }) {
  const [fetchedData, setFetchedData] = useState(null);
  const [filteredMovie, setFilteredMovie] = useState({
    type: null,
    year: null,
    catagories: null,
  });
  //for console
  const imgRef = useRef();
  //filtering movie by type

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
        setFetchedData(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };
  const moviesList = fetchedData?.results?.map((movie) => (
    <Movie movie={movie} key={movie.id} changeSrc={changeSrc} imgRef={imgRef} />
  ));
  return (
    <>
      <SelectionHead />
      <div className=" grid grid-cols-4 gap-8 font-head p-3">{moviesList}</div>
    </>
  );
}
function SelectionHead({ filteredType }) {
  const movieGenres = [
    "All",
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Western",
    "Documentary",
    "Musical",
    "War",
    "Historical",
    "Superhero",
    "Family",
    "Biography",
    "Science Fiction",
  ];
  const yearList = Array.from(
    { length: 2023 - 1990 + 1 },
    (_, index) => 2023 - index
  );
  const Type = ["Now Playing", "Popular", "Top Rated", "Upcoming"];
  return (
    <>
      <div className="flex justify-between p-3 font-kanit">
        <ul className="flex justify-between list-none text-white">
          <li className=" pl-9 cursor-pointer">
            <SelectionHeadDropdown
              name={"By year"}
              list={yearList}
              filteredType={filteredType}
            />
          </li>
          <li className=" pl-9 cursor-pointer">
            <SelectionHeadDropdown
              name={"By catagory"}
              list={movieGenres}
              filteredType={filteredType}
            />
          </li>
          <li className=" pl-9 cursor-pointer">
            <SelectionHeadDropdown
              name={"Type"}
              list={Type}
              filteredType={filteredType}
            />
          </li>
        </ul>
        <div className="flex justify-center">
          <input type="text" className="text" />
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </>
  );
}

function SelectionHeadDropdown({ name, list, filteredType }) {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="relative inline-block text-left z-20" key={name}>
      <button
        onClick={(e) => {
          setHidden(!hidden);
          e.stopPropagation();
        }}
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="options-menu"
        aria-expanded="true"
        aria-haspopup="true"
      >
        {name}
      </button>

      <div
        className={
          " origin-top-right absolute right-0 mt-2 h-32 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 " +
          (hidden ? " hidden" : null)
        }
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          {list.map((data) => (
            <a
              key={data}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              {data}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Movie({ movie, changeSrc, imgRef }) {
  const [isHover, setIsHover] = useState(false);
  console.log(imgRef.current);
  return (
    <div
      className=" flex flex-col relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* blah blah */}
      <img
        ref={imgRef}
        src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
        alt={movie.original_title}
        className="rounded-md "
      />
      <span className="text-lg text-white text-start capitalize">
        {movie.original_title}
      </span>
      {/* check movie button */}
      {isHover && (
        <button
          onClick={() => changeSrc(movie)}
          className={
            "p-1 pr-2 pl-2 bg-red-700 text-white rounded-3xl text-md absolute top-3 right-3 "
          }
        >
          <span className=" text-white">check</span>
        </button>
      )}
    </div>
  );
}
