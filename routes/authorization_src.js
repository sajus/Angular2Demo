var fs = require("fs"),
  jwt = require('jsonwebtoken'),
  tokenList = [];

exports.preAuthorization = function(req, res) {
  //Declaring and initializing variables
  var name = req.get('userName');
  var password = req.get('userPassword');
  var user;
  //Reading json file.
  fs.readFile("data/datapoint.json", 'utf8', function(err, data) {
    //Checking if the json file is read.
    if (err) {
      res.send("Error in reading File");
    } else {
      //Parsing JSON object and saving it in a object.
      var jsonData = JSON.parse(data).userDetails;
      //Default value of authorization.
      var authorization = null;
      //To parse through the json data.
      for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].name === name && jsonData[i].password === password) {
          authorization = true;
          user = jsonData[i];
        }
      }
      //Checking if authorization is valid.
      if (authorization) {
        res.status(200);
        res.send();
        //The secret key used to encode and decode token.
        var thesecret = "nosecrets";
        //Creating token using jwt
        var token = jwt.sign({
          userId: user.empId,
          admin: user.admin,
          exp: Math.floor(Date.now() / 1000) + 60 * 10,
          iat: Math.floor(Date.now() / 1000)
        }, thesecret);
        /*Creating new token variable with the expiry parameter seperate
        so that the expiry parameter is not available client side.*/
        var newToken = {
            'token': token,
            'exp': Math.floor(Date.now() / 1000) + 60 * 10
          }
          //Pushing token into the array.
        tokenList.push(newToken);
        //Setting token in the response.
        res.set('token', token);
        res.send();
      } else {
        res.status(401);
        res.send();
      }
    }
  });
};

exports.isAuthorized = function(req, res) {
  //Add exceptional case for login req.
  if (req.url === '/login') {
    return true;
  } else {
    var responseToken = req.get('token');
    //Iterating through the tokenList array.
    for (var i = 0; i < tokenList.length; i++) {
      //To check if the token is present in the tokenList array & to check if the token has expired.
      if (tokenList[i].token === responseToken && tokenList[i].exp > Math.floor(Date.now() / 1000)) {
        //If the expiry time is less than 2 mins, refresh the expiry time to 10mins.
        if ((tokenList[i].exp - Math.floor(Date.now() / 1000) < 60 * 2)) {
          tokenList[i].exp = Math.floor(Date.now() / 1000) + 60 * 10;
        }
        return true;
      }
    }
    return false;
  }
}
