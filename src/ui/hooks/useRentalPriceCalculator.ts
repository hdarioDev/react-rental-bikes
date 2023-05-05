export interface RentalPriceStrategy {
  calculatePrice(basePrice: number, days: number): number;
}

class ElectricBikeRentalPriceStrategy implements RentalPriceStrategy {
  calculatePrice(basePrice: number, days: number): number {
    return basePrice * days;
  }
}

class NormalBikeRentalPriceStrategy implements RentalPriceStrategy {
  calculatePrice(basePrice: number, days: number): number {
    if (days <= 3) {
      return basePrice * days;
    } else {
      return basePrice * 3 + (days - 3) * (basePrice * 1.5);
    }
  }
}

class OldBikeRentalPriceStrategy implements RentalPriceStrategy {
  calculatePrice(basePrice: number, days: number): number {
    if (days <= 5) {
      return basePrice * days;
    } else {
      return basePrice * 5 + (days - 5) * (basePrice * 2);
    }
  }
}

export {
  ElectricBikeRentalPriceStrategy,
  NormalBikeRentalPriceStrategy,
  OldBikeRentalPriceStrategy,
};
