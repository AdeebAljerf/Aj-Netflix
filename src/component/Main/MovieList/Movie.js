export default function Movie({ movie, onSelcetMovie }) {
  return (
    <li className="movie-info" onClick={onSelcetMovie}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div className="intro">
        <h3>{movie.Title}</h3>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
