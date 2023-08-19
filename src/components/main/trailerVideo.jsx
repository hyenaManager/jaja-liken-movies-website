import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function TrailerVideo({ toggleVideo, movieSource }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fetchVideo, setFetchVideo] = useState(null);
  //   const youtubeLink = "https://www.youtube.com/watch?v=";
  const videoKey = fetchVideo?.results?.find(
    (movie) => movie.type.toLowerCase() === "trailer"
  );
  const videoKeyBackup = fetchVideo?.results?.find(
    (movie) => movie.type.toLowerCase() === "teaser"
  );

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    fetchMovie();
  }, [movieSource]);

  function fetchMovie() {
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
        setFetchVideo(response.data);
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
      <div
        onClick={(e) => {
          togglePlayPause();
          e.stopPropagation();
        }}
        className="video-container ph-size:w-fit ph-size:h-1/2 sm:w-3/4 sm:h-almost z-30  relative "
      >
        <iframe
          className=" w-full h-full"
          src={`https://www.youtube.com/embed/${
            videoKey?.key || videoKeyBackup?.key
          }`}
          title="YouTube video player"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default TrailerVideo;
