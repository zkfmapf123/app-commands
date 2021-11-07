import {v1} from 'uuid';
import { Repository } from './repository';

type rankType = 
'인턴' |
'수습' |
'사원' |
'주임' | 
'대리' |
'과장' |
'차장' |
'부장' |
'이사' |
'대표';

export class User extends Repository {
    private id : number;
    private name :string;  // unique
    private email: string; // unique
    private rank  : rankType;
    private created_datetime : string;
    private updated_datetime : string;

    constructor(){
        super();

        this.id = +v1();
        this.created_datetime = super.createCurrentDateTime();
        this.updated_datetime = super.createCurrentDateTime();
        this.rank = '인턴';
    };

    setName(name: string) : this{
        this.name = name;
        return this;
    };

    setEmail(email :string) :this{
        this.email = email;
        return this;
    };

    getUserDataBeforeCreate(){
        return {
            id : this.id,
            name :this.name,
            email :this.email,
            rank : this.rank,
            created : this.created_datetime,
            updated : this.updated_datetime
        }
    };
};