import { HttpException } from "./HttpException";

export class InternalServerError extends HttpException {
    constructor(message = '관리자에게 문의하세요'){
        super({status : 500, message : message})
    }
}