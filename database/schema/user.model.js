const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

let user = new Schema({
    email_id: {
        type: String,
        unique: true,
        required : true
    },
    salt: {
         type: String,
         required: true
    },
    password: {
        type: String,
        required : true
    },
    clip_content :{
        type : String,
        default: ""
    }
});

user.plugin(uniqueValidator, {message: 'An account with the same emailId already exists.'});

module.exports = mongoose.model('user', user);
