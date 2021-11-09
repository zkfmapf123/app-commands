import { Router, Request, Response } from "express";
import { authDto, AuthService, loginAuthDto } from "./index";
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
     * body 
     *      - token       : token
     *      - data        : email, password
     */
    login = async(req :Request, res :Response) =>{
        try{
            const {email, password} = req.body.data as loginAuthDto;
    
            const brcyptPassword = await this.authService.getUserInfoUseEmail(email);
            if(brcyptPassword === 'no email'){
                return res.status(202).json(new AcceptException('이메일이 유효하지 않습니다'));
            };

            const isCorrect = await this.authService.isComparePassword(password, brcyptPassword);
            if(!isCorrect){
                return res.status(202).json(new AcceptException('비밀번호가 맞지 않습니다'));
            };

            const access_token = await sign(email);
            
            return res.status(200).json({
                access_token
            });
        }catch(e){
            return res.status(500).json(new InternalServerError('관리자에게 문의하세요'));
        }
    };

    /**
     * url          : api/auth/join
     * body 
     *      token   : token
     *      data    : name, email, password
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