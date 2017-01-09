/*
  Backend Reset API's
  AngualrCLI will do the proxy to this express server
  Don't use express here for front end serving, this will be handled by ng serve
*/
var express = require('express'),
  http = require('http'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  users = require('./routes/users_src'),

  sequelize = require('./routes/dbconfiguration').sequelize,
  config = require('./routes/dbresources'),
  authorization = require('./routes/authorization_src'),

  address   =  require('./routes/address');


app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist', 'index.html'));
});

app.get('/usersList', users.getUsers);
app.get('/usersList/:empId', users.getUserByEmpId);

app.post('/login', authorization.preAuthorization);

app.get('/listUsers', address.listUsers);
app.post('/postUser',address.postUser);
app.delete('/deleteUser/:id', address.delUserById);
app.put('/updateUser/:id', address.updateUserById);


app.use(express.static(__dirname + '/dist'));
//Middleware to check for token and to verify it.
app.use(function(req, res, next) {
  if (authorization.isAuthorized(req, res)) {
    next();
  } else {
    res.status(401);
    res.send();
  }
});

app.listen(8081, function() {
  console.log('Example listening on port 8081!');
});
