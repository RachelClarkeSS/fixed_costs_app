const express = require('express');
const app = express();
var server = require('http').createServer(app);
const bodyParser = require("body-parser");
var path = require("path");
const e = require('express');
const port = 8080;
app.use(bodyParser.urlencoded({extended: true}));

function reformatDate(dateStr){
  dArr = dateStr.split("-");  // ex input "2010-01-18"
  return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2); //ex out: "18/01/10"
}

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  });

app.get('/main-image',function(req,res){
  res.sendFile(path.join(__dirname+'/rcj.jpg'));
});

app.get('/last',function(req,res){
  res.sendFile(path.join(__dirname+'/last.jpg'));
});


server.listen(process.env.PORT || 8080);

console.log("Running at Port 8080");
