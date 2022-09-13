const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require("../models/User");


router.get('/', async (req, res) => {
    try {

    } catch {
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {username, password} = req.body;

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

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(401).send({error: 'User not found'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        res.status(401).send({error: 'Password is wrong'});
    }

    res.send({message: 'User and password correct!', user})
});

module.exports = router;