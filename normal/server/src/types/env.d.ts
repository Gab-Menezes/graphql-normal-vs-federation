declare namespace NodeJS {
  interface ProcessEnv {
    ENVIRONMENT: string;
    PORT: string;
    DATABASE_URL: string;
    SECRET_TOKEN: string;
    SECRET_REFRESH: string;
  }
}
