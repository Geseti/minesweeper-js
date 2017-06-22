	
	var lastHighscoreTimeStamp;
	
	function submitHighscore(json_data, func) {
		
		//func is an optional variable
		if (typeof func === 'undefined') { func = 'default'; }
		
		console.log(JSON.stringify(json_data));
		$.ajax({
			type: 'POST',
			url: 'php/highscore_new.php',
			data: JSON.stringify(json_data),
			//data: json_data,
			dataType: 'json'
			//async: false
			
		})
		.done( function( data ) {
			console.log('AJAX_Highscore_New: done');
			console.log(data);
			
			//func to run on success
			func;
			console.log(func);
			
		})
		.fail( function( data ) {
			console.log('AJAX_Highscore_New: fail');
			console.log(data);
			alert('Score failed to submit please try again.');
		});
		
	}
	
	
	function getHighscores() {
		
		$.ajax({
			type: 'GET',
			url: 'php/highscore_get.php',
			//data: JSON.stringify(json_data),
			dataType: 'json'
			//async: false
			
		})
		.done( function( data ) {
			console.log('AJAX_Highscore_Get: done');
			console.log(data);
			
			//table header
			$('#overlay-Highscores-data').append(
					"<div class='rTableRow'>" +
						"<div class='rTableHead'>Initials</div>" +
						"<div class='rTableHead'>Score</div>" +
						"<div class='rTableHead'>Level</div>" +
						"<div class='rTableHead'>Date/Time</div>" +
					"</div>");
					
			//table data
			for (var i = 0; i < data.length; i++) { 
					var initials = data[i].initials;
					var score = data[i].score;
					var level = data[i].level; 
					var datetime = data[i].datetime;
					var sessionx = data[i].session;
					
					//format date
					//var datetime = datetime.replace(/(\r\n|\n|\r)/gm,"");		//removed line breaks at the php stage instead
					var date = new Date(datetime);
					//date = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
					date = date.toLocaleString("en-GB", {timeZone: "Europe/London"});
					//date = date.toString();	//moment
					
					//check whether the score was the newest one added for this session
					//console.log('datetime: ' + datetime + ' timestamp: ' + lastHighscoreTimeStamp);
					if (session === sessionx && datetime === lastHighscoreTimeStamp) {
						//update the style to be blinking
						var strDiv = "<div class='rTableRow' style='animation: blinker-row 0.5s linear infinite;'>";
					} else {
						var strDiv = "<div class='rTableRow'>";
					}
					
					//append row
					$('#overlay-Highscores-data').append(
							strDiv +
							"<div class='rTableCell'>" + initials + "</div>" +
							"<div class='rTableCell'>" + score + "</div>" +
							"<div class='rTableCell'>" + level + "</div>" +
							"<div class='rTableCell'>" + date + "</div>"
						+ "</div>"
					);
				 
				 
			   }
			
			
			
			
		})
		.fail( function( data ) {
			console.log('AJAX_Highscore_Get: fail');
			console.log(data);
		});
		
	}
	
	function topScore(score) {
		
		$.ajax({
			type: 'GET',
			url: 'php/highscore_lowest_high.php'
			//data: JSON.stringify(json_data),
			//dataType: 'json'
			//async: false
			
		})
		.done( function( data ) {
			console.log('AJAX_Highscore_lowest_high: done');
			console.log(data);
			if (score > data) {
				//open highscore entry screen
				openOverlayNewScore();
			}
		})
		.fail( function( data ) {
			console.log('AJAX_Highscore_lowest_high: fail');
			console.log(data);
		});
		
	}