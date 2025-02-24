import { PlanNameEnum } from "./plan";

export interface FormData {
  pageTitle?: string;
  message?: string;
  music?: string;
  pageAnimation?: number;
  photos?: Array<File>;
  plan?: PlanNameEnum;
}
