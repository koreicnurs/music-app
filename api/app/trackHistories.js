const express = require('express');
const router = express.Router();

const User = require("../models/User");
const Track = require("../models/Track");
const TrackHistory = require("../models/TrackHistory");
const auth = require("../middleware/auth");

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
    const a = {
        trackId: req.body.trackId,
        userId: user._id,
        datetime: new Date().toISOString()
    }
    const q = new TrackHistory(a);
    await q.save();

    res.send(q);
});

router.get('/', auth, async (req, res) => {
    const track = await TrackHistory.find()
        .populate('trackId', ['title']);

    res.send(track);
});

module.exports = router;