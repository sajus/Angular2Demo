var sequelize = require("./dbconfiguration").sequelize,
  jwt = require('jsonwebtoken');

exports.preAuthorization = function(req, res) {
  //Declaring and initializing variables
  var name = req.get('userName');
  var password = req.get('userPassword');
  var user;

  //Use query method to get the data from sever
  sequelize.query(" SELECT * FROM domo_dsr_users WHERE userName = '" + name + "' AND password = '" + password + "' LIMIT 1 ", {
    type: sequelize.QueryTypes.SELECT
  }).then(function(results) {
    res.format({
      json: function() {
        var authorization = null;
        //Checking if authorization is valid.
        if (results.length != 0) {
          user = results[0];
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
            //Insert values into token table.
          sequelize.query("INSERT INTO domo_dsr_token (token,expiryTime) VALUES ('" + newToken.token + "', from_unixtime('" + newToken.exp + "'))", {
              type: sequelize.QueryTypes.INSERT
            }).then(function(users) {})
            //Insert values into userlog table.
          sequelize.query("INSERT INTO domo_dsr_userlog (empId,role,date,loginTime,expiryTime,token) VALUES ('" + user.empId + "', '" + user.role + "', curdate(), now(), from_unixtime('" + newToken.exp + "'), '" + newToken.token + "') ", {
              type: sequelize.QueryTypes.INSERT
            }).then(function(users) {})
            //Setting token in the response.
          res.set('token', token);
          res.status(200);
          res.send();

        } else {
          res.status(401);
          res.send();
        }
      }
    });
  }).error(function(error) {
    console.log("Query Error: " + error);
  });
};

exports.isAuthorized = function(req, res) {
  //Add exceptional case for login req.
  if (req.url == '/login') {
    return true;
  } else {
    var responseToken = req.get('token');
    //To fetch the token from the token table.
    sequelize.query(" SELECT * FROM domo_dsr_token WHERE token = '" + responseToken + "' ", {
      type: sequelize.QueryTypes.SELECT
    }).then(function(results) {
      //Creating variables currTime,expTime to fetch the current and expiry timestamp values in milliseconds.
      var currTime = Date.now();
      var expTime = Date.parse(results[0].expiryTime);
      //To check if the token is present in the token table and if it has expired or not.
      if ((results.length != 0) && (expTime > currTime)) {
        //If the expiry time is less than 2 mins, refresh the expiry time to 10mins.
        if ((expTime - currTime) < 120000) {
          //Creating newExpTime with value 10 mins.
          var newExpTime = Math.floor(Date.now() / 1000) + 60 * 10;
          //Updating expiry time in token table
          sequelize.query(" UPDATE domo_dsr_token SET expiryTime = from_unixtime('" + newExpTime + "') ", {
              type: sequelize.QueryTypes.UPDATE
            }).then(function(users) {})
            //Updating expiry time in userlog
          sequelize.query(" UPDATE domo_dsr_userlog SET expiryTime = from_unixtime('" + newExpTime + "') ", {
            type: sequelize.QueryTypes.UPDATE
          }).then(function(users) {})
        }
        return true;
      }
      return false;
    })
  }
}
