"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var UserService = _interopRequireWildcard(require("../services/user.service"));

var _logger = _interopRequireDefault(require("../config/logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            info = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password
            };
            _context.next = 4;
            return UserService.register(info);

          case 4:
            data = _context.sent;

            if (data) {
              _logger["default"].info('User created successfully');

              res.status(_httpStatusCodes["default"].CREATED).json({
                code: _httpStatusCodes["default"].CREATED,
                //201 Created
                data: data,
                message: 'User created successfully'
              });
            } else {
              _logger["default"].error('Email Already Exist');

              res.status(_httpStatusCodes["default"].CONFLICT).json({
                code: _httpStatusCodes["default"].CONFLICT,
                //409 Conflict
                message: 'Email Already Exist'
              });
            }

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function register(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Controller to login user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var info, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            info = {
              email: req.body.email,
              password: req.body.password
            };
            _context2.next = 4;
            return UserService.login(info);

          case 4:
            data = _context2.sent;

            if (data === 'not register') {
              _logger["default"].error('not register');

              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: 'not register'
              });
            } else if (data === 'wrong password') {
              _logger["default"].error('wrong password');

              res.status(_httpStatusCodes["default"].UNAUTHORIZED).json({
                code: _httpStatusCodes["default"].UNAUTHORIZED,
                message: 'wrong password'
              });
            } else {
              _logger["default"].info('login successfully');

              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'login successfully',
                token: data
              });
            }

            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function login(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;