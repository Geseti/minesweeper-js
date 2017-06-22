<!DOCTYPE html>
<html>
	<title>Minesweeper</title>
	<?php	include '../../../header.php'; ?>
	<?php session_start(); ?>
	<script>
		
		var session = '<?php echo session_id() ?>';
		
	</script>
	
	
	<style>
		canvas {
			//position: fixed;
			//top: 0px;
			//left: 0px;
			background: transparent;
			margin-left: auto;
			margin-right: auto;
			display: block;
			//width: 320px;
			
		}
		#blockLayer {
			//z-index: -2;
		}
		#main {
			z-index: -1;
		}
		#ship {
			z-index: 0;
		}
		.score {
			position: fixed;
			color: #FF7F00;
			font-family: Helvetica, sans-serif;
			cursor: default;
			font-size: 20px;
			font-size: 3vw;
		}
		.game-over {
			//position: relative;
			//top: 120px;
			//margin: 0 auto;
			//left: 210px;
			//color: #FF7F00;
			font-family: Helvetica, sans-serif;
			font-size: 30px;
			font-size: 5vw;
			cursor: default;
			//display: none;
			text-align: center;
		}
		.restart:hover {
			color: #FFD700;
		}
		.gameover {
			cursor: default;
			position: relative;
		}
		.restart {
			cursor: pointer;
			position: relative;
		}
		@media only screen and (min-width: 600px) {
			.score {
				font-size: 20px;
			}
			.game-over {
				font-size: 30px;
			}
			
		}
		@media only screen and (max-width: 600px) {
			.game-over span {
				top: -50px;
				left: calc(0% - 125px);
			}
		}
		
		//disable long-press (right click) on elements -> search options in mobile browsers
		.container {
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			//-webkit-tap-highlight-color:rgba(0,0,0,0);
			-ms-touch-select:   none;
			-ms-touch-action:   none;
		}
		
		.radio-inputs div {
			padding-left: 10px;
			padding-right: 10px;
			display:inline-block;
		}
		
	</style>
	
	<body>
		
		<?php include '../../../navbar-fixed-top.php'; ?>
		
		<div class='container' style="padding: 0px; ">
			
			<div class='container-menu radio-inputs' style='text-align: center;' oncontextmenu="return false;" style="padding: 10px; text-align:center; width: 200px; ">
			
				<div>
					<input type="radio" name="difficulty" value="0" checked="checked" onclick="difficultyChange(this)"> Beginner<br>
				</div>
				<div>
					<input type="radio" name="difficulty" value="1" onclick="difficultyChange(this)"> Intermediate<br>
				</div>
				<div>
					<input type="radio" name="difficulty" value="2" onclick="difficultyChange(this)"> Expert
				</div>
				
			</div>
			
			
			<div class='container-menu' style='text-align: center;' oncontextmenu="return false;">
				
				<div class='container flag-counter' style="padding: 10px; text-align:center; width: 200px; display:inline-block;">
					Flags: <span id='flag-counter'>0</span>
				</div>
				
			
				<div class='container game-buttons' style="padding: 10px; text-align:center; width: 200px; display:inline-block;">
					
					<button class="btn btn-primary btn-md" onclick="game.start()">Start Game</button>
					<!--<button class="btn btn-primary btn-md" onclick="rollMine(10, 100)">Roll Mine</button> -->
					
				</div>
				
				<div class='container timer' style="padding: 10px; text-align:center; width: 200px; display:inline-block;">
					Timer: <span id='timer'>00:00:00</span>
				</div>
				
			</div>
			
			
			<div class='container-canvas' style="width: auto; margin: 0 auto;">
				
				
				<!-- The canvas for the panning background -->
				<canvas id="blockLayer"  class="img-responsive" oncontextmenu="return false;" width="288" height="288" style="border: solid 1px;">
					Your browser does not support canvas. Please try again with a different browser.
				</canvas>
			
			</div>
			
			<div class='container' style="text-align: center; padding: 10px;">
				<button class="btn btn-primary btn-md" onclick="openModalInput()" >New Highscore</button>
			</div>
			
			<div class='container game-over' id='game-over' style='padding: 0px;'>
				<span id='gameover'></span>
			</div>
			
			
			
		</div> <!-- /container -->	
		
		
		
		<!-- The new score overlay -->
		<div id="highscoreEntry" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false" href="#" style="text-align: center;">
			
			<div class="modal-dialog modal-sm">
				
				<!-- Modal content-->
				<div class="modal-content">
				
					<div class="modal-header">
						<!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
						<h4 class="modal-title">New top 10 score!</h4>
					</div>
					
					<div class="modal-body">
						<p id="modal-content">
							Please enter your name:
						</p>
						<input class="input-md" id="input-name" type="text" maxlength="25" style="text-align: center;"><br><br>
						<button class="btn btn-success btn-sm" id="submit-highscore" type="submit" onclick="submitNewScore()" data-dismiss="modal" >Submit</button>
						<button class="btn btn-danger btn-sm" data-dismiss="modal" >Cancel</button>
					</div>
					
					
				</div>
			</div>
			
		</div>
		
		
		
		
		
		<?php include '../../../bootstrap-core-js.php'; ?>
	</body>
	
	
	<!-- Game script files -->
	<script src=".\js\minesweeper.js"></script>
	<script src=".\js\keycodes.js"></script>
	<script src=".\js\highscore.js"></script>
	
	<script>
		
		//update offsets for cell presses (doesn't account for scaling on the canvas)
		window.onresize = function(event) {
			
			offsetX = document.getElementById('blockLayer').offsetLeft;
			offsetY = document.getElementById('blockLayer').offsetTop;
			
		}
		
		openModalInput = function() {
			//data-toggle="modal" data-target="#highscoreEntry"
			//document.getElementById('input-name').value = null;
			$('#input-name').val('');
			$('#highscoreEntry').modal('show');
			
		}
		
		closeModalInput = function() {
			//data-toggle="modal" data-target="#highscoreEntry"
			//document.getElementById('input-name').value = null;
			$('#highscoreEntry').modal('hide');
			
		}
		
		submitNewScore = function() {
				
			var name = document.getElementById('input-name').value;
			var level = game.level;
			var gameTime = document.getElementById('timer').innerHTML;
			var localeTime = new Date();	//javascipt new Date(var) only can handle var that is utc
			//localeTime.setHours(localeTime.getHours() - localeTime.getTimezoneOffset() / 60);
			//localeTime = localeTime.toUTCString();
			
			//global variable for comparison
			lastHighscoreTimeStamp = localeTime.toJSON();	
			//session is a global variable set on the php page;
			
			
			var json_data = {"name":name, "level":level, "gameTime":gameTime, "datetime":localeTime, "session":session};
			//var json_data = { "initials":"KRP" };
			
			//console.log(json_data);
			submitHighscore(json_data);
			
		}
		
		
		
		
	</script>
	
	
	
	
</html>