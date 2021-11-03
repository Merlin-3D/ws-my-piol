"use strict";

var db = require("../models");

var Category = db.category;

var getResponse = require("../utils/standart.reponse");

exports.allCategorys = function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Category.find().then(function (categorys) {
            return res.status(200).send(getResponse(200, null, categorys));
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

exports.addCategory = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Category.create({
            title: req.body.title
          }).then(function (category) {
            return res.status(201).send(getResponse(201, null, category));
          })["catch"](function (err) {
            if (err.keyValue) {
              res.status(500).send(getResponse(500, "The cat\xE9gory ".concat(req.body.categorie, " already exists "), null));
            } else {
              res.status(500).send(getResponse(500, err, null));
            }
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.updateCategory = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Category.updateOne({
            _id: req.params.id
          }, {
            title: req.body.title
          }).then(function () {
            return res.status(201).send(getResponse(201, "Category has been edit", null));
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