import {Participant} from "./participant.interface";
import {Person} from "./person.interface";

export interface Passenger {
  isDeleted?: boolean;
  id?: number;
  participant?: Participant;
  passenger?: Person;
  injuredLevel?: number;
  driver?: boolean;
}
