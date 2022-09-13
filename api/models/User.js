const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// UserSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
const User = mongoose.model('User', UserSchema);

module.exports = User;