import { configDotenv } from "dotenv";
configDotenv();
export const env = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    jwt_secret: process.env.JWT_SECRET,
    gmail_user: process.env.GMAIL_USER,
    gmail_pass: process.env.GMAIL_PASS,
    sslc_store_id: process.env.SSLC_STORE_ID,
    sslc_store_pass: process.env.SSLC_STORE_PASS,
    is_live: process.env.IS_LIVE,
    cname: process.env.CNAME,
    capi_key: process.env.CAPI_KEY,
    capi_secret: process.env.CAPI_SECRET,
    origin: process.env.ORIGIN,
    node_env: process.env.NODE_ENV,
};
//# sourceMappingURL=env.js.map