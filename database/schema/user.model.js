const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

let user = new Schema({
    name: {
        type: String
    },
    email_id: {
        type: String,
        unique: true,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    clip_content :{
        type : String,
        required : true
    }
});

user.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('user', user);
