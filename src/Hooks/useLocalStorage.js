import { useState, useEffect } from "react";

export function useLocalStorage(inital, key) {
  //? you have 2 things to do to store in local storage :
  //? 1-setItem(key,the state you want to save) and this is should be inside useEffect line 31
  //? 2-getItem in the inital state using callBack function not calling the function : just like this 👇
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    //? conventing them from string to the orignal form

    return storedValue ? JSON.parse(storedValue) : inital;
  });

  //? useEffent for storing the watched movie in the local storage
  useEffect(
    function () {
      //? the key value must be alwayes a string
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
