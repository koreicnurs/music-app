const express = require('express');
const router = express.Router();

const Track = require("../models/Track");


router.get('/', async (req, res) => {
    try {
        if (req.query.album) {
            const track = await Track.find({album: req.query.album});
            res.send(track);
        } else {
            const track = await Track.find();
            res.send(track);
        }
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {title, album, duration, number} = req.body;

    if (!title || !album || !duration || !number) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const trackData = {
        title,
        album,
        duration,
        number,
    };

    try {
        const track = new Track(trackData);
        await track.save();

        res.send(track);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;