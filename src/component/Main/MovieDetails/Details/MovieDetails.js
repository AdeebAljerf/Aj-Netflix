import { useState, useEffect } from "react";
import { key } from "../../../../App";
import Loader from "../../../Ui/Loader";
import StarRating from "../../../Ui/StartRating";
import { useKey } from "../../../../Hooks/useKey";
import "../../../../css/MainDetails.css";
import { useNavigate } from "react-router-dom";

//? ----------------------------Movie Details-------------------------------------
export default function MovieDetails({
  selectedId,
  setSelectedId,
  setWatched,
  watched,
}) {
  const navigate = useNavigate();
  //? this is a state of the movieInfo
  const [movie, setMovie] = useState({});
  //? this is a state to take the value from the star compo
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  //? an ture of false value to know if the user rated and watched the movie before or no
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  //? to return the rating value of the already watched movie
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");

    const handleMediaQueryChange = (event) => {
      setIsSmallScreen(event.matches);
    };

    setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  //? USE EFFECT FOR UPLOADING MOVIE DETAILS FROM HES ID
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);

        setMovie(data);
        // console.log(selectedId);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  ); //? without a dependcy a problem just like XO game will happen the data will not render in the ui immedetley

  //? useEffect for changing the title every time the user choose a film to see the details
  useEffect(
    function () {
      //? to not get undifend on the first click
      if (!movie.Title) return;
      document.title = `Movie | ${movie.Title}`;

      //? Clean Up function
      return function () {
        document.title = "popcore";
        //? the movie title get known because of the closure
        console.log(`clean up function for movie ${movie.Title}`);
      };
    },
    [movie.Title]
  );

  //? Custom Hook
  useKey("Escape", handleCloseMovie);

  //? destracter movie object (api object) (my way)
  const handleAdd = function () {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      userRating,
      runtime: Number(movie.Runtime.split(" ").at(0)),
    };

    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
    navigate("/Aj-Netflix");
  };

  //? to close the detiels of movie background
  function handleCloseMovie() {
    setSelectedId(null);
  }

  //? update the state of the watched array by the selected  movie
  const handleAddWatched = function (movie) {
    setWatched((watched) => [...watched, movie]);
    // console.log(watched);
  };

  // console.log(isWatched);
  return isLoading ? (
    <Loader></Loader>
  ) : (
    <div
      className="details"
      // style={{ backgroundImage: `url(${movie.Poster})` }}
    >
      {/* <button className="btn-back" onClick={handleCloseMovie}>
        ←
      </button> */}
      <button
        className="btn-back"
        onClick={() => {
          setSelectedId(null);
          navigate("/Aj-Netflix");
        }}
      >
        ←
      </button>

      <div className="poster-container">
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
      </div>
      <div className="details-content ">
        {/* //? all of this data came from the api (to see it cl data) */}

        <header>
          <div className="details-overview">
            <h2>{movie.Title}</h2>
            <p className="border-left">
              <span className="nowrap">{movie.Runtime}</span>
            </p>

            <p className="border-left">{movie.Genre}</p>

            <p className="border-left">
              <span className="nowrap"> IMDB Rating : </span>
              <span>⭐</span>
              {movie.imdbRating}
            </p>
          </div>
        </header>
        <section>
          <div className="details-about">
            <h3>Plot</h3>
            <p>{movie.Plot}</p>

            <h3>Cast</h3>
            <p>{movie.Actors}</p>

            <h3>Director</h3>
            <p>{movie.Director}</p>
          </div>

          <div className="rating">
            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={isSmallScreen ? 20 : 25}
                  onSetRating={setUserRating}
                  className="details-star-rating"
                ></StarRating>

                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to the List
                  </button>
                )}
              </>
            ) : (
              <p>You already Rated this Movie {watchedUserRating}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
