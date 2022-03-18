const debug = require('debug')('verifyToken');
const jwt = require('jsonwebtoken');


module.exports = {
    InReqAuthorisation(req, res, next) {
        console.log('verifyToken:')
        const bearerHeader = req.headers['authorization'];
        console.log('bearerHeader:', bearerHeader)
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            debug('req.token:', req.token)
            jwt.verify(req.token, process.env.SECRETKEYJWT, (err, authData) => {
                if (err) {
                    debug('token is not valid')
                    res.render('login');
                } else {
                    debug('token is valid')
                    next();
                }
            })
        } else {
            debug('no token received in backend')
            res.render('login');
        }
    }
}