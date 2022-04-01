# test jwt authentification
API nodejs / express for test 

"jsonwebtoken": "^8.5.1"

express session will not be usable with fetch on front end
need to manage authentification in an other way

i test json web token with package jsonwebtoken

bdd postgresql 

## route /api/signup
to create a user in bdd postgresql

## route /api/login
to check user / password , if ok 
back end generate a token with user information for exemple inside and expiration time and send it to the front

see usercontroller fot token generation : 
```jwt.sign({user:user},process.env.SECRETKEYJWT,{expiresIn:'200s'}....```


token is stored in window.localstorage on front side

and show landing page
token is stored in localstorage on front end


## route /api/desconnect 
send token to the back with a fetch in header.authorization see disconnnect.js
```
        const response = await fetch(
            url,{                
                method:'POST',
                headers : {
                    "Authorization": "bearer " + localStorage.getItem('token')
                }
            } 
        );

```
which is verified in a middleware verified token, see verifyToken.js
```jwt.verify(req.token, process.env.SECRETKEYJWT, (err, authData) ...```

we can decode the token to use user information for exemple, see verifyToken.js
```var decoded = jwt.decode(req.token, {
     complete: true  });
    debug(decoded.header);
    debug(decoded.payload) ```


and disconnect the user



