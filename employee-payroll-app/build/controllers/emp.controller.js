"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEmployee = exports.newEmployee = exports.getEmployee = exports.deleteEmployee = exports.allEmployee = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
/**
 * Controller to get all Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.newEmployee = newEmployee;

var allEmployee = function allEmployee(req, res, next) {
  try {
    UserService.allEmployee(function (error, data) {
      if (data) {
        _logger["default"].info('Geting All Employee Successfully');

        res.status(_httpStatusCodes["default"].OK).json({
          code: _httpStatusCodes["default"].OK,
          message: 'Geting All Employee Successfully',
          data: data
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to get a single Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.allEmployee = allEmployee;

var getEmployee = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return UserService.getEmployee(req.params._id);

          case 3:
            data = _context.sent;

            if (data == null) {
              _logger["default"].error(' Id Not Found');

              res.status(_httpStatusCodes["default"].NOT_FOUND).json({
                code: _httpStatusCodes["default"].NOT_FOUND,
                message: ' Id Not Found'
              });
            } else {
              _logger["default"].info('Employee fetched successfully');

              res.status(_httpStatusCodes["default"].OK).json({
                code: _httpStatusCodes["default"].OK,
                message: 'Employee fetched successfully',
                data: data
              });
            }

            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getEmployee(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Controller to update a Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.getEmployee = getEmployee;

var updateEmployee = function updateEmployee(req, res, next) {
  try {
    UserService.updateEmployee(req.params._id, req.body).then(function (data) {
      _logger["default"].info('Employee updated successfully');

      res.status(_httpStatusCodes["default"].OK).json({
        code: _httpStatusCodes["default"].OK,
        message: 'Employee updated successfully',
        data: data
      });
    })["catch"](function () {
      _logger["default"].error(' Id Not Found');

      return res.status(_httpStatusCodes["default"].NOT_FOUND).json({
        code: _httpStatusCodes["default"].NOT_FOUND,
        message: ' Id Not Found'
      });
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Controller to delete a Employee
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


exports.updateEmployee = updateEmployee;

var deleteEmployee = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return UserService.deleteEmployee(req.params._id);

          case 3:
            data = _context2.sent;

            if (!(data == null)) {
              _context2.next = 7;
              break;
            }

            _logger["default"].error(' Id Not Found');

            return _context2.abrupt("return", res.status(_httpStatusCodes["default"].NOT_FOUND).json({
              code: _httpStatusCodes["default"].NOT_FOUND,
              message: ' Id Not Found'
            }));

          case 7:
            _logger["default"].info('Employee deleted successfully');

            res.status(_httpStatusCodes["default"].OK).json({
              code: _httpStatusCodes["default"].OK,
              message: 'Employee deleted successfully',
              data: data
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function deleteEmployee(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteEmployee = deleteEmployee;