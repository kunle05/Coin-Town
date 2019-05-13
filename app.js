const express = require('express');
const app = express();
var path = require('path');

var Client = require('coinbase').Client;
var client = new Client({'apiKey': 'HlRodxXKK8ta4AlM',
                         'apiSecret': 'vKV1GKtF9vJUJ7Kl6vlFXQOaKruH44ZY'});

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "/public/dist/public")))

// require('./server/config/mongoose');
// require('./server/config/routes')(app);
app.get('/usd', (req, res) => {

    client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, buyprice) {
        if(err){
            res.json({status: false, error: err});
        }
        else{
            client.getSellPrice({'currencyPair': 'BTC-USD'}, function(err, sellPrice){

                res.json({status: true, buyprice: buyprice, sellPrice: sellPrice})
            })
        }
    });
})

app.get('/price/:currency', (req, res) => {
    let X = req.params.currency;
    client.getBuyPrice({'currencyPair': `BTC-${X}`}, function(err, buyprice) {
        if(err){
            res.json({status: false, error: err});
        }
        else{
            client.getSellPrice({'currencyPair': `BTC-${X}`}, function(err, sellPrice){

                res.json({status: true, buyprice: buyprice, sellPrice: sellPrice})
            })
        }
    })

})

app.get('/allnations', (req, res) => {
    client.getCurrencies(function(err, currencies) {
        res.json({status: true, currencies: currencies})
    });
})

app.all("*", (req, res, next) => {
    console.log("catch all path");
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(5200, function(){
    console.log("Listening on port 5200");
})