var fs = require('fs');
var sequelize = require("./dbconfiguration").sequelize; //import sequelize database object

//This function will read the data from the database and will give the output in JSON format.
exports.listUsers = function(req, res) {
  //Use query method to get the data from server
  sequelize.query("SELECT * from domo_dsr_users", {
    type: sequelize.QueryTypes.SELECT
  }).then(function(results) {
    res.format({
      json: function() {
        res.send(results);
      }
    });
  }).error(function(error) {
    console.log("Query Error: " + error);
  });
};
//This function will write the data to the database using INSERT statement.
exports.postUser = function(req, res) {
    var user = {
      id: 5,
      empId: 16776,
      userName: "jyotishu",
      password: "Dhanashree@1234",
      emailId: "jyotishu@cybage.com",
      role: 1,
      active: 1,
      token: null
    }
    var query = "INSERT INTO domo_dsr_users (id,empId,userName,password,emailId,role,active,token)";
    query += "VALUES (";
    query += user.id + ",";
    query += " '" + user.empId + "',";
    query += " '" + user.userName + "',";
    query += " '" + user.password + "',";
    query += " '" + user.emailId + "',";
    query += " " + user.role + ",";
    query += " " + user.active + ",";
    query += " '" + user.token + "' )";
    var queryID = "SELECT * FROM domo_dsr_users";

    sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT
    }).then(function(results) {

      sequelize.query(queryID, {
        type: sequelize.QueryTypes.SELECT
      }).then(function(rows) {
        res.format({
          json: function() {
            res.send(rows);
            console.log("Inserted");
          }
        });
      }).error(function(error) {
        console.log("Query Error: " + error);
      });
    }).error(function(error) {
      console.log("Query Error: " + error);
    });
  }
  //This function will delete a record from the database using id.
exports.delUserById = function(req, res) {
  sequelize.query("DELETE FROM domo_dsr_users WHERE id=" + req.params.id, {
    type: sequelize.QueryTypes.DELETE
  }).then(function() {
    res.send(req.params);
    console.log("Deleted")
  }).error(function(error) {
    console.log("Query Error: " + error);
  });
};

//This function will update a record from the database using id.
exports.updateUserById = function(req, res) {
  var newData = {
    password: "motherOfDragons@GOT",
    emailId: "rutujasn@cybage.com",
    role: 1,
    active: 1,
    token: null
  }
  var query = "UPDATE domo_dsr_users SET";
  query += " " + "password='" + newData.password + "',";
  query += " " + "emailId='" + newData.emailId + "',";
  query += " " + "role=" + newData.role + ",";
  query += " " + "active=" + newData.active + ",";
  query += " " + "token=" + newData.token + " ";
  query += " WHERE id=" + req.params.id + ";";
  var queryID = "SELECT * FROM domo_dsr_users WHERE id=" + req.params.id;
  sequelize.query(query, {
    type: sequelize.QueryTypes.UPDATE
  }).then(function() {
    sequelize.query(queryID, {
      type: sequelize.QueryTypes.SELECT
    }).then(function(rows) {
      res.format({
        json: function() {
          res.send(rows);
          console.log("Updated");
        }
      });
    }).error(function(error) {
      console.log("Query Error: " + error);
    });
  }).error(function(error) {
    console.log("Query Error: " + error);
  });

}
