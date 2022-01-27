import express from 'express';
import * as empController from '../controllers/emp.controller';
import { newEmployeeValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new Employee
router.post('/', userAuth, newEmployeeValidator, empController.newEmployee);

//route to get all Employess
router.get('/', userAuth, empController.allEmployee);

//route to get a single Employee by their Employee id
router.get('/:_id', userAuth, empController.getEmployee);

//route to update a single Employee by their Employee id
router.put('/:_id', userAuth, newEmployeeValidator, empController.updateEmployee);

//route to delete a single Employee by their Employee id
router.delete('/:_id', userAuth, empController.deleteEmployee);

export default router;
