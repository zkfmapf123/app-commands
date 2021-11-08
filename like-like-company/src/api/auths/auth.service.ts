import { loginAuthDto } from './auth.dto';
import { authDto } from './auth.dto';
import {ILogin, IJoin} from './index';

export class AuthService implements ILogin, IJoin{
    getLogin({ email, password }: loginAuthDto): Promise<boolean> {
        throw new Error('Method not implemented.');
    };

    getUserInfoUseEmail(email: string): Promise<string> {
        throw new Error('Method not implemented.');
    };

    isComparePassword(password: string, crpytoPassword: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    };

    createUser({ name, email, password, grade }: authDto): Promise<boolean> {
        throw new Error('Method not implemented.');
    };

    isUniqueEmail(email: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    };

    isUniqueName(name: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    };

    getCryptoPassword(password: string): Promise<string> {
        throw new Error('Method not implemented.');
    };

};

