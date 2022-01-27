"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerValidator = exports.newEmployeeValidator = exports.loginValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var registerValidator = function registerValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(2).required().pattern(new RegExp('^[A-Za-z]{1}[A-Za-z]{1,}$')),
    lastName: _joi["default"].string().min(2).required().pattern(new RegExp('^[A-Za-z]{1}[A-Za-z]{1,}$')),
    email: _joi["default"].string().pattern(new RegExp('^[a-zA-z]{2}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$')).required(),
    password: _joi["default"].string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.registerValidator = registerValidator;

var loginValidator = function loginValidator(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().pattern(new RegExp('^[a-zA-z]{2}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$')).required(),
    password: _joi["default"].string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')).required()
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error,
      value = _schema$validate2.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.loginValidator = loginValidator;

var newEmployeeValidator = function newEmployeeValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(2).required().pattern(new RegExp('^[A-Za-z]{1}[A-Za-z]{1,}$')),
    lastName: _joi["default"].string().min(2).required().pattern(new RegExp('^[A-Za-z]{1}[A-Za-z]{1,}$')),
    email: _joi["default"].string().pattern(new RegExp('^[a-zA-z]{2}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$')).required(),
    gender: _joi["default"].string().min(1).required().pattern(new RegExp('^[A-Za-z]{1}$')),
    salary: _joi["default"].number().integer().required(),
    department: _joi["default"].string().min(2).required()
  });

  var _schema$validate3 = schema.validate(req.body),
      error = _schema$validate3.error,
      value = _schema$validate3.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.newEmployeeValidator = newEmployeeValidator;