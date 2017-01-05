var fs = require("fs"); // To require File System module to use it's functions
var sequelize = require("./dbconfiguration").sequelize; //import sequelize database object

//This function will read the JSON file and will give the output
exports.getUsers = function(req, res) {
  //Use query method to get the data from sever
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

//this function will give the user details if the requested employee ID is matched
exports.getUserByEmpId = function(req, res) {
  fs.readFile("./data/datapoint.json", 'utf8', function(err, data) {
    var users = JSON.parse(data).userDetails; // array of objects
    var reqParameter = req.params.empId; // this will capture the empId requested by the user
    for (var i = 0; i < users.length; i++) {
      // If the requested empId matches with the existing empID, it will display the user details
      if (users[i].empId == reqParameter) {
        var user = users[i];
        res.end(JSON.stringify(user));
      } else {
        res.status(404);
        res.send("object not found");
      }
    }
  });
};
