import { CitizenType } from "./citizen";
import { ResourceType } from "./resource";

export interface CommentType {
    id: string;
    title: string;
    description: string;
    citizen: CitizenType;
    citizenId: string;
    ressource: ResourceType;
    ressourceId: string;
}

export interface CommentsType {
    data: CommentType[];
    message: string;
}