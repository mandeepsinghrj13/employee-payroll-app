"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var token = function token(findemail) {
  var Token = {
    id: findemail._id,
    firstName: findemail.firstName,
    lastName: findemail.lastName,
    email: findemail.email
  };
  console.log('Data Token = ', Token);
  return _jsonwebtoken["default"].sign({
    Token: Token
  }, process.env.JWT_SECRET);
};

exports.token = token;