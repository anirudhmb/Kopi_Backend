const mongoose = require('mongoose');

module.exports.connect = function() {
     let user = require('./schema/user.model.js');

     mongoose.set('debug', true);

     mongoose.connect('mongodb://127.0.0.1:27017/kopi', { useNewUrlParser: true, useUnifiedTopology: true });
     const connection = mongoose.connection;

     connection.once('open', function () {
         console.log("MongoDB database(userdb) connection established successfully");
     })
}
