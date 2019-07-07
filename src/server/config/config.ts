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
    jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
    databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/test_app',
    domain: process.env.DOMAIN || 'http://localhost:3000',
    google_client_id: process.env.google_client_id,
    google_client_secret: process.env.google_client_secret
};

export { config };