const express = require('express');
const router = express.Router();

const User = require("../models/User");

router.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if(!token) {
        return res.status(401).send({ error: 'No token present' });
    }

    const user = await User.findOne({ token });

    if(!user) {
        return res.status(401).send({ error: 'Wrong TOKEN' });
    }
    res.send({ userId: user._id, trackId: req.body.trackId, datetime: new Date() });
});


module.exports = router;