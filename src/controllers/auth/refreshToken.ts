import { Request, Response } from 'express';
import { verifyRefreshToken, signAccessToken } from '../../utils/token';

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) throw 'Bad request';

    const payload = await verifyRefreshToken(token);
    const accessToken = await signAccessToken({
      // @ts-ignore
      id: payload?.id,
      // @ts-ignore
      first_name: payload?.first_name,
      // @ts-ignore
      last_name: payload?.last_name,
      // @ts-ignore
      username: payload?.username,
      // @ts-ignore
      email: payload?.email
    });
    res.status(200).json({
      data: { accessToken }
    });
  } catch (error) {
    res.status(401).json({
      status: false,
      message: error
    });
  }
};
