import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { redisClient } from '../../database';
import { DecodedToken } from '.';
import { verifyRefreshToken, setAccessToken } from '.';
import configs from '../../configs';

const publicAccessKey = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'keys',
  'accessToken',
  'public.key'
);
interface Request extends ExpressRequest {
  user?: DecodedToken;
}

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await redisClient.connect();
  try {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      return res.status(401).json({
        message: 'Not Authorized'
      });
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new Error(
        'Invalid Authorization header format. Format is "Bearer <token>".'
      );
    }
    try {
      const publicKey = await fs.promises.readFile(publicAccessKey, 'utf8');
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
        issuer: 'Nodejs-Refresh-Token'
      }) as DecodedToken;
      const cachedToken = await redisClient.get(`access_token:${decoded.id}`);
      if (!cachedToken || cachedToken !== token) {
        throw new Error('Access token not found or expired');
      }
      req.user = { id: decoded.id };
      await redisClient.disconnect();
      return next();
    } catch (err) {
      await redisClient.disconnect();
      if ((err as Error).name !== 'TokenExpiredError') {
        throw new Error('Invalid access token');
      }

      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        throw new Error('Refresh token missing');
      }

      const decoded = await verifyRefreshToken(refreshToken);
      const { id, first_name, last_name, username, email } = decoded;
      const newAccessToken = await setAccessToken({
        id,
        first_name,
        last_name,
        username,
        email
      });

      // Attach user object to request and proceed with new access token
      req.user = { id: String(decoded.id) };
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: configs.access_expires
      });
      return next();
    }
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
};
