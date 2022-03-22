const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');
const Password = require('./account');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Password"
    }]
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserByEmail = function (email, callback) {
    User.findOne({ email }, callback);
}
module.exports.addNewUser = function (newUser, callback) {
    // newUser.save(callback);

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw new Error;
            }
            newUser.password = hash;
            newUser.save(callback);
        })
    })
};
module.exports.comparePass = function (passFromUser, passFromDB, callback) {
    bcrypt.compare(passFromUser, passFromDB, (err, isMatch) => {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    })
}

module.exports.deleteUser = function (id, callback) {
    User.findByIdAndDelete(id, callback);
}
// module.exports.getAllAccounts = function (email, callback) {
//     console.log(email);
//     User.find({ email }).populate("accounts").exec(callback);
// }
