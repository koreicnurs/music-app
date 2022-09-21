const express = require('express');
const router = express.Router();

const User = require("../models/User");

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
        user.generateToken();
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

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
        res.status(401).send({error: 'Password is wrong'});
    }

    user.generateToken();
    await user.save();
    res.send({message: 'User and password correct!', user})
});

router.get('/secret', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong TOKEN'});
    }

    res.send({message: 'Secret message', username: user.username})
});

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.send(user);
    } catch {
        res.sendStatus(500);
    }
});


module.exports = router;