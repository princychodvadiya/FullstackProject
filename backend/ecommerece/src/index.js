const express = require('express');
const routes = require('./routes/api/v1/index');
const connectDB = require('./db/mongodb');
var cors = require('cors')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connectDB();

app.use('/api/v1', routes);

app.listen(8000, () => {
    console.log("server start at port 8000.");
});

