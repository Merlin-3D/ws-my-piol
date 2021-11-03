"use strict";

var mongoose = require('mongoose');

var init = require("../utils/initial.role");

mongoose.connect("mongodb://localhost:27017/ws-mypiol", {
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