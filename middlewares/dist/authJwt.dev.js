"use strict";

var jwt = require("jsonwebtoken");

var config = require("../utils/auth.config.js");

var db = require("../models");

var User = db.user;
var Role = db.role;

var getResponse = require("../utils/standart.reponse");

verifyToken = function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(500).send(getResponse(500, "token is not generated!", null));
    ;
  }

  var token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send(getResponse(403, "No token provided!", null));
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      res.status(401).send(getResponse(401, "Unauthorized", null));
    }

    req.userId = decoded.id;
    next();
  });
};

isAdmin = function isAdmin(req, res, next) {
  User.findById(req.userId).exec(function (err, user) {
    if (err) {
      res.status(500).send(getResponse(500, err, null));
      return;
    }

    Role.find({
      _id: {
        $in: user.roles
      }
    }, function (err, roles) {
      if (err) {
        res.status(500).send(getResponse(500, err, null));
        return;
      }

      for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send(getResponse(403, "Require Admin Role!", null));
      return;
    });
  });
};

isModerator = function isModerator(req, res, next) {
  User.findById(req.userId).exec(function (err, user) {
    if (err) {
      res.status(500).send(getResponse(500, err, null));
      return;
    }

    Role.find({
      _id: {
        $in: user.roles
      }
    }, function (err, roles) {
      if (err) {
        res.status(500).send(getResponse(500, err, null));
        return;
      }

      for (var i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        } else if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send(getResponse(403, "Require Moderator Role!", null));
      return;
    });
  });
};

var authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator
};
module.exports = authJwt;