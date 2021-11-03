"use strict";

var db = require("../models");

var ROLES = db.ROLES;
var User = db.user;

var getResponse = require("../utils/standart.reponse");

checkDuplicateUsernameOrEmail = function checkDuplicateUsernameOrEmail(req, res, next) {
  // Username
  User.findOne({
    username: req.body.username
  }).exec(function (err, user) {
    if (err) {
      res.status(500).send(getResponse(500, err, null));
      return;
    }

    if (user) {
      res.status(400).send(getResponse(400, "Failed! Username ".concat(req.body.username, " is already in use!"), null));
      return;
    } // Email


    User.findOne({
      email: req.body.email
    }).exec(function (err, user) {
      if (err) {
        res.status(500).send(getResponse(500, err, null));
        return;
      }

      if (user) {
        res.status(400).send(getResponse(400, "Failed! Email ".concat(req.body.email, " is already in use!"), null));
        return;
      }

      next();
    });
  });
};

checkRolesExisted = function checkRolesExisted(req, res, next) {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send(getResponse(400, "Failed! Role ".concat(req.body.roles[i], " does not exist!"), null));
        return;
      }
    }
  }

  next();
};

var verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;