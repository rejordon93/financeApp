export enum Region {
  NORTH = "North",
  SOUTH = "South",
  EAST = "East",
  WEST = "West",
}

export type ProfileType = {
  firstname: string;
  lastname: string;
  city: string;
  region: string;
  goals: string;
  cellPhone: string;
  zipCode: string;
};
