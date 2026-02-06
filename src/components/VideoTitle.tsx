interface VideoTitleProps {
  //to avoid typescript error we can use interface
  title: string;
  overview: string | null | undefined;
}
const VideoTitle = ({ title, overview }: VideoTitleProps) => {
  //give absolute on videotitle to com on top of bg
  //w-screen to take full width idannm as compare to videobackground component
  //aspect-video to maintain 16:9 aspect ratio
  //pt-[20%] to give padding top so that it comes below the video controls, this way it will be 20% of width of screen we can give any value in []
  //px-24 to give padding left and right
  //text-white to make text white
  //bg-gradient-to-r from-black to give gradient background from black to transparent towards right side
  //hover:bg-opacity-80 to make button 80% opacity on hover
  return (
    <div className="w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>

      <div>
        <button className="bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-gray-200">
          ▶️ Play
        </button>
        <button className=" mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          ! More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
