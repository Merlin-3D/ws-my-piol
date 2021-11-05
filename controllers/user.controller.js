const db = require("../models");
const User = db.user;
const getResponse = require("../utils/standart.reponse")
var bcrypt = require("bcryptjs");

exports.allUser = async (req, res) => {
  await User.find().then((users) => {
    res.status(200).send(getResponse(200, null, users));
  }).catch(error => res.status(500).send(getResponse(500, error, null)));

};

exports.onUser = async (req, res) => {
  await User.findById(req.userId).then((users) => {
    res.status(200).send(getResponse(200, null, users));
  }).catch(error => res.status(500).send(getResponse(500, error, null)));

};

exports.updateUser = async (req, res) => {
  await User.updateOne({ _id: req.userId }, {
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    sexe: req.body.sexe,
    birthday: req.body.birthday,
    district: req.body.district,
    city: req.body.city,
    profil: req.body.profil,
  })
    .then((user) => res.status(200).send(getResponse(200, null, user)))
    .catch(error => res.status(500).send(getResponse(500, error, null)));
};

exports.updatePassword = async (req, res) => {
  await User.updateOne({ _id: req.userId }, {
    password: bcrypt.hashSync(req.body.password, 8)
  }).then((user) => res.status(200).send(getResponse(200, `Password has been update`, null)))
    .catch(error => res.status(500).send(getResponse(500, error, null)));
}

exports.updateParamasUser = async (req, res) => {
  await User.updateOne({ _id: req.userId }, {
    lang: req.body.lang,
    notify: req.body.notify,
    position: req.body.position,
  })
    .then((user) => res.status(200).send(getResponse(200, null, user)))
    .catch(error => res.status(500).send(getResponse(500, error, null)));
};

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id },)
    .then((user) => res.status(200).send(getResponse(200, `user has been deleted`, null)))
    .catch(error => res.status(500).send(getResponse(500, error, null)));
}

exports.authoritieUser = async (req, res) => {
  await User.updateOne({ _id: req.params.id }, {
    active: req.body.active
  }).then((user) => {
    if (req.body.active) {
      res.status(200).send(getResponse(200, `user has been enabled`, ""))
    } else { }
    res.status(200).send(getResponse(200, `user has been desabled`, ""))

  })
    .catch(error => res.status(500).send(getResponse(500, error, null)));
};