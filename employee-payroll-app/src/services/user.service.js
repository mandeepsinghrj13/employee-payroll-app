import User from '../models/user.model';
import bcrypt from 'bcrypt';

//create new user
export const register = async (info) => {
  const findemail = await User.find({ email: info.email });
  if (findemail.length === 0) {
    const hashing = await bcrypt.hash(info.password, 10);
    info.password = hashing;
    const data = await User.create(info);
    return data;
  } else {
    return null;
  }
};

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
