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
    description: "Escolha um título para a sua página. Ex: Romeu e Julieta.",
    id: 1,
  },
  {
    title: "Mensagem",
    checked: false,
    skip: false,
    description:
      "Escreva uma mensagem especial para a sua página. Ser criativo agora é o segredo, mas deixamos mensagens ótimas para você utilizar se quiser ;)",
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
    title: "Data especial",
    checked: false,
    skip: false,
    description:
      "Uma data especial com contagem regressiva. Por exemplo a data do aniversário de namoro ou aniversário de casamento",
    id: 4,
  },
  {
    title: "Música",
    checked: false,
    skip: false,
    description:
      "Que tal adicionar uma música especial para a sua página? Seja uma música que marcou o início do seu namoro ou uma música que vocês gostam de ouvir juntos.",
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

export enum StepEnum {
  TITLE = 1,
  MESSAGE = 2,
  PHOTOS = 3,
  SPECIAL_DATE = 4,
  MUSIC = 5,
}
