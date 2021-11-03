const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const getResponse = require("../utils/standart.reponse")

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send(getResponse(500,err,null ));
      return;
    }

    if (user) {

      res.status(400).send(getResponse(400,`Failed! Username ${req.body.username} is already in use!`,null ));
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send(getResponse(500,err,null ));
        return;
      }

      if (user) {
        res.status(400).send(getResponse(400,`Failed! Email ${req.body.email} is already in use!`,null ));

        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send(getResponse(400,`Failed! Role ${req.body.roles[i]} does not exist!`,null ));
        return;
      }
    }
  }

  next();
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;