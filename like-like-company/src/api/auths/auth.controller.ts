import { Router, Request, Response } from "express";
import { Controller } from "../../common/index";

class AuthController implements Controller{
    path: string = '/auth';
    router: Router = Router();

    initRoutes(){
        const route = Router();

        route.post('/login',);
        route.post('/join',);

        this.router.use(this.path,route);
    };

    /**
     * url          : api/auth/login
     * header       : token
     * body         : email, password
     */
    async login(req :Request, res :Response){
        
    };

    /**
     * url          : api/auth/join
     * header       : token
     * body         : name, email, password
     */
    async join(req:Request, res :Response){
        
    };
};