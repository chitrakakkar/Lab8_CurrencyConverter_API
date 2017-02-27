/**
 * Created by chitrakakkar on 2/23/17.
 */
var express = require('express');
var router = express.Router();

var exchangeRates={'Dollar':1,'Euros':0.94, 'INR':66.69};


/*handle get request from home page*/
router.get('/', function (req, res)

{
    res.render('index');

});

// router.get(function (error)
// {
//         if(error.responseText == 'showAlert')
//             alert("Can't convert the same currency !! choose different currency forms")
//
// });
/* Handle currency form submit */
router.get('/convert', function(req, res)
{
    var amounts = req.query.amount;
    var convert_from = req.query.from_currency;
    var convert_to = req.query.to_currency;
    if(convert_to.toString() == convert_from.toString())
    {
        // res.send(error,'showAlert');
        console.log("Can't convert the same currency !! choose different currency forms");
    }
    else {
        var rate_convertFrom = exchangeRates[convert_from];
        var dollar_amount = amounts / rate_convertFrom;
        var rate_convertTo = exchangeRates[convert_to];
        var results = dollar_amount * rate_convertTo;
        console.log(results);
        res.render('results', {Amount: amounts, result: results, from_currency: convert_from, to_currency: convert_to});
    }

});


module.exports= router;
