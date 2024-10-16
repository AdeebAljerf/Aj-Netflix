import { useState, useEffect } from "react";

//? Custom Hook
export function useMovie(query) {
  const key = "b80b4944";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  //? USING USEFFECT TO NOT MAKE AN INFINT REQUEST FOR THE API (dont update states in the render logic )
  //? USE EFFECT FOR MOVIE SEARCHING
  useEffect(
    function () {
      //? with promises
      /*
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=godfather`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));
*/

      //? create a controller from a browser api
      const controller = new AbortController();

      //? WITH ASYNC FUNCTION
      async function fetchMovies() {
        //?
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong with your Inernet !!");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie didnt found !!");
          }
          // console.log(data);
          setMovies(data.Search);
        } catch (err) {
          //? the  name of the controller error
          if (err.name !== "AbortError") {
            setError(err.message);
            console.log(err.message);
          }
          // console.log(err.message);
        } finally {
          setIsLoading(false);
        }

        //! THIS IS WILL NOT WORK CAUSE THERE IS NOT UPDATER FUNCTION , STALE STATE
        /*
      console.log(movies);
      //? RIGHT WAY
      console.log(data.Search);
      */
      }

      //? for the intial render when there is no movies yet
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      //? clean up function to limit the http requsts
      //? to make the api upload the data when i stop typing in the search bar
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  //? return the state value should be alwayes be as an object or array
  return { movies, isLoading, error };
}
