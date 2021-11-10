import { Request, Response, Router } from "express";
import { Controller, InternalServerError } from "../../common/index";

class PostController implements Controller{
    path: string = '/post'
    router: Router = Router();
    errMessage: string = undefined;

    constructor(){
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