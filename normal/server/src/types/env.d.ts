declare namespace NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: string;
    PORT: string;
    SECRET_TOKEN: string;
    SECRET_REFRESH: string;

    FRONTEND_URL: string;
    
    DATABASE_URL: string;
  }
}
