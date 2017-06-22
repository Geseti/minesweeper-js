

	/**
	 * Define an object to hold all our images for the game so images
	 * are only ever created once. This type of object is known as a
	 * singleton.
	 */
	var imageRepository = new function() {
		// Define images
		this.block = new Image();
		this.flag = new Image();
		this.mine = new Image();
		this.n0 = new Image();
		this.n1 = new Image();
		this.n2 = new Image();
		this.n3 = new Image();
		this.n4 = new Image();
		this.n5 = new Image();
		this.n6 = new Image();
		this.n7 = new Image();
		this.n8 = new Image();
		this.cross = new Image();
		
		// Ensure all images have loaded before starting the game
		var numImages = 12;
		var numLoaded = 0;
		function imageLoaded() {
			numLoaded++;
			if (numLoaded === numImages) {
				window.init();
			}
		}
		this.block.onload = function() {
			imageLoaded();
		}
		this.flag.onload = function() {
			imageLoaded();
		}
		this.mine.onload = function() {
			imageLoaded();
		}
		this.n0.onload = function() {
			imageLoaded();
		}
		this.n1.onload = function() {
			imageLoaded();
		}
		this.n2.onload = function() {
			imageLoaded();
		}
		this.n3.onload = function() {
			imageLoaded();
		}
		this.n4.onload = function() {
			imageLoaded();
		}
		this.n5.onload = function() {
			imageLoaded();
		}
		this.n6.onload = function() {
			imageLoaded();
		}
		this.n7.onload = function() {
			imageLoaded();
		}
		this.n8.onload = function() {
			imageLoaded();
		}
		this.cross.onload = function() {
			imageLoaded();
		}
		
		// Set images src
		//this.block.src = "imgs/tileBlue_01.png";
		//this.flag.src = "imgs/pieceBlue_single16.png";
		/*
		this.block.src = "imgs/element_blue_square_glossy.png";
		this.flag.src = "imgs/pieceRed_single18.png";
		this.mine.src = "imgs/pieceBlack_single10.png";
		this.n0.src = "";
		this.n1.src = "imgs/Numbers-1-icon.png";
		this.n2.src = "imgs/Numbers-2-icon.png";
		this.n3.src = "imgs/Numbers-3-icon.png";
		this.n4.src = "imgs/Numbers-4-icon.png";
		this.n5.src = "imgs/Numbers-5-icon.png";
		this.n6.src = "imgs/Numbers-6-icon.png";
		this.n7.src = "imgs/Numbers-7-icon.png";
		this.n8.src = "imgs/Numbers-8-icon.png";
		*/
		
		this.block.src = "imgs/2000px-Minesweeper_unopened_square.png";
		this.flag.src = "imgs/2000px-Minesweeper_flag.png";
		this.mine.src = "imgs/Gnome-gnomine.png";
		this.n0.src = "imgs/2000px-Minesweeper_0.png";
		this.n1.src = "imgs/2000px-Minesweeper_1.png";
		this.n2.src = "imgs/2000px-Minesweeper_2.png";
		this.n3.src = "imgs/2000px-Minesweeper_3.png";
		this.n4.src = "imgs/2000px-Minesweeper_4.png";
		this.n5.src = "imgs/2000px-Minesweeper_5.png";
		this.n6.src = "imgs/2000px-Minesweeper_6.png";
		this.n7.src = "imgs/2000px-Minesweeper_7.png";
		this.n8.src = "imgs/2000px-Minesweeper_8.png";
		this.cross.src = "imgs/2000px-Red_Cross.png";
		
		
		
	}
	
	/**
	 * Creates the Drawable object which will be the base class for
	 * all drawable objects in the game. Sets up default variables
	 * that all child objects will inherit, as well as the default
	 * functions.
	 */
	function Drawable() {
		this.init = function(x, y, width, height) {
			// Default variables
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}
		
		this.canvasWidth = 0;
		this.canvasHeight = 0;
		this.type = "";
		
		// Define abstract function to be implemented in child objects
		this.draw = function() {
		};
		this.move = function() {
		};
		this.hide = function() {
			//this.style.visibility = 'hidden';
		};
	}
	
	//Beginner 			9 x 9		10 mines
	//Intermediate		16 x 16		40 mines
	//Expert			16 x 30		99 mines
	
	//on change of radio buttons change the canvas size
	setCanvas = function(opt) {
			
			
			var blockLayerCanvas = document.getElementById('blockLayer');
			
			if ( opt === 0 ) {
				
				blockLayerCanvas.width="288";
				blockLayerCanvas.height="288";
				
			} else if ( opt === 1 ) {
				
				blockLayerCanvas.width="512";
				blockLayerCanvas.height="512";
				
			} else {
				
				blockLayerCanvas.width="960";
				blockLayerCanvas.height="512";
				
			}
			
		}
		
	difficultyChange = function(radio) {
		
		stopwatch.stop();
		stopwatch.reset();
		
		opt = Number(radio.value);
		radioValue = opt;
		setCanvas(opt);
		game.start();
		
	}
	
	var radioValue = 0;				//default to beginner difficulty
	var offsetX = document.getElementById('blockLayer').offsetLeft;
	var offsetY = document.getElementById('blockLayer').offsetTop;
	
	function Game() {
		
		this.loaded = false;
		this.cells = [];										//blocks array
		this.gridRowSize = 9;
		this.gridColSize = 9;
		this.gridSize = this.gridRowSize * this.gridColSize;
		this.gridSizeCounter = this.gridSize;
		this.noMines = 10;
		this.noMinesCounter = this.noMines;
		this.emptyCheck = [];									//array for checking empty cells to clear in a batch
		this.drag = false;
		this.state = 'ready'									//game state for determining ready, in-play, game-over, etc
		this.emptyCells = this.gridSize - this.noMines;			//empty cells to check for game success
		this.flagCounter = this.noMines
		
		var self = this;	//for passing to external callback functions
		
		
		
		
		
		
		this.init = function() {
			
			// Get the canvas elements
			this.blockLayerCanvas = document.getElementById('blockLayer');
			
			//left click cell
			this.blockLayerCanvas.addEventListener('click', function(event) {
				var x = event.pageX - offsetX;
				var y = event.pageY - offsetY;
				//console.log('left clicked on canvas: ' + x + ', ' + y);
				
				// Collision detection between clicked offset and element.
				self.cells.forEach(function(cell) {
					//console.log(block.x);
					if (y > cell.y && y < cell.y + cell.height && x > cell.x && x < cell.x + cell.width) {
						console.log('cell left clicked: ' + cell.x + ', ' + cell.y + ' coords: ' + cell.col + ', ' + cell.row);
						cell.clear();
					}
				});
				
			}, false);
			
			//right click cell
			this.blockLayerCanvas.addEventListener('contextmenu', function(event) {
				var x = event.pageX - offsetX;
				var y = event.pageY - offsetY;
				//console.log('right clicked on canvas: ' + x + ', ' + y);
				
				// Collision detection between clicked offset and element.
				self.cells.forEach(function(cell) {
					//console.log(block.x);
					if (y > cell.y && y < cell.y + cell.height && x > cell.x && x < cell.x + cell.width) {
						console.log('cell right clicked: ' + cell.x + ', ' + cell.y + ' coords: ' + cell.col + ', ' + cell.row);
						cell.flag();
					}
				});
				
				
			}, false);
			
			//mouse down cell
			this.blockLayerCanvas.addEventListener('mousedown', function(event) {
				
				if ( self.state != 'game-over' ) {
				
					//check for left click (note that this varies between browser and should probably use jQuery method for the browser support
					if (event.button === 0) {
					
						var x = event.pageX - offsetX;
						var y = event.pageY - offsetY;
						//console.log('right clicked on canvas: ' + x + ', ' + y);
						
						// Collision detection between clicked offset and element.
						self.cells.forEach(function(cell) {
							//console.log(block.x);
							if (y > cell.y && y < cell.y + cell.height && x > cell.x && x < cell.x + cell.width) {
								//console.log('cell left clicked: ' + cell.x + ', ' + cell.y + ' coords: ' + cell.col + ', ' + cell.row);
								self.drag = true;
								cell.pressed();
							}
						});
					}
					
				}
				
				return false;
				
			}, false);
			
			//mouse up cell
			this.blockLayerCanvas.addEventListener('mouseup', function(event) {
				
				if ( self.state != 'game-over' ) {
					
					if (event.button === 0) {
						var x = event.pageX - offsetX;
						var y = event.pageY - offsetY;
						//console.log('right clicked on canvas: ' + x + ', ' + y);
						
						// Collision detection between clicked offset and element.
						self.cells.forEach(function(cell) {
							//console.log(block.x);
							if (y > cell.y && y < cell.y + cell.height && x > cell.x && x < cell.x + cell.width) {
								//console.log('cell left clicked: ' + cell.x + ', ' + cell.y + ' coords: ' + cell.col + ', ' + cell.row);
								cell.released();
								self.drag = false;
							}
						});
					}
					
				}
			}, false);
			
			//mouse move cell
			this.blockLayerCanvas.addEventListener('mousemove', function(event) {
				
				if ( self.state != 'game-over' ) {
					
					if (event.button === 0) {
						if (self.drag) {
						
							var x = event.pageX - offsetX;
							var y = event.pageY - offsetY;
							
						}
						//console.log('right clicked on canvas: ' + x + ', ' + y);
						
						// Collision detection between clicked offset and element.
						
						self.cells.forEach(function(cell) {
							//console.log(block.x);
							if (y > cell.y && y < cell.y + cell.height && x > cell.x && x < cell.x + cell.width) {
								//console.log('cell left clicked: ' + cell.x + ', ' + cell.y + ' coords: ' + cell.col + ', ' + cell.row);
								cell.pressed();
								//cell.released();
							} else {
								cell.released();
							}
							
						});
					
					}
				
				}
				
			}, false);
			
			//might need a leave canvas event handler if one exists
			
			
			//check if canvas is supported by the browser
			if (this.blockLayerCanvas.getContext) {
				this.blockLayerContext = this.blockLayerCanvas.getContext('2d');
				
				// Initialize objects to contain their context and canvas
				// information
				//Background.prototype.context = this.bgContext;
				//Background.prototype.canvasWidth = this.bgCanvas.width;
				//Background.prototype.canvasHeight = this.bgCanvas.height;
				Cell.prototype.context = this.blockLayerContext;
				Cell.prototype.canvasWidth = this.blockLayerCanvas.width;
				Cell.prototype.canvasHeight = this.blockLayerCanvas.height;
				
				// Initialize a block object
				//this.block = new Block();
				// Set the ship to start near the bottom middle of the canvas
				//var shipStartX = 32;
				//var shipStartY = 32;
				//this.block.init(shipStartX, shipStartY, imageRepository.block.width,
				//				   imageRepository.block.height);
				
				
				console.log('Game Pieces Loaded');
				
				this.loaded = true;
				
				return true;
				
			} else {
				return false;
			}
		};
		
		
		this.difficulty = function(level) {
			
			if ( level === 0 ) {
				
				this.noMines = 10;
				this.gridRowSize = 9;
				this.gridColSize = 9;
				
			} else if ( level === 1 ) {
				
				this.noMines = 40;
				this.gridRowSize = 16;
				this.gridColSize = 16;				
				
			} else {
				
				this.noMines = 99;
				this.gridRowSize = 16;
				this.gridColSize = 30;
				
			}
			
			this.gridSize = this.gridRowSize * this.gridColSize;
			this.gridSizeCounter = this.gridSize;
			this.noMinesCounter = this.noMines;
			this.emptyCells = this.gridSize - this.noMines;			//empty cells to check for game success
			this.flagCounter = this.noMines
			
			offsetX = document.getElementById('blockLayer').offsetLeft;
			offsetY = document.getElementById('blockLayer').offsetTop;
			
			this.level = level;
			
		}
		
		
		
		this.drawGrid = function() {
			
			//var height = imageRepository.block.height;
			//var width = imageRepository.block.width;
			var height = 32;
			var width = 32;
			var x = 0;						//start x
			var y = 0;						//start y
			var r = 0;						//row
			var c = 0;						//col
			
			var row = 0;					//makes handling zero based array easier / clearer
			var col = 0;					//makes handling zero based array easier / clearer
			var rowSize = game.gridRowSize - 1;	//-1 due to zero based array
			var colSize = game.gridColSize - 1	//-1 due to zero based array
			
			var mineRoll;					//variable to hold the function result
			var mine;						//variable to set if object is a mine true/false
			
			
			for (var i = 0; i <= rowSize; i++) {
				
				for (var j = 0; j <= colSize; j++) {
					//console.log("Position_x: " + r + " Position_y: " + c);
					
					
					//setTimeout(function() {
					
						//self.block.init(c, r, width, height);
						//self.block.draw();
						
					//}, 3000
					//);
					//drawDelay(c, r, width, height, self.block.draw);
					
					//roll to see whether a cell is a mine
					mineRoll = rollMine(game.noMinesCounter,game.gridSizeCounter);
					if (mineRoll === 1) {
						mine = true;
						game.noMinesCounter -= 1;
					} else {
						mine = false;
					}
					
					game.gridSizeCounter -= 1;
					
					//create a new cell block
					var block = new Cell();
					block.init(c, r, width, height, row, col, mine);
					block.draw();
					//console.log('block drawn, i: ' + i + ', j: ' + j);
					game.cells.push(block);
					
					c = c + width;
					col += 1;
					
					//new row and reset column
					if (j === colSize) {
						r += height;
						c = x;
						
						row += 1;
						col = 0;
						
						
					}
					
				}
			}
			
			//reset counter for use in other functions
			game.noMinesCounter = game.noMines;
			
		}
		
		this.loadNumbers = function() {
			//	 If X is a mine then we update the surrounding numbers
			//   [H, A, B]
			//   [G, X, C]
			//   [F, E, D]
			
			cellsT = toMatrix(game.cells, game.gridColSize);
			
			var x;
			var y;
			var Ux = game.gridRowSize - 1;
			var Uy = game.gridColSize - 1;
			
			//loop through the cells array
			//var arrayLength = cells.length;
			for (var i = 0; i <= Ux; i++) {
				//alert(myStringArray[i]);
				//Do something
				
				for (var j = 0; j <= Uy; j++) {
					
					
					//console.log(cellsT[i][j]);
					
					if (cellsT[i][j].mine) {
					
						x = cellsT[i][j].row;
						y = cellsT[i][j].col; 
						console.log('x: ' + x + ' y: ' + y);
						
						//A
						if ( x - 1 >= 0 && x - 1 <= Uy ) {
							if ( !cellsT[x - 1][y].mine ) { 
								cellsT[x - 1][y].no += 1;
								
							}
						}
						
						//B
						if ( y + 1 >= 0 && y + 1 <= Uy && x - 1 >= 0 && x - 1 <= Ux ) {
							if ( !cellsT[x - 1][y + 1].mine ) {
								cellsT[x - 1][y + 1].no += 1;
							}
						}
						
						//C
						if ( y + 1 >= 0 && y + 1 <= Uy ) {
							if ( !cellsT[x][y + 1].mine ) {
								cellsT[x][y + 1].no += 1;
							}
						}
						
						//D
						if ( y + 1  >= 0 && y + 1 <= Uy && x + 1 >= 0 && x + 1 <= Ux ) {
							if ( !cellsT[x + 1][y + 1].mine ) {
								cellsT[x + 1][y + 1].no += 1;
							}
						}
						
						//E
						if ( x + 1 >= 0 && x + 1 <= Ux ) {
							if ( !cellsT[x + 1][y].mine ) {
								cellsT[x + 1][y].no += 1;
							}
						}
						
						//F
						if ( y - 1  >= 0 && y - 1 <= Uy && x + 1 >= 0 && x + 1 <= Ux ) {
							if ( !cellsT[x + 1][y - 1].mine ) {
								cellsT[x + 1][y - 1].no += 1;
							}
						}
						
						//G
						if ( y - 1 >= 0 && y - 1 <= Uy ) {
							if ( !cellsT[x][y - 1].mine ) {
								cellsT[x][y - 1].no += 1
							}
						}
						
						//H
						if ( y - 1 >= 0 && y - 1 <= Uy && x - 1 >= 0 && x - 1 <= Ux ) {
							if ( !cellsT[x - 1][y - 1].mine ) {
								cellsT[x - 1][y - 1].no += 1;
							}
						}
						
					}
					
				}
				
			}
			
		}
		
		this.start = function() {
			
			if ( !this.loaded ) {
				
				alert('Game still initialising...');
			
			} else {
				//this.block.draw();
				document.getElementById('gameover').innerHTML = '';		//clear any previous games outcome
				this.clearGrid();
				this.difficulty(radioValue);
				this.drawGrid();
				this.loadNumbers();
				this.state = 'ready';
				this.emptyCells = this.gridSize - this.noMines;			//reset emptyCell counter
				this.flagCounter = this.noMines							//reset flagCounter
				document.getElementById('flag-counter').innerHTML = this.flagCounter;
				stopwatch.stop();
				stopwatch.reset();
			}
		}
		
		this.clearGrid = function() {
			//resets the game components
			game.cells = [];
			game.gridSizeCounter = game.gridSize;
			game.noMinesCounter = game.noMines;
		}
		
		this.gameOver = function(outcome) {
			
			stopwatch.stop();
			
			//outcome is either true = win / false = lose
			for (var i = 0; i <= game.gridSize - 1; i++) {
				
				game.cells[i].enabled = false;
				
			}
			
			if ( outcome ) {
			
				game.state = 'game-over';
				console.log('game outcome: success');
				document.getElementById('gameover').innerHTML = 'Success!';
				
			} else {
				
				game.state = 'game-over';
				console.log('game outcome: game over');
				document.getElementById('gameover').innerHTML = 'Game Over!';
				
			}
			
		}
		
		
		//on gameover reveal the placement of mines / flags that we're incorrect
		this.revealMines = function() {
			
			for (var i = 0; i < game.cells.length; i++) {
				//check that the cell hasn't already been cleared i.e. it was the mine clicked
				if ( game.cells[i].mine && game.cells[i].cell != 'clear' ) {
					
					game.cells[i].revealMine();
					
				} else if ( !game.cells[i].mine && game.cells[i].cell === 'flag' ) {
					
					game.cells[i].revealCross();
					
				}
			}
			
		}
		
		this.updateFlagCounter = function(add) {
			
			//if add is true flag was place, if false flag was removed
			if ( add ) {
				this.flagCounter += 1;
			} else {
				this.flagCounter -= 1;
			}
			
			document.getElementById('flag-counter').innerHTML = this.flagCounter;
			
		}
		
		//on press of an empty cells (no === 0) cascade remove other empty cells
		this.clearEmpty = function() {
			
			clearBlock = function(block) { 
				
				//don't double clear cells
				if ( block.cell != 'clear' && block.cell != 'flag' ) {
				
					var num = 'n' + block.no.toString();
					block.cell = 'clear';
					block.context.clearRect(block.x, block.y, block.width, block.height);
					block.context.drawImage(imageRepository[num], block.x, block.y, 32, 32);
					game.emptyCells -= 1;				//reduce the number of empty cells in the game
					console.log('Empty Cells Remaining: ' + game.emptyCells + ' Mines Remaining: ' + game.noMines + ' Total Cells Remaining: ' + (game.emptyCells + game.noMines) + ' Last Cell Removed: {row: ' + block.row + ' col: ' + block.col + '}' );
					
				}
				
			}
			
			checkBlock = function(block) {
				
				if ( block.no === 0 && block.cell === 'block' ) {
					
					//push cell to be checked
					game.emptyCheck.push(block);
					
				}
				
				clearBlock(block);
				
			}
			
			//transpose cells array into i x j grid array
			cellsT = toMatrix(game.cells, game.gridColSize);
			var Ux = game.gridRowSize - 1;
			var Uy = game.gridColSize - 1;
			var block;
			
			for (var i = 0; i < game.emptyCheck.length; i++) {
				
				//console.log(game.emptyCheck[i]);
				
				var x = game.emptyCheck[i].row;
				var y = game.emptyCheck[i].col; 
				//console.log('x: ' + x + ' y: ' + y);
				
				//A
				if ( x - 1 >= 0 && x - 1 <= Uy ) {
					
					block = cellsT[x - 1][y];
					
					if ( !block.mine ) {
						checkBlock(block);
					}
				}
				
				
				//B
				if ( y + 1 >= 0 && y + 1 <= Uy && x - 1 >= 0 && x - 1 <= Ux ) {
					
					block = cellsT[x - 1][y + 1];
					
					if ( !block.mine ) {
						checkBlock(block);
					}
				}
				
				//C
				if ( y + 1 >= 0 && y + 1 <= Uy ) {
					
					block = cellsT[x][y + 1];
					
					if ( !block.mine ) {
						checkBlock(block);
					}
				}
				
				//D
				if ( y + 1  >= 0 && y + 1 <= Uy && x + 1 >= 0 && x + 1 <= Ux ) {
					
					block = cellsT[x + 1][y + 1];
					
					if ( !block.mine ) {
						checkBlock(block);
					}
				}
				
				//E
				if ( x + 1 >= 0 && x + 1 <= Ux ) {
					
					block = cellsT[x + 1][y];
					console.log('x: ' + (x + 1) + ' y: ' + y);
					if ( !block.mine ) {
						checkBlock(block);
					}
				}
				
				//F
				if ( y - 1  >= 0 && y - 1 <= Uy && x + 1 >= 0 && x + 1 <= Ux ) {
					
					block = cellsT[x + 1][y - 1];
					
					if ( !block.mine ) {
						checkBlock(block);
					}
				}
				
				//G
				if ( y - 1 >= 0 && y - 1 <= Uy ) {
					
					block = cellsT[x][y - 1];
					
					if ( !block.mine ) {
						checkBlock(block);
					}
				}
				
				//H
				if ( y - 1 >= 0 && y - 1 <= Uy && x - 1 >= 0 && x - 1 <= Ux ) {
					
					block = cellsT[x - 1][y - 1];
					
					if ( !block.mine ) {
						checkBlock(block);
					}
				}
				
			}
		}
		
	}
	
	
	drawDelay = function(bloc, c, r, w, h, callback) {
					setTimeout(function() {
						//console.log("Immunity Expired");
						//bloc.init(c, r, w, h);
						//blocks.push(bloc);
						
						//var enemy = new Enemy();
						//enemy.init(0, 0, imageRepository.enemy.width, imageRepository.enemy.height);
						//pool[i] = enemy;
						
						
						callback();
					}, 250)
			};
	
	function toMatrix(arr, width) {
	  return arr.reduce(function (rows, key, index) { 
		return (index % width == 0 ? rows.push([key]) 
		  : rows[rows.length-1].push(key)) && rows;
	  }, []);
	}
	
	
	/**
	 * Initialize the Game and starts it.
	 */
	var game = new Game();
	var stopwatch = new StopWatch();
	
	function init() {
		/*
		if(game.init()) {
			game.start();
		}
		*/
		game.init();
	}
	
	
	function Cell() {
		
		var self = this;
		
		
		
		this.init = function(x, y, width, height, row, col, mine) {
			// Defualt variables
			this.x = x;				//drawing starting position
			this.y = y;				//drawing starting position
			this.width = width;		//drawing width
			this.height = height;	//drawing height
			this.row = row;			//grid row
			this.col = col;			//grid col
			this.cell = 'block';	//current cell type		/block/flag/clear
			this.enabled = true;	//disable cells on game-over
			this.mine = mine;		//is the cell a mine or not
			this.no = 0;			//cell number for mine detection
			
		}
		
		this.draw = function() {
			
			//console.log(self.x + ' ' + self.y + ' ' + self.width);
			self.context.drawImage(imageRepository.block, self.x, self.y, 32, 32);
			
		};
		
		this.clear = function() {
			
			if (self.cell === 'block' && self.enabled) {
				
				if(self.mine) {
					self.cell = 'clear';
					self.context.clearRect(self.x, self.y, self.width-1, self.height-1);		//-1 to leave grid lines on removal of block
					
					self.context.beginPath();
					self.context.rect(self.x, self.y, 32, 32);
					self.context.fillStyle = "red";
					self.context.fill();
					
					
					self.context.drawImage(imageRepository.mine, self.x, self.y, 32, 32);
					
					game.revealMines();
					game.gameOver(false);
					
				} else {
					
					//start stopwatch if this is the first button press
					if ( game.emptyCells === (game.gridSize - game.noMines)) {
						stopwatch.start();
					}
					
					if (self.no === 0) {
						
						var num = 'n' + self.no.toString();
						self.cell = 'clear';
						self.context.clearRect(self.x, self.y, self.width, self.height);
						self.context.drawImage(imageRepository[num], self.x, self.y, 32, 32);
						
						
						//push after setting to clear to remove possiblity of double counting on cascade: clearEmpty()
						game.emptyCheck = [];			//reset array on click
						game.emptyCheck.push(self);		//push the first cell to check
						game.clearEmpty();				//check cells and clear
						
						
					} else if (self.no > 0) {
						
						//display the mine detected number
						var num = 'n' + self.no.toString();
						self.cell = 'clear';
						self.context.clearRect(self.x, self.y, self.width, self.height);
						self.context.drawImage(imageRepository[num], self.x, self.y, 32, 32);
						
						
						
					}
					
					//reduce the number of empty cells in the game
					game.emptyCells -= 1;				//needs to be in if so that it is not double counted on cascade: clearEmpty()
					console.log('Empty Cells Remaining: ' + game.emptyCells + ' Mines Remaining: ' + game.noMines + ' Total Cells Remaining: ' + (game.emptyCells + game.noMines) + ' Last Cell Removed: {row: ' + self.row + ' col: ' + self.col + '}' );
					
					
					if ( game.emptyCells === 0 ) {
						
						game.gameOver(true);			//true = win / false = lose
						
					}
					
				}
				
			} else if (self.cell === 'clear') {
				//don't clear a cell that has already been cleared
			} else if (self.cell === 'flag') {
				//don't clear a cell that has been flagged
			}
			
		}
		
		//used to reveal mine but keep transparent background
		this.revealMine = function() {
			
			//if the cell is correctly flagged then leave it as a flag i.e. only show mines that weren't found
			if ( self.cell != 'flag' ) {
			
				self.cell = 'clear';
				self.context.clearRect(self.x, self.y, self.width-1, self.height-1);		//-1 to leave grid lines on removal of block
				self.context.drawImage(imageRepository.n0, self.x, self.y, 32, 32);			//background layer
				self.context.drawImage(imageRepository.mine, self.x, self.y, 32, 32);
				
			}
			
		}
		
		this.revealCross = function() {
			
			self.cell = 'clear';
			self.context.clearRect(self.x, self.y, self.width-1, self.height-1);		//-1 to leave grid lines on removal of block
			self.context.drawImage(imageRepository.n0, self.x, self.y, 32, 32);			//background layer
			self.context.drawImage(imageRepository.mine, self.x, self.y, 32, 32);
			self.context.drawImage(imageRepository.cross, self.x, self.y, 32, 32);		//red cross to show incorrect selection
			
		}
		
		this.flag = function() {
			
			if (self.cell != 'clear') {
			
				if (self.cell === 'block' && self.enabled) {
					self.cell = 'flag';
					self.context.drawImage(imageRepository.flag, self.x, self.y, 32, 32);
					game.updateFlagCounter(false);
				} else if (self.cell === 'flag' && self.enabled) {
					self.cell = 'block';
					self.context.drawImage(imageRepository.block, self.x, self.y, 32, 32);
					game.updateFlagCounter(true);
				}
				
			}
		}
		
		this.pressed = function() {
			
			if (self.cell === 'block' && self.enabled) {
				
				self.context.clearRect(self.x, self.y, self.width, self.height);		//-1 to leave grid lines on removal of block
				self.context.drawImage(imageRepository.n0, self.x, self.y, 32, 32);			//background layer
				
			}
			
		}
		
		this.released = function() {
			
			if (self.cell === 'block' && self.enabled) {
				
				self.context.clearRect(self.x, self.y, self.width, self.height);		//-1 to leave grid lines on removal of block
				self.context.drawImage(imageRepository.block, self.x, self.y, 32, 32);			//background layer
				
			}
			
		}
		
	}
	
	Cell.prototype = new Drawable();
	
	function rollMine(no_mines, no_cells) {
		
		if (no_mines === 0 ) {
			return false;
		}
		
		var x = no_cells / no_mines;
		
		var rand_no = Math.floor((x * Math.random()) + 1)
		
		//console.log(rand_no);
		return rand_no;
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	var stopped;
	
	function StopWatch() {
		
		var div = document.getElementById('timer'),
		tenths = 0, seconds = 0, minutes = 0, hours = 0;
		
		
		var interval = 10; // ms
		var startTime;
		
		var timer;
		
		var self = this;
		
		
		this.add = function() {
			
			setCorrectingInterval( function() {
				
				var t = ( Date.now() - startTime );
				var hundredths = Math.floor(t / 10) % 100;
				var seconds = Math.floor(t / 1000) % 60;
				var minutes = Math.floor(t / 60000) % 60;
				
				var text = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds) + ":" + (hundredths > 9 ? hundredths : "0" + hundredths);
				
				//console.log(tim);
				//console.log('m: ' + minutes + ' s: ' + seconds + ' h: ' + hundredths);
				
				div.innerHTML = text;
				
				//console.log( tim + 'ms elapsed' );
			}, interval );
			
		}
		
		this.start = function() {
			
			stopped = false;
			instance.stopped = false;
			startTime = Date.now();
			self.add();
			//console.log('stopwatch started');
			
		}
		
		this.stop = function() {
			
			stopped = true;
			instance.stopped = true;
			clearTimeout(timer);
			console.log('timer stopped ' + div.innerHTML);
			
		}
		
		this.reset = function() {
			
			div.innerHTML = "00:00:00";
			tenths = 0; 
			seconds = 0; 
			minutes = 0; 
			hours = 0;
			
		}
		
	}
	
	var instance = { };
	//function to self correct javascript timer drift
	setCorrectingInterval = ( function( func, delay ) {
		
		
		function tick( func, delay ) {
			
			if ( !instance.stopped ) {
			
				if ( ! instance.started ) {
					
					instance.func = func;
					instance.startTime = new Date().valueOf();
					instance.delay = delay;
					instance.target = delay;
					instance.started = true;
					//instance.stopped = false;
					setTimeout( tick, delay );
					
				} else {
					
					var elapsed = new Date().valueOf() - instance.startTime,
					adjust = instance.target - elapsed;

					instance.func();
					instance.target += instance.delay;

					setTimeout( tick, instance.delay + adjust );
					
				}
				
			}
			//console.log('stopwatcg instance stopped: ' + instance.stopped);
		};
		
		return tick( func, delay );
		
		
	} );
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	