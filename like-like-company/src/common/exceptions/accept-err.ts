import { HttpException } from ".";

export class AcceptException extends HttpException {
    constructor(message : string){
        super({status : 202, message : message})
    }
};
