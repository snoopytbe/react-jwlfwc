import React from "react"

export const useStateWithLocalStorage = localStorageKey => {
  var storedValue = localStorage.getItem(localStorageKey);
  storedValue = JSON.parse(storedValue);
  if (!storedValue.hasOwnProperty("regulier")) storedValue = initialValues;
  const [value, setValue] = React.useState(storedValue);

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};