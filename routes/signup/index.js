const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
var db = require('../../database/schema/user.model.js');
var bcrypt = require('bcrypt');

let User = require('../../database/schema/user.model');


app.use(cors());
app.use(bodyParser.json());

const saltRounds = 10;


router.get('/', function(req, res){
     return res.status(200).send("signup");
});

router.post('/', function(req, res){
     bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {

             console.log(req.body.email_id);
             console.log(req.body.password);
             console.log(salt);
             console.log(hash);

             var userData = {
                  email_id : req.body.email_id,
                  salt : salt,
                  password : hash
             };

             User.create(userData, function (err, user) {
                  if (err) {
                      console.log(err);
                      if(err.errors.email_id.message == "An account with the same emailId already exists."){
                           return res.status(400).send("{status:duplicate_account}");
                      }
                      return res.status(400).send("{status:failure while updating db}");
                  } else {
                      return res.status(200).send("{status:success}");
                  }
             });

          });
     });
});


module.exports = router;
