const express = require('express');

const Albums = require("../models/Album");
const path = require("path");
const multer = require('multer');

const router = express.Router();
const {nanoid} = require('nanoid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        if (req.query.artist) {
            const album = await Albums.find({artist: req.query.artist})
                .populate('artist', ['name', 'description'])
                .sort('date');
            res.send(album);
        } else {
            const album = await Albums.find()
                .populate('artist', ['name', 'description'])
                .sort('date');
            res.send(album);
        }
    } catch {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const album = await Albums.findById(req.params.id)
            .populate('artist', ['name', 'description']);

        if (!album) {
            res.status(404).send({message: 'Albums not found!'});
        }

        res.send(album);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const {title, artist, date, image} = req.body;

    if (!title || !date || !artist) {
        return res.status(400).send({error: 'Data not valid'});
    }

    const albumData = {
        title,
        artist,
        date,
        image: null,
    };

    if (req.file) {
        albumData.image = "uploads/" + req.file.filename;
    }

    try {
        const album = new Albums(albumData);
        await album.save();

        res.send(album);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});

module.exports = router;