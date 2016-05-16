var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('test', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'test' database");
        db.collection('notification', {strict:true}, function(err, collection) {
            if (err) {
            }
        });
    }
});


//Adds notifications from sample data to db
var addNewNotification = function(){
    var notifications =[
        {
            "from":"Ron",
            "timestamp": "",
            "heroimage": "http://s32.postimg.org/pkwsifgi9/ron_weasley.jpg",
            "message":"Commented on you wall",
            "notified":0
        },
        {
            "from":"Howard",
            "timestamp": "",
            "heroimage": "http://s32.postimg.org/7v2x2r2vl/ALTERNATE_HEADSHOT_DF_04631_r.jpg",
            "message":"Liked your photo",
            "notified":0
        },
        {
            "from":"Nolan",
            "timestamp": "",
            "heroimage": "http://s32.postimg.org/7fy2sz235/rs_634x925_150909123151_634_christopher_nolan_20.jpg",
            "message":"Liked your post",
            "notified":0
        },
        {
            "from":"Scorsese",
            "timestamp": "",
            "heroimage": "http://s32.postimg.org/js5xsi79t/20131018_Scorsese_1534_Webcopy.jpg",
            "message":"Tagged you in a photo",
            "notified":0
        },
        {
            "from":"Tarantino",
            "timestamp": "",
            "heroimage": "http://s32.postimg.org/t5j0qspch/download.jpg",
            "message":"Published a post",
            "notified":0
        }];
    var selectedNotification = notifications[Math.floor(Math.random() * 4) + 0 ];
    selectedNotification.timestamp = new Date();
    db.collection('notification', function(err, collection) {
        collection.insert(selectedNotification, {safe:true}, function(err, result) {
            if (err)
                console.log("Error: "+err);
            else
                console.log('Success');
        });
    });
    setTimeout(function(){addNewNotification();},30000);
};
addNewNotification();