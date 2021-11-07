import * as dotenv from "dotenv";
dotenv.config();

export default {
  dev : process.env.DEV,
  port: process.env.PORT,

  firebase_api_key : process.env.FB_API_KEY,
  firebase_auth_domain : process.env.FB_AUTH_DOMAIN,
  firebase_db_url : process.env.FB_DB_URL,
  firebase_pid : process.env.FB_PID,
  firebase_storage_bucket : process.env.FB_BUCKET,
  firebase_message_id : process.env.FB_MESSAGE_ID,
  firebase_aid : process.env.FB_APP_ID,
  firebase_mid : process.env.FB_ME_ID,

  jwtScreet: process.env.JWT_SECREET,
  hashRound: process.env.HASH_ROUND,
}