export enum PlanNameEnum {
  Romantic = "romantic",
  Surprise = "surprise",
}

export interface Price {
  title: string;
  features: string[];
  desvantagens: string[];
  priceWithDiscount: string;
  totalPrice: string;
  mostPopular: boolean;
  planName: string;
}