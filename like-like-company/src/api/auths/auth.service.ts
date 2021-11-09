import config from '../../config';
import bcrypt from 'bcrypt';
import {ILogin, IJoin, authDto, loginAuthDto} from './index';
import { LogRepository, Service } from '../../common/index';
import {DBRepo} from '../../lib/mysql.repo';

export class AuthService extends Service implements ILogin, IJoin{

    async getUserInfoUseEmail(email: string): Promise<string | 'no email' | 'error'> {
        try{
            const [row] = await DBRepo.getResult({
                query : 'select password from users where email = ?',
                params : `${email}`
            });

            if(this.isDataEmpty(row)){
                return 'no email';
            };

            return row[0].password;
        }catch(e){
            new LogRepository()
            .setErrType('error')
            .setDescription(e)
            .setTitle('get user info use email')
            .create();
            throw new Error(e);
        }
    };

    async isComparePassword(password: string, crpytoPassword: string): Promise<boolean> {
        try{
            return (await bcrypt.compare(password, crpytoPassword));
        }catch(e){
            new LogRepository()
            .setErrType('error')
            .setDescription(e)
            .setTitle('is compare password')
            .create();
            throw new Error(e);
        } 
    };

    async createUser({ name, email, password, grade = '인턴' }: authDto): Promise<void> {
        try{
            await DBRepo.getResult({
                query : 'insert into users(name, email, password, grade) values(?,?,?,?)',
                params: `${name},
                         ${email},
                         ${password},
                         ${grade}`
            });
        }catch(e){
            new LogRepository()
            .setErrType('error')
            .setDescription(e)
            .setTitle('create user')
            .create();
            throw new Error(e);
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
            throw new Error(e);  
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
            throw new Error(e);
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
            throw new Error(e);
        }
    };

};

