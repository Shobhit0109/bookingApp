import dotenv from 'dotenv';

const loadEnv = async () => {
  let result = dotenv.config({ path: '../../.env' });
  if (result.error) {
    result = dotenv.config();
    if (result.error) {
      throw new Error('Error loading .env file');
    }
  }
};

export default loadEnv;
