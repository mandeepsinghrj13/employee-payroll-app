"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newEmployee = void 0;

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var UserService = _interopRequireWildcard(require("../services/emp.service"));

var _logger = _interopRequireDefault(require("../config/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Controller to create a newEmployee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
var newEmployee = function newEmployee(req, res, next) {
  try {
    UserService.newEmployee(req.body, function (error, data) {
      if (data) {
        _logger["default"].info('Employee Added successfully');

        res.status(_httpStatusCodes["default"].CREATED).json({
          code: _httpStatusCodes["default"].CREATED,
          data: data,
          message: 'Employee Added successfully'
        });
      } else {
        _logger["default"].error('Employee Email Already Exist');

        res.status(_httpStatusCodes["default"].CONFLICT).json({
          code: _httpStatusCodes["default"].CONFLICT,
          data: data,
          message: 'Employee Email Already Exist'
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.newEmployee = newEmployee;