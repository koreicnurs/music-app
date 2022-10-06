const express = require('express');

const Artists = require("../models/Artist");
const path = require("path");
const multer = require('multer');
const config = require('../config');

const router = express.Router();
const {nanoid} = require('nanoid');
const auth = require("../middleware/auth");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Track = require("../models/Track");

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
    const {name, description, image} = req.body;

    if (!name) {
        return res.status(400).send({error: 'Something are missing'});
    }

    const artist = {
        name,
        description,
        image,
        public: false
    };

    if (req.file) {
        artist.image = "uploads/" + req.file.filename;
    } else if (!image)  {
        return res.status(400).send({error: 'Data not valid'});
    }

    const newArtist = new Artists(artist);
    await newArtist.save();

    res.send(artist);
});

router.delete('/:id', auth, async (req, res) => {

    try {
        await Artists.deleteOne({_id: req.params.id});
        res.send({message: 'artist deleted'});
    } catch (e) {
        res.sendStatus(500);
    }
});

router.put('/:id/publish', auth, async (req, res) => {

    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).send({message: 'Artist not found!'});
        }
        const publish = await Artist
            .findByIdAndUpdate(req.params.id, {public: true})

        res.send(publish);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.put('/:id/publish', auth, async (req, res) => {

    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).send({message: 'Album not found!'});
        }
        const publish = await Album
            .findByIdAndUpdate(req.params.id, {public: true})

        res.send(publish);

    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;