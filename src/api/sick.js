import { client } from './index';

export const getSick = async searchWord => {
  console.info('api calling');
  return await client.get(`/sick?q=${searchWord}`);
};
