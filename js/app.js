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

app.controller('ctrl', function($scope, $location, $http, $rootScope, $filter) {
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


	$scope.csvStudents = function() {
		console.log(document.getElementById('csv-file').files);
		var file = document.getElementById('csv-file').files[0];
		var students = [];

		Papa.parse(file, {
		  header: false,
		  complete: function(results) {
		    data = results;
			console.log(data);
			for (i = 0; i < data.data.length; i++) {
				student = {"first_name":data.data[i][0], "last_name":data.data[i][1], "netid":data.data[i][2]};
				students.push(student);
			}
			console.log(students);
      /*
			$.ajax({type:"POST",
		  		url: "php/addStudents.php",
				data: {"students":students},
				success: function(data, success) {
					console.log(data);
					if (data == "success") {
						$scope.newStudent = {};
						alert("success!");
						fetch_data();
						$scope.$apply();
					}
					else {
						alert(data);
					}
				}
		   });
       */
		  }
		});
	}

	$scope.csvTas = function() {
		console.log(document.getElementById('csv-file').files);
		var file = document.getElementById('csv-file').files[0];
		var tas = [];

		Papa.parse(file, {
		  header: false,
		  complete: function(results) {
		    data = results;
			console.log(data);
			for (i = 0; i < data.data.length; i++) {
				ta = {"first_name":data.data[i][0], "last_name":data.data[i][1], "netid":data.data[i][2]};
				tas.push(ta);
			}
			console.log(tas);
      /*
			$.ajax({type:"POST",
		  		url: "php/addTas.php",
				data: {"tas":tas},
				success: function(data, success) {
					console.log(data);
					if (data == "success") {
						$scope.newTa = {};
						alert("success!");
						fetch_data();
						$scope.$apply();
					}
					else {
						alert(data);
					}
				}
		   });
       */
		  }
		});
	}

	$scope.csvGroups = function() {
		console.log(document.getElementById('csv-file').files);
		var file = document.getElementById('csv-file').files[0];
		var groups = [];

		Papa.parse(file, {
		  header: false,
		  complete: function(results) {
		    data = results;
			console.log(data);
			for (i = 0; i < data.data.length; i++) {
				group = {"group_name":data.data[i][0], "ta_name":data.data[i][1], "students":[]};
				j = 2;
				for(j = 2; j < data.data[i].length; j++) {
					if (data.data[i][j] != "") {
						group.students[j - 2] = data.data[i][j];
					}
				}
				groups.push(group);
				console.log(group)
			}
			/*
			console.log(tas);
			$.ajax({type:"POST",
		  		url: "php/addTas.php",
				data: {"tas":tas},
				success: function(data, success) {
					console.log(data);
					if (data == "success") {
						$scope.newTa = {};
						alert("success!");
						fetch_data();
						$scope.$apply();
					}
					else {
						alert(data);
					}
				}
		   });
			*/
		  }
		});
	}

	$scope.changePassword = function() {
		console.log($scope.password);
		if (!($scope.password.change == $scope.password.confirm )) {
			alert("New passwords must match.");
		}
		else {
      /*
			$.ajax({type:"POST",
		  		url: "php/changePassword.php",
				data: $scope.password,
				success: function(data, success) {
					console.log(data);
					if (data == "success") {
						$scope.password = {};
						alert("success!");
						fetch_data();
						$scope.$apply();
					}
					else {
						alert(data);
					}
				}
		   });
       */
		}
	};

	$scope.addStudent = function() {
		console.log($scope.newStudent);
    /*
		$.ajax({type:"POST",
	  		url: "php/addStudents.php",
			data: {"students":[$scope.newStudent]},
			success: function(data, success) {
				console.log(data);
				if (data == "success") {
					$scope.newStudent = {};
					alert("success!");
					fetch_data();
					$scope.$apply();
				}
				else {
					alert(data);
				}
			}
	   });
     */
	}

	$scope.updateStudents = function() {
		console.log($scope.data.students);
    /*
		$.ajax({type:"POST",
	  		url: "php/updateStudents.php",
			data: {"students":$scope.data.students},
			success: function(data, success) {
				console.log(data);
				if (data == "success") {
					alert("success!");
					fetch_data();
					$scope.$apply();
				}
				else {
					alert(data);
				}
			}
	   });
     */
	}

	$scope.updateGroups = function() {
		console.log($scope.data.groups);
    /*
		$.ajax({type:"POST",
	  		url: "php/updateGroups.php",
			data: {"groups":$scope.data.groups},
			success: function(data, success) {
				console.log(data);
				if (data == "success") {
					alert("success!");
					fetch_data();
					$scope.$apply();
				}
				else {
					alert(data);
				}
			}
	   });
     */
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
    /*
		$.ajax({type:"POST",
	  		url: "php/createGroup.php",
			data: $scope.newGroup,
			success: function(data, success) {
				console.log(data);
				if (data == "success") {
					alert("success!");
					fetch_data();
					$scope.$apply();
				}
				else {
					alert(data);
				}
			}
	   });
     */
	}

	$scope.addStudentToGroup = function() {
		$scope.newGroup.students.push($scope.newGroup.studentToAdd);
	}

	$scope.addTa = function() {
		console.log($scope.newTa);
    /*
		$.ajax({type:"POST",
	  		url: "php/addTas.php",
			data: {"tas":[$scope.newTa]},
			success: function(data, success) {
				console.log(data);
				if (data == "success") {
					$scope.newTa = {};
					alert("success!");
					fetch_data();
					$scope.$apply();
				}
				else {
					alert(data);
				}
			}
	   });
     */
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
			fetch_data();
		}
	}

	fetch_data = function() {
		if ($scope.user.user_type == "instructor") {
				fetch_data_instructor();
		}
		else if ($scope.user.user_type == 'student') {
			console.log("need to fetch info for this student");
			fetch_data_student();
		}
	}

	$scope.log_in = function() {
    /*
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
     */
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
		$.ajax({type:"POST",
	  		url: "php/instructor.php",
			data: "",
			success: function(data, success) {
				//console.log(data);
				if (data == "error") {
					alert("error");
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
     */
	}


	fetch_data_student = function() {
    /*
		$.ajax({type:"POST",
	  		url: "php/student.php",
			data: "",
			success: function(data, success) {
				if (data == "error") {
					alert ("error");
				}
				else {
					$scope.data = $.parseJSON(data);
					console.log($scope.data);
					$scope.$apply();
				}
			}
	   });
     */
	}



});
