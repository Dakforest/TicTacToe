// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.cell');
const playerBtns = document.querySelectorAll('.btnPlayer');
const compBtns = document.querySelectorAll('.btnComp');

// Game Variables
let gameIsLive = true;
let xIsNext = true;
let players = 0;
let xIsPlayer = undefined
let oIsPlayer = undefined

// Functions

const handleWin = (letter) => {
	//If a win condition is met, end game, and declare the winner.
	gameIsLive = false; 
	statusDiv.innerHTML = `${letter} has won!`;
}

const checkGameStatus = () => {
	//Link cell codes to the new class X/O added by HandleCellClick
	const a1 = cellDivs[0].classList[1];
	const a2 = cellDivs[1].classList[1];
	const a3 = cellDivs[2].classList[1];
	const b1 = cellDivs[3].classList[1];
	const b2 = cellDivs[4].classList[1];
	const b3 = cellDivs[5].classList[1];
	const c1 = cellDivs[6].classList[1];
	const c2 = cellDivs[7].classList[1];
	const c3 = cellDivs[8].classList[1];
	
	//Begin "Is there a winner?"
	//Check for all possible win conditions.
	if(a1 && a1 === a2 && a1 === a3){handleWin(a1);}
	else if(b1 && b1 === b2 && b1 === b3){handleWin(b1);}
	else if(c1 && c1 === c2 && c1 === c3){handleWin(c1);}
	else if(a1 && a1 === b1 && a1 === c1){handleWin(a1);}
	else if(a2 && a2 === b2 && a2 === c2){handleWin(a2);}
	else if(a3 && a3 === b3 && a3 === c3){handleWin(a3);}
	else if(a1 && a1 === b2 && a1 === c3){handleWin(a1);}
	else if(a3 && a3 === b2 && a3 === c1){handleWin(a3);}
	/*If there are no win conditions met, have all cells been assigned X/O?
	If yes, then declare the game a tie. If no, asign X/O to cell.*/
	else if(a1 && a2 && a3 && b1 && b2 && b3 && c1 && c2 && c3){
		gameIsLive = false; 
		statusDiv.innerHTML = `It's a tie!`;
	} else {
		xIsNext = !xIsNext
		if (xIsNext){
			statusDiv.innerHTML = `X is Next`;
		} else {
			statusDiv.innerHTML = `O is Next`;
		}
	}//End "Is there a winner?"
}//End checkGameStatus()

// Event Handlers
const handleReset = (e) => {
	//Clear all cells of X/O.
	for(const cellDiv of cellDivs) {
		cellDiv.classList.remove("X");
		cellDiv.classList.remove("O");
	}
	
	//Reset game markers.
	gameIsLive = true;
	xIsNext = true;
	players = 0;
	
	//Reset Status to X is next. 
	statusDiv.innerHTML = `X is Next`;
	
};//End handlerReset

const handleCellClick = (e) => {
	//Fetch all classes of clicked cell into an array variable.
	const classList = e.target.classList;
	
	//If clicked cell already has X/O class, end function.
	if (classList[2] === 'X' || classList[2] === 'O'){return;}
	
	//If the game is no longer live, end function.
	if (gameIsLive == false) {return;}
	
	//If X is Next, assign X to cell, and check win conditions.
	if (xIsNext){
		classList.add('X');
		checkGameStatus();
	//Otherwise, assign O to cell, and check win conditions.
	} else {
		classList.add('O');
		checkGameStatus();
	}
};//End handleCellClick

const handlePlayerClick = (e) => {
	players++;
	
	if(players === 0){
		xIsPlayer = true;
	} else if (players === 1){
		oIsPlayer = true;
	} 
};

const handleCompClick = (e) => {
	players++;
	
	
	if(players === 0){
		xIsPlayer = false;
	} else if (players === 1){
		oIsPlayer = false;
	} 
}

// Event Listeners
resetDiv.addEventListener('click', handleReset)

for(const cellDiv of cellDivs) {
	//Cycle through all items in cellDivs array, and assign event listener.
	cellDiv.addEventListener('click', handleCellClick)
}

for(const playerBtn of playerBtns){
	playerBtn.addEventListener('click', handlePlayerClick)
}

for(const compBtn of compBtns){
	compBtn.addEventListener('click', handerCompClick)
}

