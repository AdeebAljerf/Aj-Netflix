import "../../../../css/WatchedMovie.css";

export default function WatchedMovie({ movie, handleDeleteWatched }) {
  return (
    <li className="watched-movie ">
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div className="watched-movie-info">
        <p>
          <span>⭐️ Imdb rating :</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟 My rating :</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳ Movie Time :</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
