import {authDto, loginAuthDto} from './index';

export interface ILogin{
    getLogin({email, password} : loginAuthDto) : Promise<boolean>;
    getUserInfoUseEmail(email: string) : Promise<string>;
    isComparePassword(password: string, crpytoPassword : string) : Promise<boolean>; 
};

export interface IJoin{
    createUser({name, email, password, grade} : authDto): Promise<boolean>;
    isUniqueEmail(email :string) : Promise<boolean>;
    isUniqueName(name : string) : Promise<boolean>;
    getCryptoPassword(password: string) :Promise<string>;
};
