
# NotificationsApp
This is a notifications app made using MEAN stack which can be included in any project to get facebook like real time notifications.


#Pre Requisites

1. Download and install MongoDB Community Server(v3.2.6): https://www.mongodb.com/download-center#community
2. Download and install Node.js(v4.4.4): https://nodejs.org/en/download/
3. Install following packages using **npm install**:
   1. express
   2. mongodb
   3. bson

#Setup

1. Clone the repository.
2. Start mongo server.
3. Run file server.js from command line using command: **node server.js**
4. Go to public folder and run **index.html** in you browser.


#API

1. **findAll()**: Gets all the notifications from MongoDB.
2. **updateNotification()**: Takes the id of unread notifications and updates it to read.

#Database

Sample Notification Object:  
```javascript
{
  "from":"Ron",
  "timestamp": new Date(),
  "heroimage": "http://s32.postimg.org/pkwsifgi9/ron_weasley.jpg",
  "message":"Commented on you wall",
  "notified":0
}
```

#UI Snapshots:

![alt tag](http://s32.postimg.org/cuk4cbdud/screencapture_1.png)

![alt tag](http://s32.postimg.org/bzyzzxxat/screencapture_2.png)
        



