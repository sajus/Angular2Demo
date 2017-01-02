var app=angular.module('myApp',['ngRoute']);

app.controller('addrcontroller',function($scope, $http) 
	{
		$scope.add=function()
			{
				$http({
						method: 'POST',
						url: 'http://172.27.12.104:3000/author/new',
						data:
							{
								
								"name":$scope.name,
								"flatno":$scope.flat,
								"bldg":$scope.bldg,
								"street":$scope.street,
								"city":$scope.city
								
							},
					}).success(function(data,status,headers,config){
					alert(data.message);
					$scope.name="";
					$scope.flat="";
					$scope.bldg="";
					$scope.street="";
					$scope.city="";
				})
				.error(function(data,status,headers,config){
					alert("Please Enter valid details");
				})
			}
	
	});
	
	