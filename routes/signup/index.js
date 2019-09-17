const express = require('express');
const router = express.Router();


router.get('/', function(req, res){
    return res.status(200).send("signup");
});


module.exports = router;
