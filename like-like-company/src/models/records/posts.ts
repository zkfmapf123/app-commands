import { v1 } from "uuid";
import { Repository } from "./repository";

export class Post extends Repository{
    private id : number;
    private user_id : number;
    private title : string;
    private description : string;
    private created_datetime : string;
    private updated_datetime : string;

    constructor(){
        super();
        this.id = +v1();
        this.created_datetime = super.createCurrentDateTime();
        this.updated_datetime = super.createCurrentDateTime();
    };

    setTitle(title: string) :this{
        this.title = title;
        return this;
    };

    setDescription(description : string) :this{
        this.description = description;
        return this;
    };

    getPostDataBeforeCreate(){
        return {
            id : this.id,
            user_id : this.user_id,
            title :this.title,
            description : this.description,
            created : this.created_datetime,
            updated : this.updated_datetime
        }
    };
}