import { PlanNameEnum } from "./plan";

export interface commemorativeDate {
  name: string;
  date: Date;
}

export interface Photos {
  files: Array<File>;
  label?: string;
}

export interface MusicData {
  displayName: string;
  artistName: string;
  trackName: string;
  albumCover?: string;
  previewUrl?: string;
  spotifyUrl?: string;
  videoId?: string;
  duration?: string;
  embedUrl?: string;
  youtubeUrl?: string;
}

export interface CreatePageFormData {
  title?: string;
  photos?: Photos;
  commemorativeDate?: commemorativeDate;
  music?: string | MusicData;
  message?: string;
  plan?: PlanNameEnum;
}
