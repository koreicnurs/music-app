const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema ({
    name: {
        type: String,
        require: true,
    },
    image: String,
    description: String,
    public: false
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;