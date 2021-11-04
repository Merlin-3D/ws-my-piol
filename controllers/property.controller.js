const db = require("../models");
const Property = db.property;
const getResponse = require("../utils/standart.reponse")


exports.addProperty = async (req, res, next) => {
    if (req.body.pictures.length && req.body.pictures.length > 0) {
        await Property.create({
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
            verification: req.body.verification,//verification
            pictures: req.body.pictures,//photo
            long: req.body.long,//longitude
            lat: req.body.lat,

        }).then((property) =>
            res.status(201).send(getResponse(201, null, property))
        ).catch(err => {
            res.status(500).send(getResponse(500, err, null))
        })
    } else {
        res.status(500).send(getResponse(500, "you must define images for this property", null))
    }

}