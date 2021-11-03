"use strict";

var db = require("../models");

var Role = db.role; //initialisation des différents roles l'ors de la création de la base de donnée

var initial = function initial() {
  Role.estimatedDocumentCount(function (err, count) {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(function (err) {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(function (err) {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(function (err) {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};

module.exports = initial;