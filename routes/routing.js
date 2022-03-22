const express = require('express');
const routing = express.Router();
const Account = require('../models/account');
const User = require("../models/user")
const Image = require("../models/image")
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

routing.get('/storage', (req, res) => {
    let queryParam = req.query;
    let userId = queryParam.usrid;

    console.log(queryParam);

    if (!Object.keys(queryParam).length) {
        // Account.getAccountsByLogin((err, accounts) => {
        //     if (err) {
        //         res.json('account has not been finded');
        //     }
        //     else {
        //         res.json(accounts);
        //     }
        // });

        Account.getAllAccounts(userId, (err, accounts) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(accounts);
            }
        })
    }
    else if (queryParam.title) {
        Account.getAccountsByTitle(queryParam.title, userId, (err, account) => {
            if (err) {
                res.json(err);
            }
            else {
                res.json(account);
            }
        })
    }
    else if (queryParam.page) {
        let page = +queryParam.page;
        let limit = 6;

        new Promise((resolve, reject) => {
            Account.getAllAccounts(userId, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(Math.ceil(res.length / limit));
                }
            })
        })
            .then(
                pageMaxValue => {
                    if (page <= pageMaxValue) {
                        Account.getAccountsPerPage(userId, page, limit, (err, account) => {
                            if (err) {
                                res.json(err);
                            }
                            else {
                                res.json(account);
                            }
                        })
                    }
                    else if (pageMaxValue === 0) {
                        res.json([]);
                    }

                }
            )
            .catch(err => res.json(err));
    }
});

routing.get('/logo', (req, res) => {
    let queryParam = req.query;

    if (queryParam.title) {
        Image.getImageByTitle(queryParam.title, (err, logo) => {
            if (err) {
                res.json({ success: false, msg: err, logo: null });
            }
            else {
                res.json({ success: true, msg: "done", logo });
            }
        })
    }
    else if (queryParam.page) {
        let page = +queryParam.page;
        let limit = 12;
        console.log(page);

        new Promise((resolve, reject) => {
            Image.getAllImages((err, res) => {
                if (err) {
                    resolve({ success: false, msg: err, logo: null });
                }
                else {
                    resolve(Math.ceil(res.length / limit));
                }
            })
        })
            .then(
                pageMaxValue => {
                    if (page <= pageMaxValue) {
                        Image.getImagesPerPage(page, limit, (err, account) => {
                            if (err) {
                                res.json({ success: false, msg: err, logo: null });
                            }
                            else {
                                res.json({ success: true, msg: "done", logo: account });
                            }
                        })
                    }
                    else if (pageMaxValue === 0) {
                        res.json([]);
                    }
                }
            )
            .catch(err => res.json(err));
    }
    else {
        Image.getAllImages((err, images) => {
            if (err) {
                res.json({ success: false, msg: err, logos: null });
            }
            else {
                res.json({ success: true, msg: "done", logo: images });
            }
        })
    }
});


routing.put('/logo', (req, res) => {
    Account.updateLogo(req.body._id, req.body.src, (err, logo) => {
        if (err) {
            res.json({ success: false, msg: err, logo: null });
        }
        else {
            res.json({ success: true, msg: "successful updated", logo });
        }
    })

});


routing.delete('/storage', (req, res) => {
    let id = req.query.id;
    Account.deleteAccount(id, (err, account) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json(account);
        }
    });
});

routing.delete('/delete', (req, res) => {
    let id = req.query.id;
    console.log(id);
    User.deleteUser(id, (err, account) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            res.json({ success: true, msg: "" });
        }
    });
});

routing.put('/storage', (req, res) => {
    let newAccount = new Account({
        img: req.body.img,
        title: req.body.title,
        email: req.body.email,
        url: req.body.url,
        password: req.body.password,
        description: req.body.description,
        user_id: req.body.user_id,
    });

    Account.updateAccount(req.body._id, newAccount, (err, account) => {
        console.log(account);
        if (err) {
            res.json({ success: false, msg: 'account has not been updated' });
        } else {
            res.json(account);
        }
    });
});

routing.post('/create', (req, res) => {
    Image.getImageByTitle(req.body.img, (err, image) => {
        if (err) {
            res.json({ success: false, msg: err })
        }
        else {
            console.log(image);

            let newAccount = new Account({
                img: image ? image[0].src : Image.DEFAULT_IMAGE,
                title: req.body.title,
                email: req.body.email,
                url: req.body.url,
                password: req.body.password,
                description: req.body.description,
                owner: req.body.user_id,
            });

            Account.addNewAccount(newAccount, (err, account) => {
                if (err) {
                    res.json({ success: false, msg: err });
                }
                else {
                    res.json(account);
                }
            });
        }
    })


});

routing.post('/reg', (req, res) => {
    let newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    });

    User.getUserByEmail(newUser.email, (err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            if (user) {
                return res.json({ success: false, msg: "User with this email is registered" });
            }
            else {
                User.addNewUser(newUser, (err, usr) => {
                    if (err) {
                        res.json({ success: false, msg: err });
                    }
                    else {
                        res.json(usr);
                    }
                });
            }
        }
    })
});



routing.post('/auth', (req, res) => {
    let { email, password } = req.body;
    console.log({ email, password });

    User.getUserByEmail(email, (err, user) => {
        if (err) {
            return res.json({ success: false, err });
        }
        else {
            if (!user) {
                return res.json({ success: false, typeError: "account", msg: "account is not found" });
            }
            User.comparePass(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    const token = jwt.sign({ user }, config.secret, {
                        expiresIn: 3600 * 24
                    });

                    res.json({
                        success: true,
                        token: 'JWT' + token,
                        user: {
                            id: user._id,
                            email: user.email,
                            name: user.name,
                        }
                    })
                }
                else {
                    return res.json({ success: false, typeError: "password", msg: "password is wrong" });
                }
            })
        }
    });
});



module.exports = routing;