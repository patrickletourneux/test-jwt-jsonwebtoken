
const jwt = require('jsonwebtoken');
const debug = require('debug')('router');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')

const userController = require('../controllers/userController');

router.get('/api',(req,res)=> {
    res.json({
        message:'welcome'
    });
});


router.get('/api/login',userController.login)
router.post('/api/login',userController.loginAuthentification)

router.get('/api/signin',userController.signin)

router.get('/api/landingpage',verifyToken.InReqAuthorisation,userController.landingPage)

router.post('/api/posts',verifyToken.InReqAuthorisation,userController.postTest)

module.exports = router; 