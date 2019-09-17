const express = require('express');
const app = express();
const router = express.Router();
var bcrypt = require('bcrypt');

let User = require('../../database/schema/user.model');

router.get('/', function(req, res){
    return res.status(200).send("login");
});

router.post('/', function(req, res){
     User.findOne({ email_id: req.body.email_id}, function(err, userBody){
          if(err){
               console.log(error);
               return res.status(400).send("{status:error}");
          }
          if(userBody){
               var salt = userBody.salt;
               bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if(err){
                         return res.status(400).send("{status:error}");
                    }
                    if(hash==userBody.password){
                         console.log("Success logging in user with email_id: "+userBody.email_id);
                         return res.status(200).send("{status:login_success}");
                    }else {
                         console.log("Failure logging in user with email_id: "+userBody.email_id);
                         return res.status(200).send("{status:invalid_credentials}");
                    }
               });
          } else {
               return res.status(200).send("{status:no_user_found}");
          }
     });
});

module.exports = router;
