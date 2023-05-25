import { Router } from 'express';
import { auth, users } from './api';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);

export default router;
