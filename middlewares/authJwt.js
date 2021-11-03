const jwt = require("jsonwebtoken");
const config = require("../utils/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const getResponse = require("../utils/standart.reponse")

verifyToken = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(500).send(getResponse(500,"token is not generated!",null ));;
    
  }
  let token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send(getResponse(403,"No token provided!",null ));
    
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {

      res.status(401).send(getResponse(401,"Unauthorized",null ));
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send(getResponse(500,err,null ))
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send(getResponse(500,err,null ))
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send(getResponse(403,"Require Admin Role!",null ));
      
        return;
      }
    );
  });
};

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send(getResponse(500,err,null ));
      return;
    }
  
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send(getResponse(500,err,null ));
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }else if(roles[i].name === "admin"){
            next();
            return;
          }
        }
        res.status(403).send(getResponse(403,"Require Moderator Role!",null ));
        return;
      }
    );
  });
};



const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;