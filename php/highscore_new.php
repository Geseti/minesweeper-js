<?php
	
	$str_json = file_get_contents('php://input'); //($_POST doesn't work here, use this for JSON)
	$response = json_decode($str_json, TRUE); // decoding received JSON to array
	
	
	
	$name = $response['name'];
	$level = $response['level'];
	$gameTime = $response['gameTime'];
	$datetime = $response['datetime'];
	$session = $response['session'];
	
	
	//update text file with new scores (add to the bottom of the file)
	$file = fopen("\\\\192.168.0.30\\www\\games\\Minesweeper\\v1.00\\php\\highscores.txt", "a+") or die("Unable to open file!");
	$txt = $name . ',' . $level . ',' . $gameTime . ',' . $datetime . ',' . $session;
	fwrite($file, "\r\n" . $txt);
	fclose($file);
	
	
	
	
	
	
	echo json_encode('PHP_Highscore: Success');
	//echo json_encode($txt);
	
	
	
	
	
?>