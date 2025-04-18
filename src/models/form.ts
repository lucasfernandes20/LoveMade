import { PlanNameEnum } from "./plan";

export interface commemorativeDate {
  name: string;
  date: Date;
}

export interface Photos {
  files: Array<File>;
  label?: string;
}

export interface CreatePageFormData {
  title?: string;
  photos?: Photos;
  commemorativeDate?: commemorativeDate;
  music?: string;
  message?: string;
  plan?: PlanNameEnum;
}
