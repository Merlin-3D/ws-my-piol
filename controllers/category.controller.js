const db = require("../models");
const Category = db.category;
const getResponse = require("../utils/standart.reponse")


exports.allCategorys = async (req, res, next) => {
        await Category.find()
            .then(categorys =>  res.status(200).send(getResponse(200, null, categorys)))
            .catch(error => res.status(500).send(getResponse(500, error, null)));
}

exports.addCategory = async (req, res, next) => {
        await Category.create({ title: req.body.title }).then((category) =>
        res.status(201).send(getResponse(201, null, category))
        ).catch(err => {
            if (err.keyValue) {
                res.status(500).send(getResponse(500, `The catégory ${req.body.categorie} already exists `, null))
            } else {
                res.status(500).send(getResponse(500, err, null))
            }
        })
}

exports.updateCategory = async (req, res) => {
        await Category.updateOne({ _id: req.params.id }, { title: req.body.title })
            .then(() => res.status(201).send(getResponse(201, "Category has been edit", null)))
            .catch(error => res.status(500).send(getResponse(500, error, null)));
}