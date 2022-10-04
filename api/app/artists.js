const express = require('express');

const Artists = require("../models/Artist");
const path = require("path");
const multer = require('multer');

const router = express.Router();
const {nanoid} = require('nanoid');
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', auth, async (req, res) => {
    try {
        const artists = await Artists.find();
        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({error: 'Something are missing'});
    }

    const artist = {
        name: req.body.name,
        description: req.body.description,
        image: null
    };

    if (req.file) {
        artist.image = "uploads/" + req.file.filename;
    }

    const newArtist = new Artists(artist);
    await newArtist.save();

    res.send(artist);
});

module.exports = router;