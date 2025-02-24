export interface Steps {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  skip: boolean;
}

export const formSteps: Steps[] = [
  {
    title: "Título da página",
    checked: false,
    skip: false,
    description: "Escolha um título para a sua página. Ex: Maria e João.",
    id: 1,
  },
  {
    title: "Pedido",
    checked: false,
    skip: false,
    description:
      "Escreva um pedido especial. Ser criativo agora é o segredo, mas deixamos mensagens ótimas para você utilizar se quiser ;)",
    id: 2,
  },
  {
    title: "Fotos",
    checked: false,
    skip: false,
    description:
      "Anexe fotos para a sua página. Fotos de momentos especiais seria uma ótima ideia.",
    id: 3,
  },
  {
    title: "Animação de fundo",
    checked: false,
    skip: false,
    description:
      "Escolha uma animação de fundo para a sua página. Faça com capricho!",
    id: 4,
  },
  {
    title: "Música",
    checked: false,
    skip: false,
    description:
      "Que tal adicionar uma música especial para a sua página? Você lembra daquela música que marcou o relacionamento de vocês? Adicione ela aqui e ela será reproduzida automaticamente.",
    id: 5,
  },
  {
    title: "Pacote",
    checked: false,
    skip: false,
    description: "Escolha o pacote ideal para sua página.",
    id: 6,
  },
];
