<?php

$group_name = $_REQUEST["group_name"];
$students = $_REQUEST["students"];
$ta = $_REQUEST["ta"];

session_start();


$dbservername = "127.0.0.1";
$dbusername = "root";
$dbpassword = "";
$dbname = "proj_track";


$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
$success = True;

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	echo "connection failed\n";
}

$sql = "INSERT INTO groups VALUES (DEFAULT, " . $ta["user_id"] . ", '" . $group_name . "', 100, '');";
$result = $conn->query($sql);
if ($result == 1) {
	//echo "success";
	$group_id = $conn->insert_id;
}
else {
	$success = False;
}


foreach ($students as $student) {
	$sql = "UPDATE users SET group_id=" . $group_id . " WHERE user_id=" . $student["user_id"];
	$result = $conn->query($sql);
	if ($result == 1) {
		//echo "success";
	}
	else {
		$success = False;
	}
}

if ($success == True) {
	echo "success";
}
else {
	echo "There was an error.";
}


$conn->close();



?>
