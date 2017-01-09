<?php 

$group_name = $_REQUEST["group_name"];
$students = $_REQUEST["students"];
$ta = $_REQUEST["ta"];

session_start();


$dbservername = "127.0.0.1";
$dbusername = "root";
$dbpassword = "brooks42";
$dbname = "proj_track";


$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	echo "connection failed\n";
}

$sql = "INSERT INTO groups VALUES (DEFAULT, " . $ta["user_id"] . ", '" . $group_name . "', 100);";
$result = $conn->query($sql);
if ($result == 1) {
	echo "success";
	$group_id = $conn->insert_id;
}
else {
	echo "There was an insert failure.";
}


foreach ($students as $student) {
	$sql = "UPDATE users SET group_id=" . $group_id . " WHERE user_id=" . $student["user_id"];
	$result = $conn->query($sql);
	if ($result == 1) {
		echo "success";
	}
	else {
		echo "There was an update failure.";
	}
}

/*
$sql = "SELECT * FROM users WHERE netid='" . $netid . "';";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	echo "This netid already exists!";
}
else {
	$sql = "INSERT INTO users (user_id, first_name, last_name, netid, password, user_type, group_id, rating, notes) 
	VALUES (DEFAULT, '" . $first_name . "', '" . $last_name . "', '" . $netid . "', 'DefautPassword', 'student', -1, 100, ' ');";
	$result = $conn->query($sql);

	if ($result == 1) {
		echo "success";
	}
	else {
		echo "There was an insert failure.";
	}
}
*/


$conn->close();



?>