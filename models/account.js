const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');
const User = require('./user');

const accountSchema = mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    url: String,
    password: {
        type: String,
        required: true
    },
    description: String,
    user_id: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

// const accountSchema = mongoose.Schema({
//     img: {
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     url: String,
//     password: {
//         type: String,
//         required: true
//     },
//     description: String,
//     user_id: Number,

// });

const Password = module.exports = mongoose.model('Password', accountSchema);

module.exports.getAccountsByLogin = function (callback) {
    Password.find({}, callback);
};

module.exports.getAccountById = function (id, callback) {
    Password.findById(id, callback);
};

module.exports.getAccountsByTitle = function (title, userId, callback) {
    console.log(userId);
    Password.find({
        "title":
            new RegExp(title, 'i'),
        "owner": userId
    }, callback);
};

module.exports.updateAccount = function (id, newinformation, callback) {
    const updatedAccount = {
        img: newinformation.img,
        title: newinformation.title,
        email: newinformation.email,
        url: newinformation.url,
        password: newinformation.password,
        description: newinformation.description,
        user_id: newinformation.user_id,
    }

    Password.findByIdAndUpdate(id, updatedAccount, { new: true }, callback);
}

module.exports.updateLogo = function (id, newLogo, callback) {
    Password.findByIdAndUpdate(id, { img: newLogo }, { new: true }, callback);
}

module.exports.deleteAccount = function (id, callback) {
    Password.findByIdAndDelete(id, callback);
};

module.exports.addNewAccount = function (newAccount, callback) {
    newAccount.save(callback);

    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(newAccount.password, salt, (err, hash) => {
    //         if (err) {
    //             throw new Error;
    //         }
    //         newAccount.password = hash;
    //     })
    // })
};

module.exports.getAccountsPerPage = function (userId, page, limit, callback) {
    Password
        .find({ owner: userId })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(callback);
}

module.exports.getAllAccounts = function (userId, callback) {
    Password.find({ owner: userId }, callback);
}