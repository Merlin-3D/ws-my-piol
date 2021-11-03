"use strict";

var config = require("../utils/auth.config");

var db = require("../models");

var User = db.user;
var Role = db.role;

var getResponse = require("../utils/standart.reponse");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

exports.signup = function (req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save(function (err, user) {
    if (err) {
      res.status(500).send(getResponse(500, err, null));
      return;
    }

    if (req.body.roles) {
      Role.find({
        name: {
          $in: req.body.roles
        }
      }, function (err, roles) {
        if (err) {
          res.status(500).send(getResponse(500, err, null));
          return;
        }

        user.roles = roles.map(function (role) {
          return role._id;
        });
        user.save(function (err) {
          if (err) {
            res.status(500).send(getResponse(500, err, null));
            return;
          }

          res.status(200).send(getResponse(200, "User was registered successfully!", null));
        });
      });
    } else {
      Role.findOne({
        name: "user"
      }, function (err, role) {
        if (err) {
          res.status(500).send(getResponse(500, err, null));
          return;
        }

        user.roles = [role._id];
        user.save(function (err) {
          if (err) {
            res.status(500).send(getResponse(500, err, null));
            return;
          }

          res.status(200).send(getResponse(200, "User was registered successfully!", null));
        });
      });
    }
  });
};

exports.signin = function (req, res) {
  User.findOne({
    email: req.body.email
  }).populate("roles", "-__v").exec(function (err, user) {
    if (err) {
      res.status(500).send(getResponse(500, err, null));
      return;
    }

    if (!user) {
      return res.status(404).send(getResponse(404, "User Not found.", null));
    }

    if (!user.active) {
      return res.status(403).send({
        message: "You account don't active please contact admin!"
      });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send(getResponse(401, "Invalid Password!", null));
    }

    var token = jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400 // 24 hours

    });
    var authorities = [];

    for (var i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }

    var data = {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    };
    res.status(200).send(getResponse(200, null, data));
  });
};