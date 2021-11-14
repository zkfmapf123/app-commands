import { Request, Response, Router } from "express";
import {verify} from '../../lib/index';
import { AcceptException, Controller, InternalServerError } from "../../common/index";
import { PostService } from './index';
import { gradeType } from "../index";

export class PostController implements Controller{
    path: string = '/post'
    router: Router = Router();
    errMessage: string = undefined;

    constructor(
        private readonly postService : PostService
    ){
        this.initRoutes();
    };
    initRoutes(){
        const router = Router();

        router.get('/',this.pagination);
        router.post('/',this.create);
        router.put('/:id',this.update);
        router.delete('/:id',this.delete);

        this.router.use(this.path,router);
    };

    /**
     * url          : api/post?limit=?&offset=?&order=?
     * body
     *     token    : token
     */    

    pagination = async(req : Request, res :Response) =>{
        try{
            const {limit, offset, order} = req.query;
    
            const {posts, postLimit, postOffset} = await this.postService.getPagination({
                limit : +limit,
                offset :+offset,
                rand : 'recenlty'
            });

            return res.status(200).json({
                posts,
                isUpdate : (+offset === postOffset) ? false :true,
                offset : postOffset,
                limit : postLimit
            })

        }catch(e){
            return res.status(500).json(new InternalServerError());
        }
    };

    /**
     * url          : api/post
     * body
     *     token    : token
     *     data     : title, description
     */

    create = async(req: Request, res :Response) =>{
        try{
            const [token, error] = verify(req.body.token);
            const {id} = token;
            const {title, description} = req.body.data;

            const [userGrade, gradeCount] = await this.postService.getGrade(id);
            const isCreate = await this.postService.isPossibleCreate(userGrade, gradeCount);
            if(!isCreate){
                return res.status(202).json(new AcceptException('더이상 글을 쓸수 없습니다'));
            };

            await this.postService.createPost({
                id : id,
                title : title,
                description: description
            });

            return res.status(200).json({});
        }catch(e){
            return res.status(500).json(new InternalServerError());
        }
    };

    /**
     * url          : api/post/:id
     * body
     *     token    : token
     *     data     : title, description
     */
    update = async(req:Request, res:Response) =>{
        try{

        }catch(e){
            return res.status(500).json(new InternalServerError());
        }
    };

    /**
     * url          : api/post/:id
     * body
     *     token    : token
     */
    delete = async(req:Request, res :Response) =>{
        try{

        }catch(e){
            return res.status(500).json(new InternalServerError());
        }
    };
}