# test jwt authentification
API nodejs / express pour test 

"jsonwebtoken": "^8.5.1"

express session ne fonctionnera pas si des appel fetch sont effectués en front
il faut gérer l authentification autrement

je teste le json web token avec le package jsonwebtoken


## route /api/signup
permet de creer un user en bdd postgresql

## route /api/login
verifie si user / password ok et
permet de generer un token en back et de le renvoyer au front

token stocké dans localstorage

## route /api/desisconnect 
envoie le token au back et coté back on verifie le token se deconnecter


