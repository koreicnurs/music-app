const express = require('express');
const router = express.Router();

const Track = require("../models/Track");
const auth = require("../middleware/auth");
const Artists = require("../models/Artist");
const Albums = require("../models/Album");

router.get('/', auth, async (req, res) => {
    try {
        if (req.query.album) {
            const track = await Track.find({album: req.query.album})
                .sort('number')
                .populate('album', ['title']);

            res.send(track);

        } else {
            const track = await Track.find()
                .sort('number')
                .populate('album', ['title']);

            res.send(track);
        }
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {title, duration, number, album} = req.body;
    console.log(req.body);
    if (!title || !duration || !number || !album) {
        return res.status(400).send({error: 'Something are missing'});
    }

    const track = {
        album,
        number,
        title,
        duration,
        public: false
    };

    const newTrack = new Track(track);
    await newTrack.save();

    res.send(track);
});

router.delete('/:id', auth, async (req, res) => {

    try {
        await Track.deleteOne({_id: req.params.id});
        res.send({message: 'track deleted'});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.put('/:id/publish', auth, async (req, res) => {

    try {
        const artist = await Track.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({message: 'Track not found!'});
        }
        const publish = await Track
            .findByIdAndUpdate(req.params.id, {public: true})

        res.send(publish);

    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;