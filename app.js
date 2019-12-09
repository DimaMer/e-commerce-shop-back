const cors = require('cors');
const express    = require('express');
require('dotenv').config({path:'./variables.env'});
const app = express();
console.log(__dirname+ '/public');
app.use(express.static(__dirname + '/public'));
// app.use (cors ({
//   origin: 'http://dent-art-studio.herokuapp.com'
// }));
app.use(cors());
// app.use(cors({
//   credentials: true,
// }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./dbconf/swagger3.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const session = require('express-session');
app.use(session({
  secret: process.env.JWTSECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 24 *60 *60 * 1000},
  httpOnly: true
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


const Router = require('./routes/index');
app.use(Router);

//Handling an errors
const {CustomError, notFoundError, dbValidationError} = require('./errors/errorHandler');
app.use(notFoundError);
app.use(dbValidationError);
app.use(CustomError);

module.exports = app;
