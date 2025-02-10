export enum PlanNameEnum {
  Basic = "basic",
  Romantic = "romantic",
  Surprise = "surprise",
}

export const maxPhotosByPlan = {
  [PlanNameEnum.Basic]: 1,
  [PlanNameEnum.Romantic]: 3,
  [PlanNameEnum.Surprise]: 3,
};

export const prices = [
  {
    title: "Gratuito",
    features: [
      "QR Code exclusivo",
      "Somente 1 foto",
      "Pedido básico",
      "Link válido por 24h",
    ],
    desvantagens: ["Não inclui música", "Pedido não personalizável"],
    price: "Grátis",
    mostPopular: false,
    planName: "basic",
  },
  {
    title: "Romântico 💌",
    features: [
      "QR Code exclusivo",
      "Até 3 fotos",
      "Pedido personalizado",
      "Escolha de cor e estilo",
      "Link válido por tempo ilimitado",
    ],
    desvantagens: ["Não inclui música"],
    price: "R$ 14,90",
    mostPopular: true,
    planName: "romantic",
  },
  {
    title: "Surpresa 💎",
    features: [
      "Tudo do plano romântico",
      'Mensagem de resposta interativa ("Sim" ou "Não")',
      "Com música",
      "Download da página em PDF para recordação",
      "Animação especial ao abrir a página",
    ],
    desvantagens: [],
    price: "R$ 29,90",
    mostPopular: false,
    planName: "surprise",
  },
];
