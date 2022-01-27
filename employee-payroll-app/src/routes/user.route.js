import express from 'express';
import * as userController from '../controllers/user.controller';
import { registerValidator, loginValidator } from '../validators/user.validator';

const router = express.Router();

//route to create a new user
router.post('/register', registerValidator, userController.register);

//route to create a new user
router.post('/login', loginValidator, userController.login);

export default router;
