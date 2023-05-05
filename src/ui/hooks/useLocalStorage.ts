import { useState, useEffect } from "react";

const useLocalStorage = () => {
  const rentalsString = localStorage.getItem("rentals");
  const rentals = rentalsString ? JSON.parse(rentalsString) : [];
  console.log(
    "🚀 ~ file: useLocalStorage.ts:7 ~ useLocalStorage ~ rentals:",
    rentals
  );

  const addItem = (item: any) => {
    const rentalsString = localStorage.getItem("rentals");
    const rentals = rentalsString ? JSON.parse(rentalsString) : [];
    if (rentals.length > 0) {
      console.log("es mayor a cero");
      rentals.push(item);
      localStorage.setItem("rentals", JSON.stringify(rentals));
    } else {
      console.log("no es mayor");
    }
  };

  return { rentals, addItem };
};

export default useLocalStorage;
