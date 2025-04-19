import { Citizen } from "./citizen";
import { Resource } from "./resource";

export interface Favorite {
    id: string;
    citizen: Citizen;
    citizenId: string;
    ressource: Resource;
    ressourceId: string;
}