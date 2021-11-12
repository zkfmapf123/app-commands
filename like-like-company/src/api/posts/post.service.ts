import { LogRepository, RankMap } from "../../common/index";
import { DBRepo } from "../../lib/index";
import { gradeType } from "../index";
import { ICreate, IDelete, IRead, IUpdate, CreatePostDto, UpdatePostDto, DeletePostDto, ReadPostDto} from './index';

export class PostService implements ICreate, IUpdate, IDelete, IRead{
    
    async getAllPostCounts(): Promise<number> {
        throw new Error("Method not implemented.");
    };

    async formatPaginationNumber({ limit, offset }: ReadPostDto, postCount: number): Promise<ReadPostDto> {
        throw new Error("Method not implemented.");
    };

    async isPossibleCreate(grade: gradeType, currentArticles: number): Promise<boolean> {
        try{
            const isGradeNumber= RankMap.get(grade);
            
            if(currentArticles === isGradeNumber){
                return false;
            };

            return true;
        }catch(e){
            new LogRepository()
            .setErrType('error')
            .setTitle('is possible create')
            .setDescription(e)
            .create();
            throw new Error(e);
        }
    };

    async getGrade(id: number): Promise<[gradeType, number]> {
        try{
            const [row] = await DBRepo.getResult({
                query : 'select grade, (select count(*) from posts where user_id = ?) as count from users where id = ?',
                params : `${id},
                          ${id}`
            });
            
            return [row[0].grade, row[0].count];
        }catch(e){
            new LogRepository()
            .setTitle('is create grade')
            .setDescription(e)
            .setErrType('error')
            .create();
            throw new Error(e);
        }
    }
    
    async createPost({ id, title, description }: CreatePostDto): Promise<void> {
        try{
            await DBRepo.getResult({
                query : 'insert into Posts(user_id, title, description) values(?,?,?)',
                params : `${id},
                          ${title},
                          ${description}`
            });
        }catch(e){
            new LogRepository()
            .setErrType('error')
            .setDescription(e)
            .setTitle('create post')
            .create();
            throw new Error(e);
        }
    };

    async updatePpost({ id, title, description }: UpdatePostDto): Promise<void> {
        throw new Error("Method not implemented.");
    };

    async deletePost({ id }: DeletePostDto): Promise<void> {
        throw new Error("Method not implemented.");
    };

    async getPagination({ limit, offset }: ReadPostDto): Promise<any> {
        throw new Error("Method not implemented.");
    };

    async checkPaginationNumber({ limit, offset }: ReadPostDto): Promise<[number, number]> {
        throw new Error("Method not implemented.");
    };
    
}