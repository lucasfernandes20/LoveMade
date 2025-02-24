export enum AnimationTypeEnum {
  NONE = "none",
  HEART_RAIN = "heart_rain",
  STARS = "stars",
  COLOR_SPACE = "color_space",
  SKY_LIGHT = "sky_light",
}

export const animationsIds = {
  [AnimationTypeEnum.NONE]: 0,
  [AnimationTypeEnum.HEART_RAIN]: 1,
  [AnimationTypeEnum.STARS]: 3,
  [AnimationTypeEnum.SKY_LIGHT]: 4,
  [AnimationTypeEnum.COLOR_SPACE]: 5,
};

export const animations = {
  [animationsIds[AnimationTypeEnum.NONE]]: {
    id: animationsIds[AnimationTypeEnum.NONE],
    name: "Sem animação",
  },
  [animationsIds[AnimationTypeEnum.HEART_RAIN]]: {
    id: animationsIds[AnimationTypeEnum.HEART_RAIN],
    name: "Chuva de corações",
  },
  [animationsIds[AnimationTypeEnum.STARS]]: {
    id: animationsIds[AnimationTypeEnum.STARS],
    name: "Estrelas",
  },
  [animationsIds[AnimationTypeEnum.COLOR_SPACE]]: {
    id: animationsIds[AnimationTypeEnum.COLOR_SPACE],
    name: "Espaço de cor",
  },
  [animationsIds[AnimationTypeEnum.SKY_LIGHT]]: {
    id: animationsIds[AnimationTypeEnum.SKY_LIGHT],
    name: "Luzes no céu",
  },
};

export const animationsList = Object.values(animations);
