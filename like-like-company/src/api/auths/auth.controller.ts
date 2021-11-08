import { Router, Request, Response } from "express";
import { authDto, AuthService } from "./index";
import { Controller } from "../../common/index";

export class AuthController implements Controller{
    path: string = '/auth';
    router: Router = Router();
    errMessage: string;

    constructor(
        private readonly authService : AuthService
    ){ this.initRoutes(); };

    initRoutes(){
        const route = Router();

        route.post('/login',this.login);
        route.post('/join',this.join);

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
        try{
            const {name, email, password, grade} = req.body as authDto;

            throw new Error('123');

        }catch(e){
            res.send('adsf');
        }
    };
};