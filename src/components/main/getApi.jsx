import axios from "axios";

export const fetchData = async () => {
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
      return response.data;
    })
    .catch((error) => {
      return console.error("error:", error);
    });
};

export const findData = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
      return response.data;
    })
    .catch((error) => {
      console.error("error:", error);
    });
};
