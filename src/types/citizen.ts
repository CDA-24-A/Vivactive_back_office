import { Role } from "./role";

export interface Citizen {
    id: number;
    name: string;
    email: string;
    surname: string;
    password: string;
    role: Role
    roleId: string
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