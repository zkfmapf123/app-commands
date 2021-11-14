import { LogRepository, RankMap, Service } from "../../common/index";
import { DBRepo } from "../../lib/index";
import { gradeType } from "../index";
import { ICreate, IDelete, IRead, IUpdate, CreatePostDto, UpdatePostDto, DeletePostDto, ReadPostDto} from './index';
import { PaginationUnionType } from "./post.dto";

export class PostService extends Service implements ICreate, IUpdate, IDelete, IRead{
    
    private addPaginationParams(rand : 'recently' | 'good', limit : number, offset: number) :string{ 
        if(rand === 'good'){
            // redis
        };

        return `order by created_datetime desc limit ${limit} offset ${offset}`;
    }
    async getPagination({ limit, offset }: ReadPostDto): Promise<PaginationUnionType> {
        try{
            let paginationQuery = GET_PAGINATION + this.addPaginationParams('recently',limit, offset);
            let [row] = await DBRepo.getResult({
                query : paginationQuery,
                params : ''
            });

            if(!this.isDataEmpty(row)){
                return {
                    posts : row,
                    postLimit : limit,
                    postOffset : offset
                };
            };

            paginationQuery = GET_PAGINATION + this.addPaginationParams(`recently`,limit,0);
            [row] = await DBRepo.getResult({
                query : paginationQuery,
                params: ''
            });

            return {
                posts: row,
                postLimit : limit,
                postOffset : limit
            };
        }catch(e){
            new LogRepository()
            .setDescription(e)
            .setErrType('error')
            .setTitle('get pagination')
            .create();
            throw new Error(e);
        }
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

    async checkPaginationNumber({ limit, offset }: ReadPostDto): Promise<[number, number]> {
        throw new Error("Method not implemented.");
    };
    
};

const GET_PAGINATION = 
' select\
  p.id,\
  p.title,\
  p.description,\
  p.created_datetime,\
  (select count(*) from post_comments where post_id = p.id) as count\
  from posts p ';
