require('dotenv').config();

export interface IConfig {
    port: number;
    debugLogging: boolean;
    dbsslconn: boolean;
    jwtSecret: string;
    databaseUrl: string;
    domain: string;
    google_client_id: string;
    google_client_secret: string;

}

const config: IConfig = {
    port: +process.env.PORT || 3000,
    debugLogging: process.env.NODE_ENV == 'development',
    dbsslconn: process.env.NODE_ENV != 'development',
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    domain: process.env.DOMAIN,
    google_client_id: process.env.google_client_id || '1010557557678-p028ul54cbhdc9crjhgl72t24l2h1pau.apps.googleusercontent.com',
    google_client_secret: process.env.google_client_secret || 'B5hcuIEDzGKadbQ3f4y4kNTt',
};

export { config };