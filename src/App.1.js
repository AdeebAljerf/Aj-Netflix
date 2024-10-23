import { useState } from "react";
import MovieDetails from "./component/Main/MovieDetails/Details/MovieDetails";
import MovieList from "./component/Main/MovieList/MovieList";
import Search from "./component/Nav/Children/Search";
import NavBar from "./component/Nav/NavBar";
import ErrorMessage from "./component/Ui/ErrorMessage";
import Loader from "./component/Ui/Loader";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { useMovie } from "./Hooks/useMovie";

//? --------------------------APP---------------------------------------
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const [watched, setWatched] = useState([]);
  //? Custom Hook
  const [watched, setWatched] = useLocalStorage([], "watched");

  //? to delete the watched movie when cliking on X
  const handleDeleteWatched = function (id) {
    const afterDelete = watched.filter((movie) => movie.imdbID !== id);
    setWatched(afterDelete);
  };

  //? Custom Hook
  const { movies, isLoading, error } = useMovie(query);

  return (
    <>
      {!selectedId && (
        <NavBar>
          <Search query={query} setQuery={setQuery}></Search>
          <WatchedList></WatchedList>

          {/* <NumResults movies={movies}></NumResults> */}
        </NavBar>
      )}

      <main className="main">
        {!selectedId && (
          <div className="movies-list">
            {error && <ErrorMessage message={error} />}
            {isLoading && <Loader />}
            {!error && !isLoading && (
              <MovieList
                movies={movies}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            )}
          </div>
        )}

        {selectedId && (
          <div className="movie-details">
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setWatched={setWatched}
              watched={watched}
            ></MovieDetails>
          </div>
        )}

        {/* <>
              <WatchedSummary watched={watched}></WatchedSummary>
              <WatchedMovieList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              ></WatchedMovieList>
            </> */}
      </main>
    </>
  );
}
