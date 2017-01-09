var app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
	.when("/login", {
        templateUrl : "partials/login.html"
    })
	.when("/profile", {
        templateUrl : "partials/profile.html"
    })
	.when("/home", {
        templateUrl : "partials/home.html"
    })
    .when("/students", {
        templateUrl : "partials/students.html"
    })
	.when("/tas", {
        templateUrl : "partials/tas.html"
    })
	.when("/groups", {
        templateUrl : "partials/groups.html"
    })
	.when("/assignments", {
        templateUrl : "partials/assignments.html"
    })
	.when("/grades", {
        templateUrl : "partials/grades.html"
    })
	.otherwise({
        templateUrl : "partials/default.html"
    })
})

app.controller('ctrl', function($scope, $location, $http, $rootScope) {
	$scope.yellow_limit = 70;
	$scope.red_limit = 50;
	
	$scope.login = {};
	$scope.user = "";
	$scope.newGroup = {};
	$scope.newStudent = {};
	$scope.newTa = {};
	$scope.newGroup = {};
	$scope.newGroup.students = [];
	$scope.password = {};
	
	
	$scope.changePassword = function() {
		console.log($scope.password);
		if (!($scope.password.change == $scope.password.confirm )) {
			alert("New passwords must match.");
		}
		else {
			$.ajax({type:"POST",
		  		url: "php/changePassword.php",
				data: $scope.password,  
				success: function(data, success) { 
					console.log(data);
					if (data == "success") {
						$scope.password = {};
						$scope.$apply();
						alert("success!");
					}
					else {
						alert(data);
					}
				}
		   });
		}
	};
	
	$scope.addStudent = function() {
		console.log($scope.newStudent);
		$.ajax({type:"POST",
	  		url: "php/addStudent.php",
			data: $scope.newStudent,  
			success: function(data, success) { 
				console.log(data);
				if (data == "success") {
					$scope.newStudent = {};
					$scope.$apply();
					alert("success!");
				}
				else {
					alert(data);
				}
			}
	   });
	}
	
	$scope.updateStudents = function() {
		console.log($scope.data.students);
		$.ajax({type:"POST",
	  		url: "php/updateStudents.php",
			data: {"students":$scope.data.students},  
			success: function(data, success) { 
				console.log(data);
				if (data == "success") {
					alert("success!");
				}
				else {
					alert(data);
				}
			}
	   });
	}
	
	$scope.editStudentInfo = function(x) {
		console.log(x);
		$scope.studentInfo = x;
	}
	
	$scope.editGroupInfo = function(x) {
		console.log(x);
		$scope.groupInfo = x;
	}
	
	$scope.editAssignment = function(x) {
		console.log(x);
		$scope.assignment = x;
	}
	
	$scope.createGroup = function() {
		console.log($scope.newGroup);
		$.ajax({type:"POST",
	  		url: "php/createGroup.php",
			data: $scope.newGroup,  
			success: function(data, success) { 
				console.log(data);
				if (data == "success") {
					alert("success!");
				}
				else {
					alert(data);
				}
			}
	   });
	}
	
	$scope.addStudentToGroup = function() {
		$scope.newGroup.students.push($scope.newGroup.studentToAdd);
	}
	
	$scope.addTa = function() {
		console.log($scope.newTa);
		$.ajax({type:"POST",
	  		url: "php/addTa.php",
			data: $scope.newTa,  
			success: function(data, success) { 
				console.log(data);
				if (data == "success") {
					$scope.newTa = {};
					$scope.$apply();
					alert("success!");
				}
				else {
					alert(data);
				}
			}
	   });
	}
	
	$scope.check_login = function() {
		$scope.user = {"netid":getCookie("netid"),
					   "user_type":getCookie("user_type"),
					   "first_name":getCookie("first_name")};

		console.log($scope.user);
		if ((typeof $scope.user.netid == 'undefined') || ($scope.user.netid == "")) {
			console.log("netid cookie is blank! - you need to log in!");
			$location.url("/login");
		}
		else if (typeof $scope.data === 'undefined' ) {
			console.log("$scope.data is empty - we need to fetch the info");
			if ($scope.user.user_type == "instructor") {
				fetch_data_instructor();
			}	
			else if ($scope.user.user_type == 'student') {
				console.log("need to fetch info for this student");
				fetch_data_student();
			}
		}
	}
	
	$scope.log_in = function() {
		$.ajax({type:"POST",
	  		url: "php/login.php",
			data: {username:$("#login_username").val(), password:$("#login_password").val()},  
			success: function(data, success) { 
				if (data == "error") {
					alert ("error - username or password incorrect");
				}
				else {
					var data = $.parseJSON(data);
					$scope.user = data.user;
					console.log($scope.user);
					
					$location.url("/home");
					
					$scope.$apply();
				}
				
				setCookie("netid", $scope.user.netid, 1);
				setCookie("user_type", $scope.user.user_type, 1);
				setCookie("first_name", $scope.user.first_name, 1);
			}
	   });		
	}
	
	$scope.logout = function() {
		console.log("logging out - need to delete cookies, $scope.data, and $scope.user");
		$scope.data = "";
		$scope.user = "";
		deleteCookie("netid");
		deleteCookie("user_type");
		deleteCookie("first_name");
		location.reload();
	}

	fetch_data_instructor = function() {
		/*
		$scope.data = {"students":[{"netid":"bsmith", "first_name":"Bob", "last_name":"Smith", "group_name":"Best Group", "rating":100, "notes":"", "picture":"nick.jpg"},
								   {"netid":"bjohnson", "first_name":"Bill", "last_name":"Johnson", "group_name":"Best Group", "rating":60, "notes":"", "picture":"nick.jpg"},
								   {"netid":"rjackson", "first_name":"Ryan", "last_name":"Jackson", "group_name":"Best Group", "rating":90, "notes":"", "picture":"nick.jpg"},
								   {"netid":"wjohnson", "first_name":"Wyatt", "last_name":"Johnson", "group_name":"Best Group", "rating":60, "notes":"", "picture":"nick.jpg"},
								   {"netid":"jfrancis", "first_name":"Jack", "last_name":"Francis", "group_name":"Sad Group", "rating":30, "notes":"Not doing enough.", "picture":"nick.jpg"}],
							"tas":[{"netid":"jtyler", "first_name":"Jerry", "last_name":"Tyler"},
								   {"netid":"ppaulson", "first_name":"Paul", "last_name":"Paulson"}],
							"assignments":[{"assignment_name":"Assignment1", "date_assigned":"12-12-16", "date_due":"12-15-16", "questions":[{"question":"Rate Group Member 1", "response":0}]}]
		};
		
		assignment1 = [{"assignment_name":"Assignment1", "date_assigned":"12-12-16", "date_due":"12-15-16", "questions":[{"question":"Rate Group Member 1", "response":0}]}]
		
		
		
		
		$scope.data.groups = [{"group_name":"Best Group", "group_rating":100, "ta":"jtyler", "group_members":[$scope.data.students[0], $scope.data.students[1], $scope.data.students[2], $scope.data.students[3]]},
									  {"group_name":"Sad Group", "group_rating":40, "ta":"ppaulson", "group_members":[$scope.data.students[4]]}],
		console.log($scope.data);
		*/
		
		$.ajax({type:"POST",
	  		url: "php/instructor.php",
			data: "",  
			success: function(data, success) { 
				if (data == "error") {
					alert ("error - username or password incorrect");
				}
				else {
					$scope.data = $.parseJSON(data);
					for (i = 0; i < $scope.data.students.length; i++) {
						$scope.data.students[i].picture = "pictures/" + $scope.data.students[i].netid + ".jpg";
					}
					console.log($scope.data);
					//start an automatic updater loop? 
					$scope.$apply();
				}	
			}
			
			
	   });
		
	}
	
	
	fetch_data_student = function() {		
		$.ajax({type:"POST",
	  		url: "php/student.php",
			data: "",  
			success: function(data, success) { 
				if (data == "error") {
					//alert ("error - username or password incorrect");
				}
				else {
					$scope.data = $.parseJSON(data);
					console.log($scope.data);
					$scope.$apply();
				}	
			}
			
			
	   });
		
	}
	
	

});