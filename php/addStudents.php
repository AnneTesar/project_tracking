<?php

$students = $_POST["students"];

session_start();


$dbservername = "127.0.0.1";
$dbusername = "root";
$dbpassword = "";
$dbname = "proj_track";


$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	echo "connection failed\n";
}

foreach ($students as $student) {

	$sql = "SELECT * FROM users WHERE netid='" . $student["netid"] . "';";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		//echo "This netid already exists!";
	}
	else {
		$sql = "INSERT INTO users (user_id, first_name, last_name, netid, password, user_type, group_id, rating, notes)
		VALUES (DEFAULT, '" . $student["first_name"] . "', '" . $student["last_name"] . "', '" . $student["netid"] . "', 'DefaultPassword', 'student', -1, 100, ' ');";
		$result = $conn->query($sql);

		if ($result == 1) {
			echo "success";
		}
		else {
			echo "There was an insert failure.";
		}
	}

}




$conn->close();



?>
