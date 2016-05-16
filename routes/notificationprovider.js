var mongo = require('mongodb');
var bot = require('./bot');
var Server = mongo.Server,
    Db = mongo.Db;
var BSON = require('bson').BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('test', server);


//Creates connection with the database.
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'test' database");
        db.collection('notification', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'test' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

//Updates the status of unread notifications
exports.updateNotification = function(req, res) {
    var id = req.body;
    for(index in id){
        id[index] = BSON.ObjectID.createFromHexString(id[index].toString());
    }
    db.collection('notification', function(err, collection) {
        collection.update({"_id":{$in:id}},{$set:{"notified":1}}, {multi:true}, function(err, result) {
            if (err) {
                console.log('Error updating notification: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(id);
            }
        });
    });
}


//Gets all the notifications from database
exports.findAll = function(req, res) {
    db.collection('notification', function(err, collection) {
        collection.find().toArray(function(err, items) {
            if(err !== null)
                res.send(err);
            else
                res.send(items);
        });
    });
};



//Populates the db with the sample data.
var populateDB = function() {

    var notifications = [
        {
            "from":"Ron",
            "timestamp": new Date(),
            "heroimage": "http://s32.postimg.org/pkwsifgi9/ron_weasley.jpg",
            "message":"Commented on you wall",
            "notified":0
        },
        {
            "from":"Howard",
            "timestamp": new Date(),
            "heroimage": "http://s32.postimg.org/7v2x2r2vl/ALTERNATE_HEADSHOT_DF_04631_r.jpg",
            "message":"Liked your photo",
            "notified":0
        },
        {
            "from":"Nolan",
            "timestamp": new Date(),
            "heroimage": "http://s32.postimg.org/7fy2sz235/rs_634x925_150909123151_634_christopher_nolan_20.jpg",
            "message":"Liked your post",
            "notified":0
        },
        {
            "from":"Scorsese",
            "timestamp": new Date(),
            "heroimage": "http://s32.postimg.org/js5xsi79t/20131018_Scorsese_1534_Webcopy.jpg",
            "message":"Tagged you in a photo",
            "notified":0
        },
        {
            "from":"Tarantino",
            "timestamp": new Date(),
            "heroimage": "http://s32.postimg.org/t5j0qspch/download.jpg",
            "message":"Published a post",
            "notified":0
        }];

    db.collection('notification', function(err, collection) {
        collection.insert(notifications, {safe:true}, function(err, result) {});
    });

};



