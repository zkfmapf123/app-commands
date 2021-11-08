import { HttpException } from ".";

export class AcceptException extends HttpException {
    constructor(message){
        super({status : 202, message : message})
    }
};
