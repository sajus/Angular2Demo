var fs = require("fs"); // To require File System module to use it's functions

//This function will read the JSON file and will give the output
exports.getUsers = function (req, res) {
   fs.readFile( "./data/datapoint.json", 'utf8', function (err, data) {
      if (data) { res.end( data ); } // if data is present render the values
      else
      { res.status(404);
        res.send("object not found"); } // It will throw an error if data is not available
   });
};

//this function will give the user details if the requested employee ID is matched
exports.getUserByEmpId = function (req,res) {
   fs.readFile( "./data/datapoint.json", 'utf8', function (err, data) {
       var users = JSON.parse( data ).userDetails; // array of objects
       var reqParameter = req.params.empId;  // this will capture the empId requested by the user
       for (var i=0; i<users.length; i++){
          if (users[i].empId == reqParameter)// If the requested empId matches with the existing empID, it will display the user details
          { var user = users[i];
            res.end( JSON.stringify(user));}
          else
          { res.status(404);
            res.send("object not found");}
        }
    });
};
