<?php 

session_start();


$dbservername = "127.0.0.1";
$dbusername = "root";
$dbpassword = "brooks42";
$dbname = "proj_track";

$students = $_POST["students"];

$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	echo "connection failed\n";
}

foreach ($students as $student) {
	$sql = "UPDATE users SET rating=" . $student["rating"] . ", notes='" . $student["notes"] . "' WHERE netid='" . $student["netid"] . "';";
	if ($conn->query($sql) === TRUE) {
    	//echo "Record updated successfully";
	} 
	else {
    	echo "Error updating record: " . $conn->error;
	}
}

$conn->close();



?>