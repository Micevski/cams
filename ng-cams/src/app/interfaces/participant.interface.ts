export interface Owner {
  id?: number;
  firstName?: string
  lastName?: string;
  dateOfBirth?: Date;
  genderId?: number;
  placeOfBirth?: string;
  placeOfLiving?: string;
}

export interface Participant {
  id?: number;
  type?: string;
  model?: string;
  make?: string;
  productionYear?: string;
  registerPlate?: string;
  owner?: Owner;
}

