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

/**
 * Controller to get all Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const allEmployee = (req, res, next) => {
  try {
    UserService.allEmployee((error, data) => {
      if (data) {
        logger.info('Geting All Employee Successfully');
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Geting All Employee Successfully',
          data: data
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getEmployee = (req, res, next) => {
  try {
    UserService.getEmployee(req.params._id)
      .then((data) => {
        logger.info('Employee fetched successfully');
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Employee fetched successfully',
          data: data
        });
      })
      .catch(() => {
        logger.error(' Id Not Found');
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: ' Id Not Found'
        });
      });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateEmployee = (req, res, next) => {
  try {
    UserService.updateEmployee(req.params._id, req.body)
      .then((data) => {
        logger.info('Employee updated successfully');
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          message: 'Employee updated successfully',
          data: data
        });
      })
      .catch(() => {
        logger.error(' Id Not Found');
        return res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: ' Id Not Found'
        });
      });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteEmployee = async (req, res, next) => {
  try {
    const data = await UserService.deleteEmployee(req.params._id);
    if (data == null) {
      logger.error(' Id Not Found');
      return res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: ' Id Not Found'
      });
    }
    logger.info('Employee deleted successfully');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Employee deleted successfully',
      data: data
    });
  } catch (error) {
    next(error);
  }
};
