const db = require("../models");
const Property = db.property;
const getResponse = require("../utils/standart.reponse")
const upload = require("../utils/upload.file")

exports.addProperty = async (req, res, next) => {

    upload.uploadMultiple(req, res).then((data) => {

        Property.create({
            user: req.userId,
            category: req.body.category,
            type_offer: req.body.type_offer,//type de l'offre
            district: req.body.district,//quartier
            city: req.body.city,//ville
            bathroom: req.body.bathroom,//salle de bain
            superficy: req.body.superficy,//superficie
            stage: req.body.stage,//etage
            garage: req.body.garage,//gararge
            description: req.body.description,//description
            totalFloor: req.body.totalFloor,//total d'etage
            availablity: req.body.availablity,//disponibilité
            typeProperty: req.body.typeProperty,//type de proprieter
            cost: req.body.cost,//cout
            bail: req.body.bail,//caution
            state: req.body.state,//etat
            price: req.body.price,//prix
            verification: req.body.verification,//verification
            pictures: data,//photo
            long: req.body.long,//longitude
            lat: req.body.lat,

        }).then((property) =>
            res.status(201).send(getResponse(201, null, property))
        ).catch(err => {
            res.status(500).send(getResponse(500, err, null))
        })
    })


}
exports.allPropertys = async (req, res, next) => {
    page = parseInt(req.query.page) || 10
    size = parseInt(req.query.size) || 1
    sort = { 'createdAt': -1 };
    // skip: per_page * (page_no - 1), limit: per_page
    await Property.find({ skip: size * (page - 1), limit: size }, { sort: sort }).populate(['category', 'user']).then((propertys) => {
        if (propertys.length > 0) {
            res.status(200).send(getResponse(200, null, propertys))
        } else {
            res.status(404).send(getResponse(404, "No content on propertys", null))
        }
    })
}

exports.getFromCategory = async (req, res, next) => {
    try {
        if (req.params.id) {

            page = parseInt(req.query.page) || 10
            size = parseInt(req.query.size) || 0
            sort = { 'createdAt': -1 };
            await Property.find({ category: req.params.id }, { skip: size * (page - 1), limit: size }, { sort: sort }).populate(['category', 'user']).then((propertys) => {
                if (propertys.length > 0) {
                    res.status(200).send(getResponse(200, null, propertys))
                } else {
                    res.status(404).send(getResponse(404, "No content for this category", null))
                }
            }).catch(err => {
                res.status(500).send(getResponse(500, err, null))
            })
        }
    } catch (err) {
        res.status(500).send(getResponse(500, err, null))
    }

}

exports.getFromUser = async (req, res) => {
    await Property.find({ user: req.params.id }).populate(['category', 'user']).then((propertys) => {
        if (propertys.length > 0) {
            res.status(200).send(getResponse(200, null, propertys))
        } else {
            res.status(404).send(getResponse(404, "No content for this user", null))
        }
    })
}

exports.deleteProperty = async (req, res) => {
    await Property.deleteOne({ _id: req.params.id },)
        .then((user) => res.status(200).send(getResponse(200, `propertys has been deleted`, null)))
        .catch(error => res.status(500).send(getResponse(500, error, null)));
}

exports.updateOneProperty = async (req, res) => {
    await Property.updateOne({ _id: req.userId }, {
        category: req.body.category,
        type_offer: req.body.type_offer,//type de l'offre
        district: req.body.district,//quartier
        city: req.body.city,//ville
        bathroom: req.body.bathroom,//salle de bain
        superficy: req.body.superficy,//superficie
        stage: req.body.stage,//etage
        garage: req.body.garage,//gararge
        description: req.body.description,//description
        totalFloor: req.body.totalFloor,//total d'etage
        availablity: req.body.availablity,//disponibilité
        typeProperty: req.body.typeProperty,//type de proprieter
        cost: req.body.cost,//cout
        bail: req.body.bail,//caution
        state: req.body.state,//etat
        price: req.body.price,//prix
    }).then(() => res.status(201).send(getResponse(201, "Property has been update", null)))
        .catch(error => res.status(500).send(getResponse(500, error, null)));
}

exports.betweenTwoPrice = async (req, res) => {
    gt = parseInt(req.query.gt) || 0
    lt = parseInt(req.query.lt) || 0

    await Property.find({ category: req.params.id, price: { $gt: gt, $lt: lt } }).populate(populate(['category', 'user']))
        .then((propertys) => {
            if (propertys.length > 0) {
                res.status(201).send(getResponse(200, null, propertys))
            } else {
                res.status(404).send(getResponse(404, "Not propertys with this price", null))
            }
        })
        .catch(error => res.status(500).send(getResponse(500, error, null)));
}

exports.changeAvailability = async (req, res) => {

    await Property.updateOne({ _id: req.params.id }, {
        availablity: req.params.value,//etage
    }).then(() => {
        if (req.params.value) {
            res.status(201).send(getResponse(201, "the property is available", null))
        } else {
            res.status(201).send(getResponse(404, "the property is not available", null))
        }
    })
        .catch(error => res.status(500).send(getResponse(500, error, null)));
}