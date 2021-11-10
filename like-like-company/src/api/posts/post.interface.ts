import { gradeType } from "../index";
import { CreatePostDto, DeletePostDto, ReadPostDto, UpdatePostDto } from "./index";

export interface IRead{
    getPagination({limit, offset} : ReadPostDto) : Promise<any>;
    checkPaginationNumber({limit, offset} : ReadPostDto) :Promise<[number, number]>;
};

export interface ICreate{
    getGrade(id : number) : Promise<[gradeType, number]>;
    isPossibleCreate(grade : gradeType, currentArticles : number) : Promise<boolean>;
    createPost({id, title, description} : CreatePostDto) : Promise<void>;
};

export interface IUpdate{
    updatePpost({id, title, description} : UpdatePostDto) :Promise<void>;
};

export interface IDelete{
    deletePost({id} : DeletePostDto) : Promise<void>;
};


