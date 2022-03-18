# test jwt authentification
API nodejs / express pour test 

"jsonwebtoken": "^8.5.1"

express session ne fonctionnera pas si des appel fetch sont effectués en front
il faut gérer l authentification autrement

je teste le json web token avec le package jsonwebtoken

## route /api/login
permet de generer un token en back et de le renvoyer au front

## route /api/posts
il faut ajouter le token au Header.authorization si on veut avoir le message "token valid" 
sinon token invalid le middleware de checkToken nous redirige sur la page de login

## route /api/landingpage
il faut ajouter le token au Header.authorization si on veut acceder a la page 
sinon token invalid le middleware de checkToken nous redirige sur la page de login
