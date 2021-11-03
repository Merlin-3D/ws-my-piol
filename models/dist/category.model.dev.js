"use strict";

var mongoose = require('mongoose');

var category = mongoose.Schema({
  title: {
    type: 'string',
    require: true,
    unique: true
  }
});
module.exports = mongoose.model('Categorys', category);