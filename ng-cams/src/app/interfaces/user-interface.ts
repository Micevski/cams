import { Person } from './person.interface';

export interface User {
  id?: number;
  username?: string
  role?: string;
  person?: Person;
}
