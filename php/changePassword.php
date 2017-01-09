<?php 

$password_current = $_REQUEST["current"];
$password_change = $_REQUEST["change"];

session_start();
$netid = $_SESSION["netid"];	

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

$sql = "SELECT * FROM users WHERE netid='" . $netid . "' AND password='" . $password_current . "';";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	$sql = "UPDATE users SET password='" . $password_change . "' WHERE netid='" . $netid . "';";
	$result = $conn->query($sql);

	if ($result == 1) {
		echo "success";
	}
	else {
		echo "There was an update failure.";
	}
}
else {
	echo "Current password incorrect.";
}



$conn->close();



?>