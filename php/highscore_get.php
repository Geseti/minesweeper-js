<?php
	
	$filePath = '\\\\192.168.0.30\\www\\games\\galaxian\\v1.02\\php\\highscores.txt';
	//$file = fopen($filePath, "r") or die("Unable to open file!");
	
	$file = file_get_contents($filePath);
	$rows = explode("\n", $file);
	
	$rows = array_values(array_filter($rows, "trim"));	//trims out any empty rows
	
	if (empty($rows) || count($rows) < 1) {
		exit();
	}
	
	//parse file into array
	foreach($rows as $row => $data) {
		
		//get row data
		$row_data = explode(',', $data);
		
		$array[$row]['initials']	= $row_data[0];
		$array[$row]['score']		= $row_data[1];
		$array[$row]['level']		= $row_data[2];
		$array[$row]['datetime']	= removeLineBreaks($row_data[3]);
		$array[$row]['session']		= removeLineBreaks($row_data[4]);
		
		
		
		
		
		//display data
		/*
		echo 'Row ' . $row . ' initials: ' . $array[$row]['initials'] . '<br />';
		echo 'Row ' . $row . ' score: ' . $array[$row]['score'] . '<br />';
		echo 'Row ' . $row . ' level: ' . $array[$row]['level'] . '<br />';
		echo 'Row ' . $row . ' level: ' . $array[$row]['datetime'] . '<br />';
		echo 'Row ' . $row . ' session:<br />';
		*/
		
	}
	
	//sort array
	array_multisort(array_column($array, 'score'), SORT_DESC, $array);
	
	//take the top 10
	$array = array_slice($array, 0, 10);
	
	/*
	foreach($array as $row) {
		
		echo $row['initials'].' '; 
		echo $row['score'].'<br>';
		
	}
	*/
	
	//echo $data.'<br>';
	
	//encode to send to javascript
	$json_data = json_encode($array);
	echo $json_data;
	
	
	
	function removeLineBreaks($string) {
		
		$string = trim(preg_replace('/\s\s+/', ' ', $string));
		return $string;
	}
	
	
	
	//fread($file,filesize("highscores.txt"));
	/*
	while (!feof($file)) {
	   $line = fgets($file);
	   echo $line;
	}
	fclose($file);
	*/
	
?>