interface AppENV extends NodeJS.ProcessEnv {
  PORT: string;
  MONGO_URI: string;
  ACCESS_TOKEN_SECRET: string;
  NODE_ENV: string;
  REFRESH_TOKEN_SECRET: string;
  LOCAL_CORS_ORIGIN: string;
}

const config = process.env as AppENV;
export default config;
