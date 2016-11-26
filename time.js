module.exports = function(term){
    var mongo = require("mongodb").MongoClient;
    var mongourl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/data";
    
    var date = new Date();
    var gmt = date.toISOString();
    
    var full = {"term": term, "when": gmt};
    
    mongo.connect(mongourl, function(err, db){
        if (err) throw err;
        var collection = db.collection("img");
        collection.insert(full, function(err, data){
            if (err) throw err;
        });
        db.close();
    });// connection to mongo ends
};