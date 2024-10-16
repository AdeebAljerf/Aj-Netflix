import { useRef } from "react";
import { useKey } from "../../../Hooks/useKey";

export default function Search({ query, setQuery }) {
  //? without useRef
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);
  //? with useRef
  //? when delling with dom element the inital value should be null
  //? useEffect so when the user click on Enter search bar get focus
  const inputEl = useRef(null);

  //? Custom Hook
  useKey("Enter", function () {
    //? if inputEl is already active return (wihout this if i press enter when i wrote a movie it will be deleted )
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      ref={inputEl}
    />
  );
}
