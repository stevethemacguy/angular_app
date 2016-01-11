//A basic Express Webserver created with Node.

var express = require('express');
var app = express();

//Create a public folder that can be viewable on the server. See http://expressjs.com/en/starter/static-files.html
//The path you provide is relative to the directory from where you launch node (i.e the folder containing server.controllers)
//NOTE: The __dirname here IS REQUIRED! Even though it's not initialized to anything!
app.use(express.static(__dirname + '/'));

app.listen(3000, function () {
    console.log('Listening on port 3000');
});