const mongoose = require('mongoose');

const property = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorys' },
    type_offer: { type: 'string', require: false,default: null },//type de l'offre
    district: { type: 'string', require: false,default: null },//quartier
    city: { type: 'string', require: false,default: null },//ville
    bathroom: { type: 'number', require: false ,default: 0},//salle de bain
    superficy: { type: 'number', require: false,default: 0 },//superficie
    stage: { type: 'number', require: false,default: 0 },//etage
    garage: { type: 'number', require: false,default: 0 },//gararge
    description: { type: 'string', require: false,default: null },//description
    totalFloor: { type: 'number', require: false,default: 0 },//total d'etage
    availablity: { type: 'boolean', require: false,default: null },//disponibilité
    typeProperty: { type: 'string', require: false,default: null },//type de proprieter
    cost: { type: 'number', require: false,default: 0 },//cout
    bail: { type: 'number', require: false,default: 0 },//caution
    state: { type: 'number', require: false,default: 0 },//etat
    verification: { type: 'boolean', require: false,default: false },//verification
    views: { type: 'number', require: false,default: 0 },//vues
    pictures: { type: mongoose.Schema.Types.Array, require: true },//photo
    long: { type: mongoose.Schema.Types.Mixed, require: false,default: 0.0 },//longitude
    lat: { type: mongoose.Schema.Types.Mixed, require: false,default: 0.0 },//latitude
}, {
    timestamps: true
})

module.exports = mongoose.model('Propertys', property)