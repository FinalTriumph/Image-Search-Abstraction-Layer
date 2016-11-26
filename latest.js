module.exports = function(req, res) {
    var mongo = require("mongodb").MongoClient;
    var mongourl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/data";
    
    mongo.connect(mongourl, function(err, db){
        if (err) throw err;
        var collection = db.collection("img");
        collection.find({}, function(err, cursor){
            if (err) throw err;
            cursor.toArray(function (err, data){
                if (err) throw err;
                var ready = data.slice(-10).reverse();
                for (var i = 0; i < ready.length; i++){
                    ready[i]._id = undefined;
                    }
                res.send(ready);
                db.close();
            });
        });
    });
};