import express from 'express';
import * as userController from '../controllers/user.controller';
import {
  registerValidator,
  loginValidator
} from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/register', registerValidator, userController.register);

//route to create a new user
router.post('/login', loginValidator, userController.login);

//route to get all users
router.get('', userController.getAllUsers);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser);

//route to update a single user by their user id
router.put('/:_id', userController.updateUser);

//route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);

export default router;