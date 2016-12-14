<?php 

session_start();
$username = $_SESSION["username"];
$user_type = $_SESSION["user_type"];

if ($user_type != "instructor") {
	echo "Error - not instructor asking for instructor info";
}
else {

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

			//what do i need for instructor
			//all students
			$sql = "SELECT * FROM users, groups, groups_to_students WHERE user_type='student' and users.user_id = groups_to_students.user_id and groups.group_id=groups_to_students.group_id;";
			$result = $conn->query($sql);
			$students = [];
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$student = array("first_name"=>$row["first_name"], "last_name"=> $row["last_name"],
							  "netid"=>$row["netid"], "user_type"=>$row["user_type"], 
							  "group_name"=>$row["group_name"], "rating"=>$row["rating"]);
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
							  "netid"=>$row["netid"], "user_type"=>$row["user_type"]);
					array_push($tas, $ta);
				}
			}
			$data->{"tas"} = $tas;
			
			$sql = "SELECT * FROM groups, groups_to_students, users WHERE groups.group_id=groups_to_students.group_id;";
			$result = $conn->query($sql);
			$groups = [];
			if ($result->num_rows > 0) {
				while ($row = $result->fetch_assoc()) {
					$group = array("group_name"=>$row["group_name"], "ta_name"=> $row["last_name"],
							  "netid"=>$row["netid"], "user_type"=>$row["user_type"]);
					array_push($groups, $group);
				}
			}
			$data->{"groups"} = $groups;
			
			//all groups
			
			//all assignments
			
			//all grades

		
		
		
		$data = json_encode($data);
		echo $data;

	$conn->close();

}


?>