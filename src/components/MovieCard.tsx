import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }: { posterPath: string | null }) => {
  if (!posterPath) return null; // Handle case where posterPath is null, you can also add a placeholder image or a default image in case posterPath is null, here we are just returning null to not render anything if posterPath is null, you can adjust this based on your requirements
  return (
    <div className="w-36 md:w-48 pr-4 hover:scale-105 transform transition duration-300">
      <img src={IMG_CDN_URL + posterPath} alt="Movie Poster" />
    </div>
  );
};

export default MovieCard;
