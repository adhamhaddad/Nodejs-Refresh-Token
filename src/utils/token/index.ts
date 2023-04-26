import { setAccessToken } from './setAccessToken';
import { setRefreshToken } from './setRefreshToken';
import { verifyAccessToken } from './verifyAccessToken';
import { verifyRefreshToken } from './verifyRefreshToken';

interface Payload {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
interface DecodedToken {
  id: string;
}

export {
  setAccessToken,
  setRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  Payload,
  DecodedToken
};
