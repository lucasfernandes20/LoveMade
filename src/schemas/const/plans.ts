import { Price } from "@/types";

export const prices: Price[] = [
  {
    title: "Romântico",
    productId: process.env.NEXT_PUBLIC_STRIPE_ROMANTIC_PLAN_ID || "",
    features: [
      "QR Code exclusivo",
      "Máximo de 4 fotos",
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
    title: "Surpresa",
    productId: process.env.NEXT_PUBLIC_STRIPE_SURPRISE_PLAN_ID || "",
    features: [
      "QR Code exclusivo",
      "Máximo de 10 fotos",
      "Pedido personalizado",
      "Página ativa para sempre",
      "Com música",
      "Com animações exclusivas",
    ],
    desvantagens: [],
    priceWithDiscount: "R$ 27,90",
    totalPrice: "R$ 48,80",
    mostPopular: true,
    planName: "surprise",
  },
];
