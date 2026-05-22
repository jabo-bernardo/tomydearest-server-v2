import * as crypto from 'crypto';

const hashString = (str: string): string => {
  const { HASH_SECRET_KEY } = process.env;
  
  if (!HASH_SECRET_KEY) throw new Error('HASH_SECRET_KEY is not defined');
  if (typeof HASH_SECRET_KEY !== 'string') throw new Error('HASH_SECRET_KEY must be a string');
  
  const hash = crypto.createHmac('sha256', HASH_SECRET_KEY).update(str).digest('hex');
  return hash;
};

export default hashString;