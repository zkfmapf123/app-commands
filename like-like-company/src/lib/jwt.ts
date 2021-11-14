import * as jwt from "jsonwebtoken";
import { DBRepo } from "./index";
import { LogRepository } from "../common/index";
import config from "../config";

export interface JwyPayloadType{
  email: string;
  id: number;
  name: string;
};

const jwtOption : jwt.SignOptions = {
  algorithm : 'HS256',
  expiresIn : '30d',
  issuer:'like-like-company'
};

// jwt 만들 때 사용
export const sign = async(email : string, options = jwtOption) => {
  try{
    const [row] = await DBRepo.getResult({
      query : 'select id,name from users where email = ?',
      params : `${email}`
    });

    const {id,name} = row[0];
    const payload : JwyPayloadType = {
      id : id,
      email : email,
      name : name
    };

    return jwt.sign(payload, config.jwtScreet, options);
  }catch(e){
    new LogRepository()
    .setTitle('jwt sign error')
    .setDescription(e)
    .setErrType('error')
    .create();
    throw new Error(e);
  }
};

// jwt 풀 때 사용
export const verify = (token: string, options=jwtOption) : [JwyPayloadType | undefined, string | undefined] => {
  try{
    const decodeToken = jwt.verify(token, config.jwtScreet, options) as JwyPayloadType;
    return [decodeToken, undefined];
  }catch(e){
    if(e.name === 'TokenExpiredError'){
      return [undefined, 'expired'];
    };

    return [undefined, 'not verify'];
  }
}