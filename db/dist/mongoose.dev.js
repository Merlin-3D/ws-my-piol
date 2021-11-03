"use strict";

var mongoose = require('mongoose');

var init = require("../utils/initial.role");

var uri = require("../utils/db.config");

mongoose.connect(uri.ONLINE_DEV, {
  //useCreatendex: true, 
  //useFindAndModify: false, 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('Connexion à MongoDB réussie !');
  init();
})["catch"](function (err) {
  return console.log("".concat(err));
});