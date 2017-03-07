/**
 * Created by chitrakakkar on 2/23/17.
 */
var express = require('express');
var router = express.Router();

/*handle get request from home page*/
router.get('/', function (req, res)

{
    res.render('index');

});

var exchangeRate= {};
/* Handle currency form submit */
router.get('/convert', function(req, res)
{
    var API_KEY = process.env.CurrecnyConverter_API_Key;
    var amounts = req.query.amount;
    var convert_from = req.query.from_currency;
    var convert_to = req.query.to_currency;
    var results=" ";
    var API_url = 'http://apilayer.net/api/live?access_key='+API_KEY+'&currencies=USD,EUR,INR';
    get_Parse_data_from_API(API_url, function(response)
    {
        // Here you have access to your variable
        exchangeRate = response['quotes'];
        console.log((exchangeRate)['USDUSD']);
        var Final_exchangeRates =
        {
            'USD': (exchangeRate)['USDUSD'],
            'EUR': (exchangeRate)['USDEUR'],
            'INR': (exchangeRate)['USDINR']
        };

        var rate_convertFrom = Final_exchangeRates[convert_from];
        var dollar_amount = amounts / rate_convertFrom;
        var rate_convertTo = Final_exchangeRates[convert_to];
        results = dollar_amount * rate_convertTo;
    if(convert_to.toString() == convert_from.toString())
    {
        // res.send(error,'showAlert');
        var message= ("Nothing changes !! choose different currency forms to see the difference !");
        console.log("Nothing changes !! choose different currency forms to see the difference !");
        res.render('results', {Amount: amounts, result: results, from_currency: convert_from, to_currency: convert_to,message:message})
    }

    else
    {

        res.render('results', {Amount: amounts, result: results, from_currency: convert_from, to_currency: convert_to});
    }

    });
});

//http://stackoverflow.com/questions/23339907/returning-a-value-from-callback-function-in-node-js
function get_Parse_data_from_API(API_url, callback)
{
    //The urllib.request module defines functions and classes which help in opening URLs (mostly HTTP) in a complex world
    var urllib = require('urllib');
    urllib.request(API_url, { wd: 'nodejs' }, function (err, data, response)
    {
        var statusCode = response.statusCode;
        console.log(statusCode);
        var exchange_rate_data = JSON.parse(data);
        console.log("Here", exchange_rate_data );
        return callback(exchange_rate_data );
    });
}

module.exports= router;
