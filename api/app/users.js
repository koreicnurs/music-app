const express = require('express');
const router = express.Router();

const User = require("../models/User");


router.get('/', async (req, res) => {
    try {

    } catch {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const userData = {
        username,
        password
    };

    try {
        const user = new User(userData);
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;