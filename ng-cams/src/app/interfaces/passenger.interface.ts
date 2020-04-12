import {Participant} from "./participant.interface";
import {Person} from "./person.interface";

export interface Passenger {
  id?: number;
  participant?: Participant;
  passenger?: Person;
  injuredLevel?: number;
}
