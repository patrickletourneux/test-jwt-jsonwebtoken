const debug = require('debug')('userController');
const jwt = require('jsonwebtoken');
const User = require("../models/Users");
const path= require('path')
const validator = require("email-validator");
const bcrypt = require("bcrypt");



module.exports = {
    // async login(req, res) {
    //     res.render('login');
    // },
    // async signup(req, res) {
    //     res.render('signup');
    //     debug('afer render signup');
    // },
    // async landingPage(req, res) {
    //     debug('landingpage');
    //     debug('req.token:', req.token);
    //     res.render('landingpage');
    //     // res.sendFile(path.join( __dirname, "../../public/views/landingpage.html"));
    //     debug('afer render landingpage')
    // },
    async loginAuthentification(req, res) {
        // debug(req.body)
        const form = req.body;
        usersFounds = await User.findBy({
            email: req.body.email
        });
        const user = usersFounds[0]
        // console.log('userFound:', user)
        if (user) {
            // si oui je compare les mdp
            if (await bcrypt.compare(form.password, user.password)) {
                debug('user et password ok')
                jwt.sign({user:user},process.env.SECRETKEYJWT,{expiresIn:'200s'} , (err,token)=>{
                    debug('token generation')
                    res.json({
                        token:token
                    });
            
                });

            } else {
                // sinon je lui envoie un message d'erreur
                debug('password nok')
                res.status(400).json("il y a une erreur dans le couple login/mot de passe")
                
            }
        } else {
            // sinon j'envoie un message d'erreur
            debug('user nok')
            res.status(400).json("il y a une erreur dans le couple login/mot de passe")
        }
    },
    async signupAcountCreation(req, res) {
        debug('signupAcountCreation')
        debug(req.body)
        const form = req.body;
        // vérifier qu'un compte n'existe pas avec l'adresse mail fournie
        const users = await User.findBy({
            email: form.email
        });
        const user = users[0]
        debug(user)
        if (!user) {
            debug('user non existant')
            // si c'est bon alors j'enregistre
            // je checke les champs pour voir s'ils sont conformes
            // le mail est il bien un mail ?
            if (validator.validate(form.email)) {
                debug('email ok')
                // le mot de passe est-il identique à celui de confirmation
                if (form.password == form.passwordConfirm) {
                    debug('password ok')
                    // on hashe le mot de passe - le 10 correspond au nombre de fois où le mot de passe sera haché
                    const passwordHashed = await bcrypt.hash(form.password, 10);
                    // on enregistre tout en BDD
                    const newUser = new User({
                        firstname: form.firstname,
                        lastname: form.lastname,
                        email: form.email,
                        password: passwordHashed
                    });
                    delete newUser.id;
                    debug('newUsertosave', newUser)
                    const userSaved = await newUser.save();
                    debug('userSaved', userSaved)
                    res.status(200).json('userSaved');
                } else {
                    res.status(400).json("il y a une erreur de password")
                }
            } else {
                res.status(400).json("il y a une d email ")
            }
        } else {
            res.status(400).json("erreur user deja existant ")
        }
    },

    async postTest(req, res) {
        res.json({
            message: "token is valid"
        });
    },


};