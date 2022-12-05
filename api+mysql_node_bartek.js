var express = require('express');
var app = express();
// var fs = require("fs");
const mysql = require('mysql');
// const {DataFromDB} = require('./scripts');
const {db_details} = require('./db.config.js');

app.get('/', function (req, res) {
   const connection = mysql.createConnection(db_details);
   connection.connect();
   connection.query('SELECT * FROM users WHERE user_id=1 LIMIT 1;', function (error, results, _fields) {
     if (error) throw error;

   //   res.send("Got " + results.length + " result(s):\n");
     res.send(results[0]);
     res.end();
   });
   connection.end();
})

app.get('/lbs', function(req, res) {
   GetDataLikeBartekSaid(
      db_details, 
      'SELECT * FROM users WHERE user_id=1 LIMIT 1;',
      function(error, results) {
         res.send(results[0]);
         res.end();
      }
   );
});

// app.post('/addUser', function (req, res) {
//     // First read existing users.
//     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
//        data = JSON.parse( data );
//        data["user4"] = user["user4"];
//        console.log( data );
//        res.end( JSON.stringify(data));
//     });
//  })

// const checks_db_connectivity = () => { true };

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("server started " + host + " at port " + port + ".");
   // if(!checks_db_connectivity()) {   
   //    console.error("cound not connect to mysql server");
   //    throw error "baza zdechla"; //?
   // }
})