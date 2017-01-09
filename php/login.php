<?php 

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

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

$data = new StdClass();

$sql = "SELECT * FROM users WHERE netid='". $username . "' AND password='". $password . "';";
$result = $conn->query($sql);
$user = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
		$user = array("first_name"=>$row["first_name"], "last_name"=> $row["last_name"],
					  "netid"=>$row["netid"], "user_type"=>$row["user_type"]);
	}
	
$_SESSION["netid"] = $user["netid"];	
$_SESSION["user_type"] = $user["user_type"];
	
	$data->{"user"} = $user;
	
	
	$data = json_encode($data);
	echo $data;
}
else {
	echo "error";
}

$conn->close();



?>