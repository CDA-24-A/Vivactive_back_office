import { Resource } from "./resource";

export interface Image {
    id: string;
    url: Blob;
    ressources: Resource[];
}