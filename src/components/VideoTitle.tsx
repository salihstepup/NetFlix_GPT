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
  //in mobile view we want to show only title and hide overview and in desktop view we want to show both title and overview, so we can use hidden md:inline-block for overview, it will hide overview in mobile view and show in desktop view
  //so using md: before any class will apply that class in desktop view and not in mobile view, and using hidden before any class will hide that element in mobile view, so hidden md:inline-block will hide that element in mobile view and show as inline-block in desktop view
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      {/* in css MAKE HIDDEN IN MOBILE VIEW AND VISIBLE IN DESKTOP VERSION IN BELOW CODE */}
      <div className="my-4 md:m-0">
        <button className=" bg-white text-black py-1  md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-gray-200">
          ▶️ Play
        </button>
        <button className=" hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          ! More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
