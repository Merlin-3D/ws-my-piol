"use strict";

var mongoose = require("mongoose");

var User = mongoose.model("User", new mongoose.Schema({
  username: {
    type: 'string',
    require: true,
    maxLength: 20
  },
  email: {
    type: 'string',
    require: true,
    unique: true
  },
  password: {
    type: 'string',
    require: true,
    minLength: 8
  },
  profil: {
    type: 'string',
    require: false,
    "null": true
  },
  phone: {
    type: 'number',
    require: false,
    "null": true
  },
  sexe: {
    type: 'string',
    require: false,
    "null": true,
    "default": null
  },
  birthday: {
    type: 'string',
    require: false,
    "null": true,
    "default": null
  },
  district: {
    type: 'string',
    require: false,
    "null": true,
    "default": null
  },
  city: {
    type: 'string',
    require: false,
    "null": true,
    "default": null
  },
  lang: {
    type: 'string',
    require: false,
    "null": true,
    "default": null
  },
  notify: {
    type: 'boolean',
    require: false,
    "null": true,
    "default": null
  },
  position: {
    type: 'boolean',
    require: false,
    "null": true,
    "default": null
  },
  active: {
    type: 'boolean',
    require: false,
    "default": true
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  }]
}));
module.exports = User;