var express = require("express");
var app = express();
var request = require("request");
var mongoFunction = require("./time.js");
var mongoLatest = require("./latest.js");

var apiurl = "https://api.imgur.com/3/gallery/search?q=";

var myheader = {
    Authorization: "Client-ID 13a391299247f4f"
};

app.get("/", function (req, res){
   res.sendFile(__dirname + "/index.html");
});

app.get("/:str", function(req, res){
    var term = req.params.str;
    mongoFunction(term);
    var page = 1;
    if (req.query.offset > 1){
        page = req.query.offset;
    }
    if (page > 10) {
        res.json({"error":"Max page number is 10."});
    } else { 
    var start;
    var end;
    switch (page) {
        case "2": start = 5; end = 10;
        break;
        case "3": start = 10; end = 15;
        break;
        case "4": start = 15; end = 20;
        break;
        case "5": start = 20; end = 25;
        break;
        case "6": start = 25; end = 30;
        break;
        case "7": start = 30; end = 35;
        break;
        case "8": start = 35; end = 40;
        break;
        case "9": start = 40; end = 45;
        break;
        case "10": start = 45; end = 50;
        break;
        default: start = 0; end = 5;
    }
    var readyurl = apiurl + term;
    request({url: readyurl, headers: myheader, json: true}, function (err, results) {
      if (results.body.data[0] === undefined){
            res.json({"error":"No matches found"});
      } else {
        if(err) throw err;
        var ready = [];
        for (var i = start; i < end; i++) {
          if (results.body.data[i] === undefined){
            ready.push({"error":"All results displayed. No more matches found."});
            break;
          }
            ready.push({
                "url": results.body.data[i].link,
                "title": results.body.data[i].title,
                "posted_by": "http://imgur.com/user/"+results.body.data[i].account_url,
                "related_images": "https://imgur.com/search?q=title%3A+" + term
            });
        } // for loop ends
        res.json(ready);
      }
    }); // request ends
    }
}); // aap get str ends

app.get("/history/:latest", function(req, res){
    mongoLatest(req, res);
    });

var port = process.env.PORT || 8080;
app.listen(port, function(){
   console.log("Listening on port " + port); 
});