import { Citizen } from "./citizen";
import { Resource } from "./resource";

export interface Comment {
    id: string;
    tile: string;
    description: string;
    citizen: Citizen;
    citizenId: string;
    ressource: Resource;
    ressourceId: string;
}