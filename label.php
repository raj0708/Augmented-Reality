<?php
//Fetching values from url
//database name = "mydata"
//table name = "sprites"

$connection = mysql_connect("localhost", "root", "");
if(!$connection)
{
	die("could not connect: ".mysql_error());
}
$db = mysql_select_db("mydata", $connection);
$result = mysql_query("select ID, ImgLocation, Latitude, Longitude
					  from sprites", $connection);

while ($row = mysql_fetch_assoc($result))
{
	$data[] = array('ID' => $row['ID'], 'Imgloc' => $row['ImgLocation'], 'lat' => $row['Latitude'], 'lng' => $row['Longitude']);	
}

echo json_encode($data);

//mysql_free_result($result);
mysql_close($connection);
?>