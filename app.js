const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');

const app = express();
_conectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', apiRouter);

app.listen(5000, () => {
    console.log('App 5000 in progress');
});

function _conectDB() {
    mongoose.connect('mongodb://localhost:27017/OWU', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;
    connection.on('error', (error) => {
        console.log(error);
    });
}
