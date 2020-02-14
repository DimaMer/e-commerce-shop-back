const cors = require('cors');
const express    = require('express');
require('dotenv').config({path:'./variables.env'});
const app = express();
console.log(__dirname+ '/public');
app.use(express.static(__dirname + '/public'));
// app.use (cors ({
//   origin: 'http://localhost:3000'
// }));

// const cors = require('cors');
const whitelist = [/inary\.com$/,'http://64.225.110.254','http://64.225.110.254:7000','http://sub.linprog.com','https://cloudinary.com','http://e-commerce-front.herokuapp.com','http://localhost:7000','http://localhost:3000',/.ngrok\.com$/, 'http://2b606649.ngrok.io', 'https://e-commerce-shop-back.herokuapp.com','https://e-commerce-shop-back.herokuapp.com/api/user/login']

const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
// app.use(cors({
//    credentials: true,
//   // origin: 'http://localhost:3000'
//  }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const graphqlHTTP = require('express-graphql')
const schema = require('./dbconf/schema.js')
app.use('/graphql',  graphqlHTTP({
  schema: schema,
  graphiql: true
}))





const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./dbconf/swagger3.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const session = require('express-session');

app.use(session({
  secret: process.env.JWTSECRET,
  resave: false,
  saveUninitialized: true,
    sameSite: 'strict',
    secure: true,
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
