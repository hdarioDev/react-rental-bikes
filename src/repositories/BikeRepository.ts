import { Bike } from "../entities/Bike";
import bikesData from "../data/bikes.json";

export interface BikeRepository {
  getBikes(): Promise<Bike[]>;
}

export class InMemoryBikeRepository implements BikeRepository {
  async getBikes(): Promise<Bike[]> {
    const bikes = bikesData as Bike[];
    return bikes;
  }
}
