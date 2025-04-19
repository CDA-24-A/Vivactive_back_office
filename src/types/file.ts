import { Resource } from "./resource";

export interface File {
    id : string;
    path : Blob;
    ressources: Resource[]
}