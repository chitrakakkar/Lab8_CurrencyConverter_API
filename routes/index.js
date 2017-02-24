/**
 * Created by chitrakakkar on 2/23/17.
 */
var express = require('express');
var router = express.Router();

var exchangeRates={'Dollar':60,'EUR':0.94, 'JPY':112.86};


/*handle get request from home page*/
router.get('/', function (req, res)

{
    res.render('index');
    
});
/* Handle currency form submit */
router.get('/convert', function(req, res)
{
    var amounts = req.query.amount;
    var convert_from = req.query.from_currency;
    var convert_to = req.query.to_currency;
    var rate = exchangeRates[convert_to];
    var result = amounts * rate;
    res.render('results', { dollars : amounts, result: result, currency: convert_to});
});


 module.exports= router;