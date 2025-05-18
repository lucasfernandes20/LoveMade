import { PlanNameEnum } from "./plans";
import { MusicData } from "./tracks";

export interface CreateFormSteps {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  skip: boolean;
}

export interface commemorativeDate {
  name: string;
  date: Date;
  style?: "default" | "sophisticated";
}

export interface Photos {
  files: Array<File>;
  label?: string;
}

export interface CreatePageFormData {
  title?: string;
  photos?: Photos;
  commemorativeDate?: commemorativeDate;
  music?: MusicData;
  message?: string;
  plan?: PlanNameEnum;
}
