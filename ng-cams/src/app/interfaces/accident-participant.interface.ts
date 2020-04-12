import {Person} from "./person.interface";

export interface AccidentParticipant {
  id?: number;
  accidentParticipantId?: number;
  type?: string;
  model?: string;
  make?: string;
  productionYear?: string;
  registerPlate?: string;
  owner?: Person;
}
