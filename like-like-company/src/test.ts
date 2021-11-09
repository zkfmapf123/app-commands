import {DBRepo} from './lib/index';

(async()=>{
    const [row] = await DBRepo.getResult({
        query : 'select id,name from users where email = ?',
        params : `zkfmapf123@naver.com`
      });

    const {}
    console.log(row[0]);
})();
