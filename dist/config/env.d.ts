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
export declare const env: AppEnv;
export {};
//# sourceMappingURL=env.d.ts.map