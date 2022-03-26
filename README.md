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
back end generate a token and send it to the front
and show landing page
token is stored in localstorage on front end


## route /api/desisconnect 
send token to the back wich is verified in a middleware
and disconnect the user



