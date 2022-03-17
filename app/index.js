
const express = require('express');
es6Renderer = require('express-es6-template-engine');
// const cors = require('cors');
const router = require('./routers/router');

const app = express();
// require('./helpers/apiDocs')(app);

app.use(express.static('./public'));
// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

app.engine('html', es6Renderer);
app.set('views', './app/views');
app.set('view engine', 'html');


// On lève la restriction CORS pour nos amis React
// app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);


module.exports = app;
