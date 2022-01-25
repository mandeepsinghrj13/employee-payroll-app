/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import * as empController from '../controllers/emp.controller';
import {
  registerValidator,
  loginValidator,
  newEmployeeValidator
} from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/register', registerValidator, userController.register);

//route to create a new user
router.post('/login', loginValidator, userController.login);

router.post(
  '/employees',
  userAuth,
  newEmployeeValidator,
  empController.newEmployee
);

//route to get all users
router.get('/employees', userAuth, empController.allEmployee);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;
