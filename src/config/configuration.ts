import { getEnvPath } from '../common/helper/env.helper'; // Adjust the path if necessary
import { config } from 'dotenv';
import { resolve } from 'path';

const envFilePath: string = getEnvPath(resolve(__dirname, '..','..', 'src', 'common', 'envs'));

config({ path: envFilePath }); 

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10),
  baseUrl: process.env.BASE_URL,
  
  database: {
    uri: process.env.MONGO_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },

  adminUser: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
});

