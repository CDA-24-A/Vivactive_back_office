import { Progression } from "./progression";
import { Resource } from "./resource";

export interface Step {
    id: string;
    title: string;
    description: string;
    order: number;
    ressource: Resource;
    ressourceId: string;
    progression: Progression[]
}