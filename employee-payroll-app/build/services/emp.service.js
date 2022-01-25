"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newEmployee = exports.getEmployee = exports.allEmployee = void 0;

var _emp = _interopRequireDefault(require("../models/emp.model"));

//create newEmployee
var newEmployee = function newEmployee(body, callback) {
  _emp["default"].create(body, function (error, data) {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
}; //get all Employee


exports.newEmployee = newEmployee;

var allEmployee = function allEmployee(callback) {
  _emp["default"].find(function (error, data) {
    if (data) {
      return callback(null, data);
    } else {
      return callback(error, null);
    }
  });
}; //get single Employee by Id


exports.allEmployee = allEmployee;

var getEmployee = function getEmployee(id) {
  return new Promise(function (resolve, reject) {
    _emp["default"].findById(id).then(function (data) {
      return resolve(data);
    })["catch"](function (error) {
      return reject(error);
    });
  });
};

exports.getEmployee = getEmployee;