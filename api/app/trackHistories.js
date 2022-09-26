const express = require('express');
const router = express.Router();

const User = require("../models/User");
const Track = require("../models/Track");
const Artists = require("../models/Artist");
const TrackHistory = require("../models/TrackHistory");

router.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if(!token) {
        return res.status(401).send({ error: 'No token present' });
    }

    const user = await User.findOne({ token });

    if(!user) {
        return res.status(401).send({ error: 'Wrong TOKEN' });
    }

    const {trackId} = req.body;

    if (!trackId) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const track = await Track.findOne({_id: req.body.trackId})

    if(!track) {
        return res.status(404).send({ error: 'track not found' });
    }

    res.send({ userId: user._id, trackId: req.body.trackId, datetime: new Date().toISOString() });
});

router.get('/', async (req, res) => {
    const token = req.get('Authorization');

    if(!token) {
        return res.status(401).send({ error: 'No token present' });
    }

    const user = await User.findOne({ token });

    if(!user) {
        return res.status(401).send({ error: 'Wrong TOKEN' });
    }

    const {trackId} = req.body;

    if (!trackId) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const track = await Track
        .findOne({_id: req.body.trackId})
        .populate('track', ['title']);

    if(!track) {
        return res.status(404).send({ error: 'track not found' });
    }

    res.send(track);
});


module.exports = router;