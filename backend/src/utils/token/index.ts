import { setAccessToken } from './setAccessToken';
import { setRefreshToken } from './setRefreshToken';
import { verifyAccessToken } from './verifyAccessToken';
import { verifyRefreshToken } from './verifyRefreshToken';
import { authMe } from './authMe';

interface Payload {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}
interface DecodedToken {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export {
  setAccessToken,
  setRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  authMe,
  Payload,
  DecodedToken
};
