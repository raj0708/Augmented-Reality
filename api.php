<?php
//Fetching values from url
//database name = "mydata"
//table name = "streetviewdata"

$connection = mysql_connect("localhost", "root", "");
if(!$connection)
{
	die("could not connect: ".mysql_error());
}
$db = mysql_select_db("mydata", $connection);
$result = mysql_query("select ID, ImgLocation, ImagePath, Latitude, Longitude, CardinalDir_Lat, CardinalDir_Lng, Vertlimit_min, Vertlimit_max 
					  from streetviewdata where id={$_POST["ID"]}", $connection);
//$id = {$_POST["ID"]};
echo json_encode(mysql_fetch_assoc($result));

mysql_free_result($result);

mysql_close($connection);
?>




 