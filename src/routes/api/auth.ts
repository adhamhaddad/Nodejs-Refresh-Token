import { Router } from 'express';
import {
  validateRegister,
  validateLogin,
  validateUpdatePassword
} from '../../middlewares/validation/auth';
import {
  createUser,
  authUser,
  refreshToken,
  updatePassword
} from '../../controllers/auth';
import { checkAccessToken } from '../../utils/token';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/register', validateRegister, createUser)
  .post('/login', validateLogin, authUser)
  .patch('/reset-password', validateUpdatePassword, verifyToken, updatePassword)
  .post('/refresh-token', refreshToken)
  .get('/check-token', checkAccessToken);

export default router;
