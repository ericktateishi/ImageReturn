const express = require("express");
const app = express();
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.get("/search", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var req_url = 'https://br.images.search.yahoo.com/search/images;_ylt=AwrE1xMFbSRcD_gAozzz6Qt.;_ylu=X3oDMTB0N2Noc21lBGNvbG8DYmYxBHBvcwMxBHZ0aWQDBHNlYwNwaXZz?p=' + req.query.q;

    request({uri: req_url}, function(error, response, body){
        if(!error && response.statusCode == 200){
            const dom = new JSDOM(body);

            res.json({
                "imageURL": dom.window.document.getElementById('results').getElementsByTagName('img')[0].getAttribute('data-src').replace("&w=300&h=300", "")
            });
        } else {
            res.status(response.statusCode);
            res.send(error.message);
        }
        
    });
        
});
  

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

