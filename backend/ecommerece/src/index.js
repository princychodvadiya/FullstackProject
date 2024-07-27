
const express = require('express');
const routes = require('./routes/api/v1/index');
const connectDB = require('./db/mongodb');
const cookieParser = require('cookie-parser')
var cors = require('cors');
// const googleLoginProvider = require('./utils/provider');
const passport = require('passport');
const { facebookLoginProvider } = require('./utils/provider');

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
connectDB();
// googleLoginProvider();
facebookLoginProvider()
app.use('/api/v1', routes);

app.listen(8000, () => {
    console.log("server start at port 8000.");
});

