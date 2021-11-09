import { Router } from "express";
import { Controller } from "../../common/index";

class PostController implements Controller{
    path: string = '/post'
    router: Router = Router();
    errMessage: string = undefined;

    constructor(){

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

    pagination = async() =>{

    };

    /**
     * url          : api/post
     * body
     *     token    : token
     *     data     : title, description
     */

    create = async() =>{

    };

    /**
     * url          : api/post/:id
     * body
     *     token    : token
     *     data     : title, description
     */
    update = async() =>{

    };

    /**
     * url          : api/post/:id
     * body
     *     token    : token
     */
    delete = async() =>{

    };
}