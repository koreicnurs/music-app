const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trackId: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
    },
    datetime: {
        type: new Date(),
        required: true,
    }
});

TrackHistorySchema.plugin(idValidator, { message : 'Bad ID value for {PATH}' });
const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;