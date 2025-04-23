import { CitizenType } from "./citizen";

export interface CommentType {
  title: string;
  description: string;
  citizenId: string;
  citizen: CitizenType;
  ressourceId: string;
  ressource: any;
  id: string;
}
export interface CommentAddType
 {
  data: CommentType,
  message: string
 }  
export interface CommentsType {
    data: CommentType[];
    message: string
  }
