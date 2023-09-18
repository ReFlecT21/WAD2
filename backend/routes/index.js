var express = require('express');
var path = require("path");
var foodAPI = require("../methods/foodAPI.js")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(__dirname);
  res.render('index', { title: 'Express' });   // use render when you want to access a page in the folder "views"
});


router.get('/frontend_test2', function(req, res, next) {
  console.log("connected to index")
  res.send("connected to node")

});

router.get('/APItest', function(req, res, next) {
  foodAPI.foodAPI.get('716429')
    .then(data => {
      console.log (data)
    })
    .catch(err => console.log(err))


});

module.exports = router;
