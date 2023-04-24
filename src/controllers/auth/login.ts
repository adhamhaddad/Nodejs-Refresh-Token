import { Request, Response } from 'express';
import Auth from '../../models/auth';
import { signAccessToken, signRefreshToken } from '../../utils/token';

const auth = new Auth();

export const authUser = async (req: Request, res: Response) => {
  try {
    const response = await auth.authUser(req.body);
    const accessToken = await signAccessToken(response);
    const refreshToken = await signRefreshToken(response);
    res.status(200).json({
      status: true,
      data: { user: { ...response }, tokens: { accessToken, refreshToken } },
      message: 'User authenticated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message
    });
  }
};
