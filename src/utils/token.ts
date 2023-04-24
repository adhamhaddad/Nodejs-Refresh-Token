import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import configs from '../configs';
import Auth from '../models/auth';

type Payload = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

const privateAccessKey = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'accessToken',
  'private.key'
);
const privateRefreshKey = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'refreshToken',
  'private.key'
);
const publicAccessKey = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'accessToken',
  'public.key'
);
const publicRefreshKey = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'refreshToken',
  'public.key'
);

export const signAccessToken = async (payload: Payload) => {
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: configs.access_expires,
    issuer: 'adhamhaddad',
    audience: String(payload.id)
  };
  return new Promise((resolve, reject) => {
    fs.readFile(privateAccessKey, { encoding: 'utf8' }, (err, key) => {
      if (err) reject(err);
      jwt.sign(payload, key, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  });
};

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization as string;
  if (!authorization) {
    return res.status(401).json({
      status: false,
      message: 'Not Authorized'
    });
  }
  const token = authorization.split(' ')[1];
  fs.readFile(publicAccessKey, 'utf8', (err, key) => {
    if (err) err.message;
    jwt.verify(token, key, { algorithms: ['RS256'] }, (err, payload) => {
      if (err)
        return res.status(401).json({
          status: false,
          message: (err as Error).message
        });
      return next();
    });
  });
};

export const signRefreshToken = async (payload: Payload) => {
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: configs.refresh_expires,
    issuer: 'adhamhaddad',
    audience: String(payload.id)
  };
  return new Promise((resolve, reject) => {
    fs.readFile(privateRefreshKey, { encoding: 'utf8' }, (err, key) => {
      if (err) reject(err);
      jwt.sign(payload, key, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  });
};

export const verifyRefreshToken = async (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(publicRefreshKey, 'utf8', (err, key) => {
      if (err) reject(err);
      jwt.verify(
        refreshToken,
        key,
        { algorithms: ['RS256'] },
        (err, payload) => {
          if (err) reject(err);
          resolve(payload);
        }
      );
    });
  });
};

export const checkAccessToken = async (req: Request, res: Response) => {
  const auth = new Auth();
  try {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      res.status(401).json({
        status: false,
        message: 'Not Authorized'
      });
    }
    const token = authorization.split(' ')[1];
    const authMe = async (id: string) => await auth.authMe(id);
    fs.readFile(publicAccessKey, 'utf8', (err, key) => {
      if (err) err.message;
      jwt.verify(token, key, { algorithms: ['RS256'] }, (err, payload) => {
        if (err) {
          const decode = jwt.decode(token, { complete: true });
          // @ts-ignore
          const id = decode?.payload?.aud;
          const responseData = async () => {
            const response = await authMe(id);
            const accessToken = await signAccessToken(response);
            return res.status(200).json({
              status: true,
              data: {
                response,
                accessToken
              },
              message: 'Access token generated successfully.'
            });
          };
          responseData();
        } else {
          // @ts-ignore
          const id = payload.id;
          const responseData = async () => {
            const response = await authMe(id);
            res.status(200).json({
              data: response
            });
          };
          responseData();
        }
      });
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};
