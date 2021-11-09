import {DBRepo} from '../src/lib/index';
export const deleteUserUseEmail = async(email : string) =>{
    await DBRepo.getResult({
        query : 'delete from users where email = ?',
        params : `${email}`
    });
};
