//A basic Express Webserver created with Node.

var express = require('express');
var app = express();

//Set the public "root" folder that will contain static assets on the server (images, CSS, JS files, etc)
//The path is relative to the directory from where you launch node (i.e the folder containing server.js)
//With this in place, you can go directly to a url like http://localhost:3000/content/images/apple.png
//I use "/" here, but it could be "/public", etc. See http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/'));   // __dirname is required, even though it's not initialized to anything.

//You can also specify multiple static paths (e.g. js is in different parent folder than css),
//but it's not needed if everything is in the same public folder

//If you want real 404s, then use this INSTEAD of the catch all below.
/*app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});*/



//Sends all other page requests to index.html (i.e. anything that doesn't match one of our angular routes)
//The routing is then handled by angular. Note: this MUST be "/index", it can't be "/home", etc
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/////////// For use with Heroku:

//If node already has an enviornment variable set, use that one, otherwise use development
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Listening on port', app.get('port'));
});
////////// End Heroku section

/////////// For LOCALHOST
/*
app.listen(3000, function () {
    console.log('Listening on port 3000');
});
*/

//To run that app locally, just uncomment these two opn lines:
/*
var opn = require('opn');

//Opens the url in the default browser. This line should probably be removed if you deploy the app.
opn('http://localhost:3000');
*/
