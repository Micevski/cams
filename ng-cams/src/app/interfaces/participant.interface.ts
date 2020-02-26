import {Person} from "./person.interface";

export interface Participant {
  id?: number;
  type?: string;
  model?: string;
  make?: string;
  productionYear?: string;
  registerPlate?: string;
  owner?: Person;
}

