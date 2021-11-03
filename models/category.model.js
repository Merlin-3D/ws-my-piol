const mongoose = require('mongoose');

const category = mongoose.Schema({
    title:{type: 'string', require: true, unique: true},
})

module.exports = mongoose.model('Categorys',category)