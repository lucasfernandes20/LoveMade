export enum PlanNameEnum {
  Romantic = "romantic",
  Surprise = "surprise",
}

export const prices = [
  {
    title: "Romântico 💌",
    features: [
      "QR Code exclusivo",
      "Máximo de 3 fotos",
      "Pedido personalizado",
      "Página ativa por 1 ano",
    ],
    desvantagens: ["Sem música", "Sem animações exclusivas"],
    priceWithDiscount: "R$ 14,90",
    totalPrice: "R$ 28,80",
    mostPopular: false,
    planName: "romantic",
  },
  {
    title: "Surpresa 💎",
    features: [
      "QR Code exclusivo",
      "Máximo de 7 fotos",
      "Pedido personalizado",
      "Página ativa para sempre",
      "Com música",
      "Com animações exclusivas",
    ],
    desvantagens: [],
    priceWithDiscount: "R$ 29,90",
    totalPrice: "R$ 48,80",
    mostPopular: true,
    planName: "surprise",
  },
];
