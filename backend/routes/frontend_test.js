var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  // res.render('frontend_test2');
    console.log("connected to test.js")
    res.send("connected to node")
  

  // res.sendFile(path.join(__dirname, '../frontend/index.html'));
  // console.log(path.join(__dirname, '../frontend/index.html'))
});

module.exports = router;
