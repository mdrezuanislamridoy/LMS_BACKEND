import { configDotenv } from "dotenv";
configDotenv();

interface AppEnv {
  port: string;
  db_url: string;
  jwt_secret: string;
  gmail_user: string;
  gmail_pass: string;
  sslc_store_id: string;
  sslc_store_pass: string;
  is_live: boolean;
  cname: string;
  capi_key: string;
  capi_secret: string;
  origin: string;
  node_env: string;
}

const toBoolean = (val: string | undefined): boolean => {
  if (!val) return false;
  return val.toLowerCase() === "true";
};

export const env: AppEnv = {
  port : process.env.PORT || "9999",
  db_url: process.env.DB_URL || "mongodb://localhost:27017/learning-platform",
  jwt_secret: process.env.JWT_SECRET || "",
  gmail_user: process.env.GMAIL_USER || "",
  gmail_pass: process.env.GMAIL_PASS || "",
  sslc_store_id: process.env.SSLC_STORE_ID || "",
  sslc_store_pass: process.env.SSLC_STORE_PASS || "",
  is_live: toBoolean(process.env.IS_LIVE),
  cname: process.env.CNAME || "",
  capi_key: process.env.CAPI_KEY || "",
  capi_secret: process.env.CAPI_SECRET || "",
  origin: process.env.ORIGIN || "http://localhost:5173",
  node_env: process.env.NODE_ENV || "development",
};
