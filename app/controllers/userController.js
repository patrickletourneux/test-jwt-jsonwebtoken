
const debug = require('debug')('userController');
const User = require("../models/Users");
const validator = require("email-validator");
const bcrypt = require("bcrypt");

module.exports = {
    async login(req, res) {
        res.render('login')
    },
    async signin(req, res) {
        res.render('signin')
    },
    async landingPage(req, res) {
        res.render('landingpageneedtokenvalid')
    },
    async loginAuthentification(req, res) {
       debug(req.body)
       userFound = await User.findBy(req.body)
       console.log('userFound:', userFound)
       

    },
    async postTest(req, res) {
        res.json({
            message: "token is valid"
        });
    },


};