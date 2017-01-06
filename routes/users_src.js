var sequelize = require("./dbconfiguration").sequelize; //import sequelize database object
//This function will give all the list of user details
exports.getUsers = function(req, res) {
  //Use query method to get the data from sever
  sequelize.query("SELECT * from domo_dsr_users INNER JOIN domo_dsr_userroles ON domo_dsr_users.role=domo_dsr_userroles.id", {
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
  //Use query method to get the data of specific user from sever
  sequelize.query("SELECT * from domo_dsr_users INNER JOIN domo_dsr_userroles ON domo_dsr_users.role=domo_dsr_userroles.id WHERE empId=" + req.params.empId + " LIMIT 1", {
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
