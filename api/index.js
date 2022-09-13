const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const artist = require('./app/artists');
const album = require('./app/albums');
const track = require('./app/tracks');
const user = require('./app/users');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/artists', artist);
app.use('/albums', album);
app.use('/tracks', track);
app.use('/users', user);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options) ;

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
        console.log('MongoDb disconnected');
    });
};

run().catch(e => console.log(e));

