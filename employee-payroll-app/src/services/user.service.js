/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import * as utils from '../utils/user.util';

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

//Login Api
export const login = async (info) => {
  const findemail = await User.findOne({ email: info.email });
  if (findemail) {
    const match = await bcrypt.compare(info.password, findemail.password);
    if (match) {
      const token = utils.token(findemail);
      return token;
    } else {
      return 'wrong password';
    }
  } else {
    return 'not register';
  }
};
