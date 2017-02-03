<?php

session_start();


$dbservername = "127.0.0.1";
$dbusername = "root";
$dbpassword = "";
$dbname = "proj_track";

$groups = $_POST["groups"];

$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);
$success = True;

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	echo "connection failed\n";
}

foreach ($groups as $group) {
	$sql = "UPDATE groups SET group_rating=" . $group["group_rating"] . ", group_notes='" . $group["group_notes"] . "' WHERE group_id='" . $group["group_id"] . "';";
	if ($conn->query($sql) === TRUE) {
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
	echo "error";
}

$conn->close();



?>
