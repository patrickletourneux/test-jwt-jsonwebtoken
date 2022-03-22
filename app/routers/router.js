

const debug = require('debug')('router');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')

const userController = require('../controllers/userController');

router.post('/api/login',userController.loginAuthentification)

router.post('/api/signup',userController.signupAcountCreation)

router.post('/api/disconnect',verifyToken.InReqAuthorisation,userController.disconnect)

router.post('/api/posts',verifyToken.InReqAuthorisation,userController.postTest)

module.exports = router; 