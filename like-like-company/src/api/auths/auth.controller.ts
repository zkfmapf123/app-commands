import { Router, Request, Response } from "express";
import { authDto, AuthService } from "./index";
import { Controller, AcceptException, InternalServerError } from "../../common/index";
import { sign } from "../../lib/index";

export class AuthController implements Controller{
    path: string = '/auth';
    router: Router = Router();
    errMessage: string = undefined;

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
    login = async(req :Request, res :Response) =>{
        
        return res.status(200).json({
            name : '123'
        });
    };

    /**
     * url          : api/auth/join
     * header       : token
     * body         : name, email, password
     */
    join = async(req:Request, res :Response) =>{
        try{
            const {name, email, password, grade = '인턴'} = req.body.data as authDto;
            const isEmail = await this.authService.isUniqueEmail(email);
            if(!isEmail){
                this.errMessage = '이미 존재하는 이메일 입니다';
                throw new Error(this.errMessage);
            };

            const isName = await this.authService.isUniqueName(name);
            if(!isName){
                this.errMessage = '이미 존재하는 이름입니다';
                throw new Error(this.errMessage);
            }

            const bcryptPassword = await this.authService.getCryptoPassword(password);
            await this.authService.createUser({
                name : name,
                email : email,
                password : bcryptPassword,
            });

            const access_token = await sign(email);

            return res.status(200).json({
                access_token
            });

        }catch(e){
            if(this.errMessage === undefined){
                return res.json(new InternalServerError());
            };

            return res.status(204).json(new AcceptException(this.errMessage));
        }
    };
};