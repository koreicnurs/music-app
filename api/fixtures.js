const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Track = require("./models/Track");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [firstUser, secondUser, thirdUser] = await User.create({
        username: 'first',
        password: '123',
        token: nanoid(),
        displayName: 'first name',
        phone: '+996 123123'
    }, {
        username: 'second',
        password: '123',
        token: nanoid(),
        displayName: 'second name',
        phone: '+996 234234'
    }, {
        username: 'third',
        password: '123',
        token: nanoid(),
        displayName: 'third name',
        phone: '+996 555555'
    });

    const [eminem, imagineDragons] = await Artist.create({
        name: 'Eminem',
        image: 'fixtures/eminem.jpg',
        description: 'Eminem, byname of Marshall Bruce Mathers III, (born October 17, 1972, St. Joseph, Missouri, U.S.), American rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century. Mathers had a turbulent childhood, marked by poverty and allegations of abuse'
    }, {
        name: 'Imagine Dragons',
        image: 'fixtures/ID.jpg',
        description: "Imagine Dragons' musical style has mainly been described as pop rock, electropop, pop, indie pop, indie rock, arena rock, and alternative rock. Their music also contains influences from synth-pop, dance-pop, trip hop, folk, drum and bass, dubstep, industrial, EDM, R&B, and hip hop."
    });

    const [IDHIT, TES] = await Album.create({
        title: 'Hitlist: The Greatest of Imagine Dragons',
        artist: imagineDragons._id,
        date: 2018,
        image: 'fixtures/AID.jpg',
    }, {
        title: 'The Eminem Show',
        artist: eminem._id,
        date: 2002,
        image: 'fixtures/AE.jpg',
    });

    await Track.create({
        title: 'White American',
        album: TES._id,
        number: 1,
        duration: '5:25',
    }, {
        title: "My dad's gone crazy",
        album: TES._id,
        number: 2,
        duration: '4:27',
    }, {
        title: "Superman",
        album: TES._id,
        number: 3,
        duration: '5:50',
    }, {
        title: "When the music stops",
        album: TES._id,
        number: 4,
        duration: '4:29',
    }, {
        title: "Say what you say",
        album: TES._id,
        number: 5,
        duration: '5:10',
    }, {
        title: 'Machine',
        album: IDHIT._id,
        number: 1,
        duration: '3:02',
    }, {
        title: "Battle Cry",
        album: IDHIT._id,
        number: 2,
        duration: '4:34',
    }, {
        title: "Radioactive",
        album: IDHIT._id,
        number: 3,
        duration: '3:07',
    }, {
        title: "Warriors",
        album: IDHIT._id,
        number: 4,
        duration: '4:29',
    }, {
        title: "Thunder",
        album: IDHIT._id,
        number: 5,
        duration: '5:10',
    }, );

    await mongoose.connection.close();
};

run().catch(console.error);