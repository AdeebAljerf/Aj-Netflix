import { useEffect } from "react";

export function useKey(key, action) {
  //? useEffect to close the details with click on esc
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          console.log(e.code);
          action();
          console.log("CLOSING");
        }
      }

      document.addEventListener("keydown", callback);

      //? clean up functoin so it wont add more evert listener to the dom each itme i click on esc
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
