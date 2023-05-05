import { Bike } from "../entities/Bike";
import { BikeRepository } from "../repositories/BikeRepository";

export interface GetBikesUseCase {
  execute(): Promise<Bike[]>;
}

export class GetBikesInteractor implements GetBikesUseCase {
  constructor(private bikeRepository: BikeRepository) {}

  async execute(): Promise<Bike[]> {
    return this.bikeRepository.getBikes();
  }
}
