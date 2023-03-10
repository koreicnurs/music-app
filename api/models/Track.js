const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    public: false
});

TrackSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
const Track = mongoose.model('Track', TrackSchema);

module.exports = Track;