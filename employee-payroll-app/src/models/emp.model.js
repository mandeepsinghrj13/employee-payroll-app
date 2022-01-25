import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      required: true
    },
    department: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('EmployeesUser', userSchema);
