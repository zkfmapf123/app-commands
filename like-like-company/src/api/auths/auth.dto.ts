export type gradeType = '인턴' |'수습' |'사원' |'주임' | '대리' |'과장' |'차장' |'부장' |'이사' |'대표';

export type authDto = {
    name : string;
    email :string;
    password : string;
    grade : gradeType;
};

export type loginAuthDto = Pick<authDto, 'email' | 'password'>;
