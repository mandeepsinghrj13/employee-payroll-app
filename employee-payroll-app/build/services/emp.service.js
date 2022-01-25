"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEmployee = exports.newEmployee = exports.getEmployee = exports.deleteEmployee = exports.allEmployee = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
}; //update single user


exports.getEmployee = getEmployee;

var updateEmployee = function updateEmployee(_id, body) {
  return new Promise(function (resolve, reject) {
    _emp["default"].findByIdAndUpdate({
      _id: _id
    }, body, {
      "new": true
    }).then(function (data) {
      return resolve(data);
    })["catch"](function (error) {
      return reject(error);
    });
  });
}; //delete single user


exports.updateEmployee = updateEmployee;

var deleteEmployee = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _emp["default"].findByIdAndDelete(id);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function deleteEmployee(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.deleteEmployee = deleteEmployee;