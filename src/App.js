import { useState } from "react";
import { useMovie } from "./Hooks/useMovie";
import { useLocalStorage } from "./Hooks/useLocalStorage";

import Search from "./component/Nav/Children/Search";
import MovieList from "./component/Main/MovieList/MovieList";
import MovieDetails from "./component/Main/MovieDetails/Details/MovieDetails";
import WatchedSummary from "./component/Main/MovieDetails/WatchedSummary/WatchedSummary";
import WatchedMovieList from "./component/Main/MovieDetails/WatchedList/WatchedMovieList";

import NavBar from "./component/Nav/NavBar";
import Loader from "./component/Ui/Loader";
import ErrorMessage from "./component/Ui/ErrorMessage";
import WatchedList from "./component/Nav/Children/WatchedList";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const key = "b80b4944";
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/Aj-Netflix"
          element={
            <>
              {!selectedId && (
                <NavBar>
                  <Search query={query} setQuery={setQuery}></Search>
                  <WatchedList />
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
              </main>
            </>
          }
        />
        <Route
          path="/movieDetails"
          element={
            selectedId && (
              <div className="movie-details">
                <MovieDetails
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  setWatched={setWatched}
                  watched={watched}
                ></MovieDetails>
              </div>
            )
          }
        />
        <Route
          path="/watched"
          element={
            <WatchedMovieList
              watched={watched}
              handleDeleteWatched={handleDeleteWatched}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
