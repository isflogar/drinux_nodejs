var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var directory = require('./routes/directory');
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306,
        database:'drinux'
    },'pool')
);



app.get('/', directory.list);
app.get('/add', directory.add);
app.post('/add', directory.save);
app.get('/get/:id', directory.get);
app.post('/edit/:id',directory.edit);
app.get('/delete/:id', directory.delete);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
