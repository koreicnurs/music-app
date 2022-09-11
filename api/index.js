const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const artist = require('./app/artist');
const album = require('./app/album');
const config = require('./config')

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/artists', artist);
app.use('/albums', album);

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

