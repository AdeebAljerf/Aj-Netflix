import { useNavigate } from "react-router-dom";
import WatchedMovie from "../WatchedSummary/WatchedMovie";
import "./WatchedMovieList.css";

export default function WatchedMovieList({ watched, handleDeleteWatched }) {
  const navigate = useNavigate();
  return (
    <div className="watched-page">
      <h1 className="watched-title">My Watched Movies</h1>
      {watched.length === 0 ? (
        <div className="empty-list">
          <p>Your watch list is empty. Start rating some movies!</p>
        </div>
      ) : (
        <ul className="watched-grid">
          {watched.map((movie) => (
            <WatchedMovie
              movie={movie}
              key={movie.imdbID}
              handleDeleteWatched={handleDeleteWatched}
            />
          ))}
        </ul>
      )}
      <button className="btn-back" onClick={() => navigate("/Aj-Netflix")}>
        ←
      </button>
    </div>
  );
}
