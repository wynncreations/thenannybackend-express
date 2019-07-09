const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String,
    account_type: String,
    created_at: Date,
    updated_at: Date
});

// Compile model from schema
var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;