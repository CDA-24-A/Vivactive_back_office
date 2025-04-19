import { Resource } from "./resource";

export interface Category {
    id:  string  
    name: string
    description: string 
    ressources: Resource[]
}