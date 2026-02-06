import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }: { movieId: number }) => {
  //accept movieId as props use movieId as number to avoid TS error

  const trailerVideo = useSelector((store: any) => store.movies.trailerVideo); //get trailer video from redux store
  //trailrvideo first null ayrkum appo useeffectil ninnu api call cheythu trailer video edukkanam athil kore data indavum ath storel save cheyyum
  //athil nammk vendath matram use cheyyum

  useMovieTrailer(movieId); //call the custom hook with movieId prop to fetch and set trailer video in redux store

  return (
    <div className=" w-screen">
      <iframe //using iframe by clicking share on youtube video and then embed and copying the iframe code and paste here and add our key here in src
        //and change width height to className w-screen aspect-video for responsive design or whatever we want
        className="w-screen aspect-video" //to maintain 16:9 aspect ratio
        src={
          //add trailerId here to play the trailer video using usestate or use trailerVideo from redux store
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1" //autoplay=1 to autoplay video mute=1 to mute video
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
