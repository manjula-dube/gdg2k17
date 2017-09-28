var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;
 
app.use(express.static(__dirname));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res){ 

    res.sendFile('index.html');
});

app.get('/agenda', function(req, res){

    res.sendFile('table.html');
});


var server = app.listen(PORT, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log('Example app listening at http://%s:%s', host, port);
 
});