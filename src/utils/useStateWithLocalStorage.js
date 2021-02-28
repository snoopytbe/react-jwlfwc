import React from "react";

export const useStateWithLocalStorage = (localStorageKey, defaultValues) => {
  var storedValue = localStorage.getItem(localStorageKey);
  storedValue = JSON.parse(storedValue);
  console.log(storedValue);
  if (!storedValue) storedValue = defaultValues;
  const [value, setValue] = React.useState(storedValue);

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
