import dotenv from 'dotenv';

const envFile = `./.env`;

dotenv.config({
  path: envFile
});

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  env: process.env.ENV || 'Development'
};

export default config;