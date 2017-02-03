<?php

session_start();
$netid = $_SESSION["netid"];
$user_type = $_SESSION["user_type"];

if ($user_type != "student") {
	echo "Error - not student asking for student info";
}
else {

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

	$data = new StdClass();

			//all tas
			$sql = "SELECT * FROM users WHERE user_type='ta';";
			$result = $conn->query($sql);
			$tas = [];
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$ta = array("first_name"=>$row["first_name"], "last_name"=> $row["last_name"],
							  "netid"=>$row["netid"], "user_type"=>$row["user_type"], "user_id"=>$row["user_id"]);
					array_push($tas, $ta);
				}
			}
			$data->{"tas"} = $tas;

			//get my group id.
			//get all group members

			//my group - group info, ta info, group members
			$sql = "SELECT * FROM groups LEFT JOIN users ON groups.group_id=users.group_id WHERE users.netid = '" . $netid . "';";
			$result = $conn->query($sql);
			$groups = [];
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$group = array("group_name"=>$row["group_name"], "ta_name"=> $row["netid"], "group_rating"=>$row["group_rating"]);
					array_push($groups, $group);
				}
			}
			$data->{"groups"} = $groups;

			//all assignments

			//my grades




		$data = json_encode($data);
		echo $data;

	$conn->close();

}


?>
