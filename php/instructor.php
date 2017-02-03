<?php

session_start();
$username = $_SESSION["netid"];
$user_type = $_SESSION["user_type"];

if ($user_type != "instructor") {
	echo "Error - not instructor asking for instructor info";
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

			//all students
			$sql = "SELECT * FROM users LEFT JOIN groups ON users.group_id=groups.group_id WHERE user_type='student';";
			$result = $conn->query($sql);
			$students = [];
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$student = array("first_name"=>$row["first_name"], "last_name"=>$row["last_name"],
							  "netid"=>$row["netid"], "user_id"=>$row["user_id"], "user_type"=>$row["user_type"], "group_id"=>$row["group_id"],
							  "group_name"=>$row["group_name"], "rating"=>$row["rating"], "notes"=>$row["notes"]);
					array_push($students, $student);
				}
			}
			$data->{"students"} = $students;

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

			//all groups
			$sql = "SELECT g.group_id, g.group_name, u.netid, g.group_rating, g.group_notes FROM groups g LEFT JOIN users u ON g.ta_id=u.user_id;";
			$result = $conn->query($sql);
			$groups = [];
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$group = array("group_id"=>$row["group_id"], "group_name"=>$row["group_name"], "ta_name"=> $row["netid"], "group_rating"=>$row["group_rating"], "group_notes"=>$row["group_notes"]);
					array_push($groups, $group);
				}
			}
			$data->{"groups"} = $groups;

			//all assignments

			//all grades




		$data = json_encode($data);
		echo $data;

	$conn->close();

}


?>
