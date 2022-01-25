import HttpStatus from 'http-status-codes';
import * as UserService from '../services/emp.service';
import logger from '../config/logger';

/**
 * Controller to create a newEmployee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newEmployee = (req, res, next) => {
  try {
    UserService.newEmployee(req.body, (error, data) => {
      if (data) {
        logger.info('Employee Added successfully');
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'Employee Added successfully'
        });
      } else {
        logger.error('Employee Email Already Exist');
        res.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          data: data,
          message: 'Employee Email Already Exist'
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
