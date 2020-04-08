import {CamsLocation} from "./cams-location.interface";

export interface Accident {
  id?: number;
  dateAccident?: Date;
  reason?: string;
  description?: string;
  location?: CamsLocation;
}
