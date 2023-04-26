import { Request, Response } from 'express';
import { setAccessToken, setRefreshToken } from '../../utils/token';
import Auth from '../../models/auth';
import configs from '../../configs';

const auth = new Auth();

export const authUser = async (req: Request, res: Response) => {
  try {
    // Authenticate the user and generate an access token and refresh token
    const response = await auth.authUser(req.body);
    const accessToken = await setAccessToken(response);
    const refreshToken = await setRefreshToken(response);

    // Set the access token as an HTTP-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: configs.access_expires
    });

    // Set the refresh token as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: configs.refresh_expires
    });

    res.status(200).json({
      status: true,
      data: { user: { ...response }, accessToken },
      message: 'User authenticated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message
    });
  }
};
