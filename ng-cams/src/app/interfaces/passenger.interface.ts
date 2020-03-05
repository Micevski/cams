import {Participant} from "./participant.interface";
import {Person} from "./person.interface";

export interface Passenger {
  participant?: Participant;
  person?: Person;
  injuredLevel?: number;
}
