var express = require('express'),
    notification = require('./routes/notificationprovider');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
app.get('/notifications', notification.findAll);
/*app.put('/notifications/zero', notification.updateToZero);*/
/*app.get('/notifications/new', notification.findNew);*/
/*app.get('/notifications/:id', notification.findById);*/
/*app.post('/notifications', notification.addNotification);*/
app.put('/notifications', notification.updateNotification);
/*app.delete('/wines/:id', wine.deleteWine);*/

app.listen(3000);
console.log('Listening on port 3000...');