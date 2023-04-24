import bcrypt from 'bcrypt';
import configs from '../configs';

export const hash = (password: string) =>
  bcrypt.hash(`${configs.pepper}${password}${configs.pepper}`, configs.salt);

export const compare = (password: string, hash: string) =>
  bcrypt.compare(`${configs.pepper}${password}${configs.pepper}`, hash);
