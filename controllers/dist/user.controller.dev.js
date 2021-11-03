"use strict";

var db = require("../models");

var User = db.user;

var getResponse = require("../utils/standart.reponse");

exports.allUser = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find().then(function (users) {
            res.status(200).send(getResponse(200, null, users));
          })["catch"](function (error) {
            return res.status(500).send(getResponse(500, error, null));
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.onUser = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findById(req.userId).then(function (users) {
            res.status(200).send(getResponse(200, null, users));
          })["catch"](function (error) {
            return res.status(500).send(getResponse(500, error, null));
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.updateUser = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(User.updateOne({
            _id: req.userId
          }, {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            sexe: req.body.sexe,
            birthday: req.body.birthday,
            district: req.body.district,
            city: req.body.city
          }).then(function (user) {
            return res.status(200).send(getResponse(200, null, user));
          })["catch"](function (error) {
            return res.status(500).send(getResponse(500, error, null));
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updateParamasUser = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(User.updateOne({
            _id: req.userId
          }, {
            lang: req.body.lang,
            notify: req.body.notify,
            position: req.body.position
          }).then(function (user) {
            return res.status(200).send(getResponse(200, null, user));
          })["catch"](function (error) {
            return res.status(500).send(getResponse(500, error, null));
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteUser = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(User.deleteOne({
            _id: req.params.id
          }).then(function (user) {
            return res.status(200).send(getResponse(200, "user has been deleted", null));
          })["catch"](function (error) {
            return res.status(500).send(getResponse(500, error, null));
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.authoritieUser = function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(User.updateOne({
            _id: req.params.id
          }, {
            active: req.body.active
          }).then(function (user) {
            if (req.body.active) {
              res.status(200).send(getResponse(200, "user has been enabled", ""));
            } else {}

            res.status(200).send(getResponse(200, "user has been desabled", ""));
          })["catch"](function (error) {
            return res.status(500).send(getResponse(500, error, null));
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
};