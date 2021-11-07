import { v1 } from "uuid";
import { Repository } from "./repository";

export class Alarms extends Repository{
    private id : number;
    private userId : number;
    private comments : string;
    private created_datetime : string;

    constructor(){
        super();
        this.id = +v1();
        this.created_datetime = super.createCurrentDateTime();
    };

    setUserId(userId: number) :this{
        this.userId= userId;
        return this;
    };

    setComments(comments : string) :this{
        this.comments = comments;
        return this;
    };

    getAlarmsDataBeforeCreate(){
        return {
            id : this.id,
            userId: this.userId,
            comments: this.comments,
            created: this.created_datetime
        }
    }
};
