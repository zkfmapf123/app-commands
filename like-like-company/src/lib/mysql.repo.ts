import config from '../config';
import mysql2 from 'mysql2/promise';


type dbParamsType = {
    query : string;
    params ?: string;
};

const pool = mysql2.createPool({
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database,
    port: +config.mysql_port,
    connectionLimit: 10,
    waitForConnections: true
});

export class DBRepo{

    static async getFormatStringToArr(params : string) : Promise<Array<string>>{
        return (params.split(",").map(function(item){
            return item.trim();
        }));
    }

    static async getResult({query, params} : dbParamsType) : Promise<any>{
        const dbConn = await pool.getConnection();
        try{
            const paramsArr = await DBRepo.getFormatStringToArr(params);
            const result = await dbConn.query(query,paramsArr);
            return result;
        }catch(e){
            throw new Error(e);
        }finally{  
            dbConn.release();
        }
    }
};