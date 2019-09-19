const express = require('express');
const app = express();
const router = express.Router();
const io = require("socket.io-client");

let User = require('../../database/schema/user.model');
const ioClient = io.connect("http://localhost:8000");
ioClient.on('connect', function(){
     console.log("connected to socket-io server");
});

ioClient.on('disconnect', function(){
     console.log("disconnected to socket-io server");
});

router.get('/', function(req, res){
    return res.status(200).send("update");
});

router.post('/', function(req, res){
     User.findOne({ email_id: req.body.email_id}, function(err, userBody){
          if(err){
               console.log(error);
               return res.status(400).send("{status:error}");
          }
          if(userBody){
               userBody.clip_content=req.body.clip_content;
               userBody.save();
               ioClient.emit('new_private_message',{email:req.body.email_id, clip_content:req.body.clip_content});
               return res.status(200).send("{status:clip_content_updated}");
          } else{
               return res.status(200).send("{status:no_user_found}");
          }
     });
});

module.exports = router;
