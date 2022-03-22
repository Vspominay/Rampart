const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');
const User = require('./user');

const imageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    }
});

const Image = module.exports = mongoose.model('Image', imageSchema);

const DEFAULT_IMAGE = "../assets/img/default.png";
module.exports = { DEFAULT_IMAGE };


module.exports.getImageByTitle = function (title, callback) {
    Image.find({ title: new RegExp(title, 'i') }, callback);
};

module.exports.getAllImages = function (callback) {
    Image.find({}, callback);
};

module.exports.getImagesPerPage = function (page, limit, callback) {
    Image
        .find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(callback);
}