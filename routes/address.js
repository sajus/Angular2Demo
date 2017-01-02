var fs = require('fs');
exports.listAddrs = function (req, res){
	fs.readFile("./routes/address.json", 'utf8', function (err, data){
		console.log( data );
		res.end( data );
	});
};
exports.postAddrs = function (req, res){
	var user = {
		"user6" : 
		{
			"name" : "Neha",
			"flatno" : "B905",
			"building" : "Gravellia",
			"streetno": 2,
			"city": "Pune" 
		}
	}
   console.log("./routes/address.json");
   fs.readFile("./routes/address.json", 'utf8', function (err, data) {
		data["user6"] = user["user6"];
		fs.writeFile( __dirname + "/" + "users.json",JSON.stringify(data), function (err) {
				if (err) return console.log(err);
				console.log('Done');
		});
	   res.json( JSON.stringify(data));
   });
	
};
exports.listAddrsById = function (req, res){
   fs.readFile("./routes/address.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users[req.params.id];
       res.end(JSON.stringify(user));
   });
	
};
