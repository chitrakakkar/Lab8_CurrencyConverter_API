/**
 * Created by chitrakakkar on 2/23/17.
 */

var express= require('express');
var router = express.Router();

/* GET about page. The address is relative to /about */
router.get('/', function(req, res){
    res.render('about');
});


module.exports = router;