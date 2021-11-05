"use strict";

var db = require("../models");

var Property = db.property;

var getResponse = require("../utils/standart.reponse");

exports.addProperty = function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.body.pictures.length && req.body.pictures.length > 0)) {
            _context.next = 5;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Property.create({
            user: req.userId,
            category: req.body.category,
            type_offer: req.body.type_offer,
            //type de l'offre
            district: req.body.district,
            //quartier
            city: req.body.city,
            //ville
            bathroom: req.body.bathroom,
            //salle de bain
            superficy: req.body.superficy,
            //superficie
            stage: req.body.stage,
            //etage
            garage: req.body.garage,
            //gararge
            description: req.body.description,
            //description
            totalFloor: req.body.totalFloor,
            //total d'etage
            availablity: req.body.availablity,
            //disponibilité
            typeProperty: req.body.typeProperty,
            //type de proprieter
            cost: req.body.cost,
            //cout
            bail: req.body.bail,
            //caution
            state: req.body.state,
            //etat
            price: req.body.price,
            //prix
            verification: req.body.verification,
            //verification
            pictures: req.body.pictures,
            //photo
            "long": req.body["long"],
            //longitude
            lat: req.body.lat
          }).then(function (property) {
            return res.status(201).send(getResponse(201, null, property));
          })["catch"](function (err) {
            res.status(500).send(getResponse(500, err, null));
          }));

        case 3:
          _context.next = 6;
          break;

        case 5:
          res.status(500).send(getResponse(500, "you must define images for this property", null));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.allPropertys = function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          per_page = parseInt(req.params.per_page) || 10;
          page_no = parseInt(req.params.page_no) || 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Property.find({
            skip: per_page * (page_no - 1),
            limit: per_page
          }).populate(['category', 'user']).then(function (propertys) {
            if (propertys.length > 0) {
              res.status(200).send(getResponse(200, null, propertys));
            } else {
              res.status(404).send(getResponse(404, "No content on propertys", null));
            }
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getFromCategory = function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.params.id) {
            _context3.next = 5;
            break;
          }

          per_page = parseInt(req.query.per_page) || 10;
          page_no = parseInt(req.query.page_no) || 1;
          _context3.next = 5;
          return regeneratorRuntime.awrap(Property.find({
            category: req.params.id
          }, {
            skip: per_page * (page_no - 1),
            limit: per_page
          }).populate(['category', 'user']).then(function (propertys) {
            if (propertys.length > 0) {
              res.status(200).send(getResponse(200, null, propertys));
            } else {
              res.status(404).send(getResponse(404, "No content for this category", null));
            }
          })["catch"](function (err) {
            res.status(500).send(getResponse(500, err, null));
          }));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getFromUser = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Property.find({
            user: req.params.id
          }).populate(['category', 'user']).then(function (propertys) {
            if (propertys.length > 0) {
              res.status(200).send(getResponse(200, null, propertys));
            } else {
              res.status(404).send(getResponse(404, "No content for this user", null));
            }
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteProperty = function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Property.deleteOne({
            _id: req.params.id
          }).then(function (user) {
            return res.status(200).send(getResponse(200, "propertys has been deleted", null));
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

exports.updateOneProperty = function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Property.updateOne({
            _id: req.userId
          }, {
            category: req.body.category,
            type_offer: req.body.type_offer,
            //type de l'offre
            district: req.body.district,
            //quartier
            city: req.body.city,
            //ville
            bathroom: req.body.bathroom,
            //salle de bain
            superficy: req.body.superficy,
            //superficie
            stage: req.body.stage,
            //etage
            garage: req.body.garage,
            //gararge
            description: req.body.description,
            //description
            totalFloor: req.body.totalFloor,
            //total d'etage
            availablity: req.body.availablity,
            //disponibilité
            typeProperty: req.body.typeProperty,
            //type de proprieter
            cost: req.body.cost,
            //cout
            bail: req.body.bail,
            //caution
            state: req.body.state,
            //etat
            price: req.body.price //prix

          }).then(function () {
            return res.status(201).send(getResponse(201, "Property has been update", null));
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