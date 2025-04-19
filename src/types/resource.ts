import { Category } from "./category";
import { Comment } from "./comment";
import { Favorite } from "./favorite";
import { File } from "./file";
import { Image } from "./image";
import { Step } from "./step";

export interface Resource {
    id: number;
    title: string;
    description: string;
    maxParticipant: string;
    nbParticipant: string;
    deadline: Date;
    category: Category;
    categoryId: string
    file: File;
    fileId: string
    banner: Image;
    bannerId: string;
    step: Step[];
    favorites: Favorite[];
    comment: Comment[];
    isValidate: boolean;
    status: string;
  }

export interface ResourceAdd
 {
  data: Resource,
  message: string
 }  
export interface Resources {
    data: Resource[];
    message: string
    total: number;
  }