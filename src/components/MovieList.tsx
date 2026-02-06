import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }: { title: string; movies: any[] }) => {
  //overflow-x-scroll is to enable horizontal scrolling when the content overflows the container's width.
  console.log("Movies in MovieList:", movies);
  return (
    <div className="px-6 ">
      <h1 className="text-3xl py-4 text-white">{title}</h1>

      <div className="flex overflow-x-scroll">
        <div className="flex ">
          {/* <MovieCard posterPath={movies[0]?.poster_path} />  or use map for dynamic movies */}
          {movies?.map((movie) => {
            return <MovieCard key={movie.id} posterPath={movie.poster_path} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
