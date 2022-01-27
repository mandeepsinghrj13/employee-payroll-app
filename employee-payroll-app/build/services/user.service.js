"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.login = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var utils = _interopRequireWildcard(require("../utils/user.util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable prettier/prettier */
//create new user
var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(info) {
    var findemail, hashing, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find({
              email: info.email
            });

          case 2:
            findemail = _context.sent;

            if (!(findemail.length === 0)) {
              _context.next = 14;
              break;
            }

            _context.next = 6;
            return _bcrypt["default"].hash(info.password, 10);

          case 6:
            hashing = _context.sent;
            info.password = hashing;
            _context.next = 10;
            return _user["default"].create(info);

          case 10:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 14:
            return _context.abrupt("return", null);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}(); //Login Api


exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(info) {
    var findemail, match, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _user["default"].findOne({
              email: info.email
            });

          case 2:
            findemail = _context2.sent;

            if (!findemail) {
              _context2.next = 15;
              break;
            }

            _context2.next = 6;
            return _bcrypt["default"].compare(info.password, findemail.password);

          case 6:
            match = _context2.sent;

            if (!match) {
              _context2.next = 12;
              break;
            }

            token = utils.token(findemail);
            return _context2.abrupt("return", token);

          case 12:
            return _context2.abrupt("return", 'wrong password');

          case 13:
            _context2.next = 16;
            break;

          case 15:
            return _context2.abrupt("return", 'not register');

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;