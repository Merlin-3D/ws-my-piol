"use strict";

var mongoose = require('mongoose');

var init = require("../utils/initial.role");

mongoose.connect("mongodb+srv://ws-my-piol:merlin3d@cluster0.v8qsv.mongodb.net/my-piol-db-prod?retryWrites=true&w=majority", {
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