import { Role } from "./role";

export interface Citizen {
    id: number;
    name: string;
    email: string;
    firstName: string;
    role: Role
  }

export interface CitizenAdd
 {
  data: Citizen,
  message: string
 }  
export interface Citizens {
    data: Citizen[];
    message: string
    total: number;
  }