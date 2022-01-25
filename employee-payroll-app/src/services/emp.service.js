import User from '../models/emp.model';

//create newEmployee
export const newEmployee = (body, callback) => {
  User.create(body, (error, data) => {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
};

//get all Employee
export const allEmployee = (callback) => {
  User.find((error, data) => {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
};

//get single Employee by Id
export const getEmployee = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

//update single user
export const updateEmployee = (_id, body) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    )
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
