const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');
const { config } = require('./config');

const app = express();
_conectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', apiRouter);

app.listen(config.PORT, () => {
    console.log(`App ${config.PORT} in progress`);
});

function _conectDB() {
    mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;
    connection.on('error', (error) => {
        console.log(error);
    });
}
