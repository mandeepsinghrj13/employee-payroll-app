import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const register = async (req, res, next) => {
  try {
    const info = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    };
    const data = await UserService.register(info);
    if (data) {
      logger.info('User created successfully');
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED, //201 Created
        data: data,
        message: 'User created successfully'
      });
    } else {
      logger.error('Email Already Exist');
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT, //409 Conflict
        message: 'Email Already Exist'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to login user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
  try {
    const info = {
      email: req.body.email,
      password: req.body.password
    };
    const data = await UserService.login(info);
    if (data === 'not register') {
      logger.error('not register');
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'not register'
      });
    } else if (data === 'wrong password') {
      logger.error('wrong password');
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'wrong password'
      });
    } else {
      logger.info('login successfully');
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'login successfully',
        token: data
      });
    }
  } catch (error) {
    next(error);
  }
};
