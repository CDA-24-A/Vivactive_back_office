import { ResourceType } from "./resource";

export interface CategoryType {
    id:  string  
    name: string
    description: string 
    ressources: ResourceType[]
}

export interface CategoryAddType
 {
  data: CategoryType,
  message: string
 }  

export interface CategorysType {
    data: CategoryType[];
    message: string
    total: number;
  }