<?php

//$database name = "mydata"
//$table name = "streetviewdata"
//$servername = "localhost";

define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASSWORD", "");
define("DB_DATABASE", "mydata");

//$db = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

$mysqli = new mysqli("localhost", "root", "", "mydata");

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

$uid = $_POST["ID"];
//$query = "select * from streetviewdata where uid=?";
$query = "select ID, ImgLocation, ImagePath, Latitude, Longitude, CardinalDir_Lat, CardinalDir_Lng, Vertlimit_min, Vertlimit_max 
				  from streetviewdata where id=?"; 

if($stmt = $mysqli->prepare($query)){

$userid = $uid;
$stmt->bind_param('i', $userid);
$stmt->execute();
$result = $stmt->get_result();
		echo json_encode(mysqli_fetch_assoc($result));
		mysqli_free_result($result);

}
else{
	
  	var_dump($mysqli->error);
}
		
$mysqli->close();

?>




 
