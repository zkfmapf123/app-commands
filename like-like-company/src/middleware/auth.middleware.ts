import { Handler, NextFunction, Request, Response } from "express";
import { UnauthorizationException } from "../common/index";
import { verify } from "../lib/index";

export const verifyJsonWebToken = (): Handler => (req: Request, res: Response, next: NextFunction) => {

  const token: string | undefined = req.body.token;
  const path = req.path.split("/");
  const urls = path[path.length-1];

  // 로그인 or join 이라면
  if(urls === 'join' || urls === 'login'){
    return next();
  };

  // 토큰이 없다면
  if(token === undefined || token === ''){
    return res.status(401).json(new UnauthorizationException());
  };

  // 토큰이 존재하지만, 기간이 끝났을 경우
  const [decodeToken, errMessage]= verify(token);

  if(errMessage === 'expired'){
    return res.status(401).json(new UnauthorizationException('토큰이 만료되었습니다'));
  };

  if(errMessage === 'not verify'){
    return res.status(401).json(new UnauthorizationException('유효하지 않은 토큰입니다'));
  };

  return next();
};