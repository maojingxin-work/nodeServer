var express = require('express');
var path = require('path');
var app = express();
var mysql = require('mysql');

var  connection = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'123456',
   database:'mydb1'
});
connection.connect();
var sSql = 'SELECT * FROM user WHERE name = ? and password = ?';
var addSql = 'INSERT INTO people ( id,name,age,gender )\n' +
    '                       VALUES\n' +
    '                       ( 0,?,?,?);';

app.use(express.static('public'));


app['get']('/',function (req, res) {
    res.location('localhost:8081/index_1.html');
});
app['get']('/commit',function (req, res) {
    var data = req.query;
    var addParameter = [data.name,parseInt(data.age),parseInt(data.gender)];
    connection.query(addSql,addParameter,
        function (err, result, field) {
            if(err){
                console.log(err.message);
                return;
            }
            console.log('----');
            res.location('localhost:8081/register.html');
    })
});
var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});


