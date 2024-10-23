import { useNavigate } from "react-router-dom";
export default function Movie({ movie, onSelcetMovie }) {
  const navigate = useNavigate();
  return (
    <li
      className="movie-info"
      onClick={() => {
        onSelcetMovie();
        navigate(`/movieDetails`);
      }}
      //  onClick={onSelcetMovie}
    >
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
