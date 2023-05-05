import React, { useState, useEffect } from "react";
import { Bike } from "../../entities/Bike";
import { InMemoryBikeRepository } from "../../repositories/BikeRepository";

export const useBikes = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const bikeRepository = new InMemoryBikeRepository();

  useEffect(() => {
    bikeRepository.getBikes().then((data) => {
      setBikes(data);
    });
  }, [bikeRepository]);

  return {
    bikes,
    setBikes,
  };
};
