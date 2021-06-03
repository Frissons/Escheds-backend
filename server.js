const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database Connection established successfully ");
})

const bookRouter = require('./routes/appointment');
const regRouter = require('./routes/users');

app.use('/appointments', bookRouter);
app.use('/users', regRouter);


app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});