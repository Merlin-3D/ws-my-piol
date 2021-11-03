const config = require("../utils/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const getResponse = require("../utils/standart.reponse")

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send(getResponse(500,err,null ));
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send(getResponse(500,err,null ));
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send(getResponse(500,err,null ));
              return;
            }

            res.status(200).send(getResponse(200,"User was registered successfully!",null ));
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send(getResponse(500,err,null ));
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
          res.status(500).send(getResponse(500,err,null ));

            return;
          }

          res.status(200).send(getResponse(200,"User was registered successfully!",null ));
        
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send(getResponse(500,err,null ));
        return;
      }

      if (!user) {
        return res.status(404).send(getResponse(404,"User Not found.",null ));
      }

      if (!user.active) {
       return res.status(403).send({ message: "You account don't active please contact admin!" });
        
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return  res.status(401).send(getResponse(401,"Invalid Password!",null ));
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      const data={
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      }
      res.status(200).send(getResponse(200,null,data ));
    });
};