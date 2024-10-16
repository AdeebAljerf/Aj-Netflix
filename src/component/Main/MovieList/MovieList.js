import Movie from "./Movie";
import "../../../css/MainList.css";

export default function MovieList({ movies, setSelectedId, selectedId }) {
  //? WHEN THE USER CLICK ON A MOVIE TO GET DETALILS (my way)
  const handleSelect = function (movie) {
    setSelectedId(movie.imdbID);
    //? IF THE USER  CLICK ON THE SAME MOVIE (my way)
    if (selectedId === movie.imdbID) setSelectedId(null);
    //! WHY UNDIFIEND
    // console.log(e.target.imdbID);
  };

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelcetMovie={() => handleSelect(movie)}
        ></Movie>
      ))}
    </ul>
  );
}
