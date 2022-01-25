import jwt from 'jsonwebtoken';

export const token = (findemail) => {
  const Token = {
    id: findemail._id,
    firstName: findemail.firstName,
    lastName: findemail.lastName,
    email: findemail.email
  };
  console.log('Data Token = ', Token);
  return jwt.sign({ Token }, process.env.JWT_SECRET);
};
