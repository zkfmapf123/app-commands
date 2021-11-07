import { v1 } from "uuid";
import { Repository } from "./repository";

export class Comments extends Repository{
    private id :number;
    private user_id : number;
    private post_id : number;
    private comments : string;
    private created_datetime : string;
    private updated_datetime : string;

    constructor(){
        super();
        this.id = +v1();
        this.created_datetime = super.createCurrentDateTime();
        this.updated_datetime = super.createCurrentDateTime();
    };

    setUserId(userId : number) : this{
        this.user_id = userId;
        return this;
    };

    setPostId(postId : number) :this{
        this.post_id = postId;
        return this;
    };

    setComments(comments: string) :this{
        this.comments = comments;
        return this;
    };

    getCommentsDataBeforeCreate(){
        return {
            id : this.id,
            userId : this.user_id,
            postId : this.post_id,
            comments : this.comments,
            created: this.created_datetime,
            updated: this.updated_datetime 
        };
    };
}