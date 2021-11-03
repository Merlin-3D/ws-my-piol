"use strict";

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.category = require("./category.model");
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;