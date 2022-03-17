
const jwt = require('jsonwebtoken');
const debug = require('debug')('router');
const express = require('express');
const router = express.Router();

router.get('/api',(req,res)=> {
    res.json({
        message:'welcome'
    });
});

router.post('/api/posts',verifyToken,(req,res)=> {
    // token is received in req.token after verifyToken traitement
    debug('req.token:', req.token)
    jwt.verify(req.token,process.env.SECRETKEYJWT,(err,authData)=> {
        if(err){
            debug('token is not valid')
            res.sendStatus(403)
        }else{
            debug('token is valid')
            res.json({
                message:"post created...",
                authData
            });
        }
    });
});
router.get('/api/login',(req,res)=> {
    res.render('login')
})

router.get('/api/signin',(req,res)=> {
    res.render('signin')
})

router.post('/api/login',(req,res)=> {
    console.log('login:')
    // route to check if the user exist in bdd
    // mock user a envoyer par le front, on renvoie un token qui sera stocké 
    //coté front et renvoyé dans le req.header a chaque requete
    const user = {
        id:1,
        username :'toto',
        email:'toto@gmail.com'
    }
    // jwt.sign generate a token and send it to the front with option like time to expire
    // this token will be store in front in local storage and send with each request in header.Authorisation
    jwt.sign({user:user},process.env.SECRETKEYJWT,{expiresIn:'200s'} , (err,token)=>{
        debug('token generation')
        res.json({
            token:token
        });

    });
})


function verifyToken(req,res,next){
    console.log('verifyToken:')
    const bearerHeader = req.headers['authorization'];
    console.log('bearerHeader:', bearerHeader)
    if(typeof bearerHeader!== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else {
        debug('no token received in backend')
        res.sendStatus(403);
    }
}

module.exports = router; 