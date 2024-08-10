require('dotenv').config()
const express = require('express');

const routes = require('./routes/api/v1/index');
const connectDB = require('./db/mongodb');
const cookieParser = require('cookie-parser')
var cors = require('cors');
// const googleLoginProvider = require('./utils/provider');
const passport = require('passport');
const { facebookLoginProvider } = require('./utils/provider');
const connectChat = require('./utils/socketIO');
const swaggerUi = require('swagger-ui-express');
YAML = require('yamljs');

const app = express();

const swaggerDocument = YAML.load('./src/api.yaml')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
connectDB();
connectChat()
// googleLoginProvider();
facebookLoginProvider()
app.use('/api/v1', routes);

app.listen(8000, () => {
    console.log("server start at port 8000.");
});

