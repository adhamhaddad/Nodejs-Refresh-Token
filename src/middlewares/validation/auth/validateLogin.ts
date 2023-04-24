import { Request, Response, NextFunction } from 'express';
import { body, oneOf } from 'express-validator';
import { validate } from '../validationResult';

export const validateLogin = [
  oneOf(
    [
      body('username')
        .exists()
        .withMessage('username is missing from the body')
        .notEmpty()
        .withMessage('username is empty')
        .isString()
        .withMessage('username must be string'),
      body('email')
        .exists()
        .withMessage('Email is missing from the body')
        .notEmpty()
        .withMessage('Email is empty')
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail()
        .withMessage('Email is not normalized')
    ],
    'Must be at least one of email or username'
  ),
  body('password')
    .exists()
    .withMessage('password is missing from the body')
    .notEmpty()
    .withMessage('password is empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
