import * as dotenv from "dotenv";
dotenv.config();

export default {
  dev : process.env.DEV,
  port: process.env.PORT,

  mysql_host : process.env.MYSQL_HOST,
  mysql_port : process.env.MYSQL_PORT,
  mysql_user : process.env.MYSQL_USER,
  mysql_database : process.env.MYSQL_DATABASE,
  mysql_password : process.env.MYSQL_PASSWORD,

  jwtScreet: process.env.JWT_SECREET,
  hashRound: process.env.HASH_ROUND,
}