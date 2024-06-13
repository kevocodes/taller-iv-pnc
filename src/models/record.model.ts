import { UserFromAPI } from "./user.model";

export interface Record {
  idRecord: string,
  patient: UserFromAPI,
  reason: string,
  recordDateTime: string,
}