import config from '../../config';
import bcrypt from 'bcrypt';
import {ILogin, IJoin, authDto, loginAuthDto} from './index';
import { LogRepository, Service } from '../../common/index';
import {DBRepo} from '../../lib/mysql.repo';

export class AuthService extends Service implements ILogin, IJoin{
    async getLogin({ email, password }: loginAuthDto): Promise<void> {
        throw new Error('Method not implemented.');
    };

    async getUserInfoUseEmail(email: string): Promise<string> {
        throw new Error('Method not implemented.');
    };

    async isComparePassword(password: string, crpytoPassword: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    };

    async createUser({ name, email, password, grade = '인턴' }: authDto): Promise<void> {
        try{
            
            throw new Error('wer');
        }catch(e){
            throw new Error('er');
        }   
    };

    async isUniqueEmail(email: string): Promise<boolean> {
        try{
            const [row] = await DBRepo.getResult({
                query : 'select email from users where email = ?',
                params : `${email}`
            });

            if(this.isDataEmpty(row)){
                return true;
            };

            // data not empty
            return false;
        }catch(e){
            new LogRepository()
            .setDescription(e)
            .setErrType('error')
            .setTitle('is unique email')
            .create();
            return false;      
        }
    };

    async isUniqueName(name: string): Promise<boolean> {
        try{
            const [row] = await DBRepo.getResult({
                query: 'select name from users where name = ?',
                params: `${name}`
            });

            if(this.isDataEmpty(row)){
                return true;
            };

            // data not empty
            return false;
        }catch(e){
            new LogRepository()
            .setDescription(e)
            .setErrType('error')
            .setTitle('is unique name')
            .create();
            return false;
        }
    };

    async getCryptoPassword(password: string): Promise<string> {
        try{
            const salt = await bcrypt.genSalt(+config.hashRound);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        }catch(e){
            new LogRepository()
            .setDescription(e)
            .setErrType('error')
            .setTitle('get crypo password')
            .create();
            return undefined;
        }
    };

};

