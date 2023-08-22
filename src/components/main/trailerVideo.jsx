import {
  faArrowLeft,
  faArrowRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function TrailerVideo({ toggleVideo, movieSource }) {
  const [trailerVideoIndex, SetTrailerVideoIndex] = useState(0);
  const [fetchedVideo, setFetchedVideo] = useState(null);
  //   const youtubeLink = "https://www.youtube.com/watch?v=";
  var status = 1 + trailerVideoIndex;

  const trailerVideos = fetchedVideo?.results?.filter(
    (movie) => movie.type.toLowerCase() === "trailer"
  ); //fetching all the trailer video

  useEffect(() => {
    fetchVideo();
  }, [movieSource]);

  //for implementation of watching more trailer videos by arrow buttons
  function decreaseVideoIndex() {
    if (trailerVideoIndex === 0) {
      return;
    }

    SetTrailerVideoIndex((index) => index - 1);
  }
  function increaseVideoIndex() {
    if (trailerVideoIndex === trailerVideos.length - 1) {
      return;
    }

    SetTrailerVideoIndex((index) => index + 1);
  }
  //fetching video key for youtube source
  function fetchVideo() {
    const url = `https://api.themoviedb.org/3/movie/${movieSource.id}/videos?language=en-US`;
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
        setFetchedVideo(response.data);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }

  return (
    // video overlay
    <div
      onClick={(e) => {
        toggleVideo();
      }}
      className="  absolute w-full z-20 backdrop-blur-sm top-0 left-0 font-kanit text-white uppercase h-full cursor-auto videoHolder flex justify-center items-center"
    >
      {/* video container */}
      <div className="video-container flex flex-col ph-size:w-fit ph-size:h-1/2 sm:w-3/4 sm:h-almost z-30  relative ">
        <iframe
          className=" w-full h-full"
          src={`https://www.youtube.com/embed/${trailerVideos?.[trailerVideoIndex]?.key}`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
        <span className=" flex justify-center items-center bg-black p-1">
          {trailerVideos?.[trailerVideoIndex]?.name}
        </span>
        <div className=" flex justify-between">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className=" text-xl p-2 bg-red-500 "
            onClick={(e) => {
              decreaseVideoIndex();
              e.stopPropagation();
            }}
          />
          <span className=" flex justify-center items-center bg-black w-full">
            {status}
          </span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className=" text-xl p-2 bg-red-500 "
            onClick={(e) => {
              increaseVideoIndex();
              e.stopPropagation();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerVideo;
