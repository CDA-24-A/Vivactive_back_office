import { ResourceType } from "./resource";

export interface CategoryType {
    id:  string  
    name: string
    description: string 
    ressources: ResourceType[]
}