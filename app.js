//---------------------------HTML Elements-----------------------------------
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const beginBtn = document.querySelector('.btnBegin');

const cellDivs = document.querySelectorAll('.cell');
const playerBtns = document.querySelectorAll('.btnPlayer');
const compBtns = document.querySelectorAll('.btnComp');





//---------------------------Game Variables----------------------------------
var gameIsLive = true;
var xIsNext = true;
var players = 0;
var xIsPlayer = undefined;
var oIsPlayer = undefined;

//Link cell codes to the new class X/O added by HandleCellClick
var a1 = cellDivs[0].classList[1];
var a2 = cellDivs[1].classList[1];
var a3 = cellDivs[2].classList[1];
var b1 = cellDivs[3].classList[1];
var b2 = cellDivs[4].classList[1];
var b3 = cellDivs[5].classList[1];
var c1 = cellDivs[6].classList[1];
var c2 = cellDivs[7].classList[1];
var c3 = cellDivs[8].classList[1];





//-------------------------------Functions-----------------------------------

const recheckCell = () => {
	//Link cell codes to the new class X/O added by HandleCellClick
	a1 = cellDivs[0].classList[1];
	a2 = cellDivs[1].classList[1];
	a3 = cellDivs[2].classList[1];
	b1 = cellDivs[3].classList[1];
	b2 = cellDivs[4].classList[1];
	b3 = cellDivs[5].classList[1];
	c1 = cellDivs[6].classList[1];
	c2 = cellDivs[7].classList[1];
	c3 = cellDivs[8].classList[1];
}//END recheckCell

const whoTurn = () => {
	
	//Whose turn is it, and are they a player?
	if (xIsNext === true){
		if (xIsPlayer === true){
			return;
		} else {
			compAction();
		}
	} else {
		if (oIsPlayer === true){
			return;
		} else {
			compAction();
		}
	}
};//END whoTurn

const compAction = () => {
	var rndCell = Math.floor(Math.random() * 9);
	var move = true;
	
	//Begin AI Strategy
	if(a1 && a2 && a1 === a2 && !a3){compToken(2);}
	else if(a1 && a3 && a1 === a3 && !a2){compToken(1);}
	else if(a2 && a3 && a2 === a3 && !a1){compToken(0);}
	
	else if(b1 && b2 && b1 === b2 && !b3){compToken(5);}
	else if(b1 && b3 && b1 === b3 && !b2){compToken(4);}
	else if(b2 && b3 && b2 === b3 && !b1){compToken(3);}
	
	else if(c1 && c2 && c1 === c2 && !c3){compToken(8);}
	else if(c1 && c3 && c1 === c3 && !c2){compToken(7);}
	else if(c2 && c3 && c2 === c3 && !c1){compToken(6);}
	
	else if(a1 && b1 && a1 === b1 && !c1){compToken(6);}
	else if(a1 && c1 && a1 === c1 && !b1){compToken(3);}
	else if(b1 && c1 && b1 === c1 && !a1){compToken(0);}
	
	else if(a2 && b2 && a2 === b2 && !c2){compToken(7);}
	else if(a2 && c2 && a2 === c2 && !b2){compToken(4);}
	else if(b2 && c2 && b2 === c2 && !a2){compToken(1);}
	
	else if(a3 && b3 && a3 === b3 && !c3){compToken(8);}
	else if(a3 && c3 && a3 === c3 && !b3){compToken(5);}
	else if(b3 && c3 && b3 === c3 && !a3){compToken(2);}
	
	else if(a1 && b2 && a1 === b2 && !c3){compToken(8);}
	else if(a1 && c3 && a1 === c3 && !b2){compToken(4);}
	else if(b2 && c3 && b2 === c3 && !a1){compToken(0);}
	
	else if(a3 && b2 && a3 === b2 && !c1){compToken(6);}
	else if(a3 && c1 && a3 === c1 && !b2){compToken(4);}
	else if(b2 && c1 && b2 === c1 && !a3){compToken(2);}
	
	else {	
		while (move) {
			if (cellDivs[rndCell].classList[1]) {
				rndCell = Math.floor(Math.random() * 9);
				continue;
			} else {
				compToken(rndCell);
				move = false;
			}
		}//END While Loop
	}//END AI Strategy
};//END compAction

const compToken = (Cell) => {
	if(xIsNext){
		cellDivs[Cell].classList.add("X");
		checkGameStatus();
	} else {
		cellDivs[Cell].classList.add("O");
		checkGameStatus();
	}
}//END compToken

const checkGameStatus = () => {
	
	recheckCell();
	
	//Begin "Is there a winner?"
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
			whoTurn();
		} else {
			statusDiv.innerHTML = `O is Next`;
			whoTurn();
		}
	}//END If-Block "Is there a winner?"
}//END checkGameStatus()

const handleWin = (letter) => {
	//If a win condition is met, end game, and declare the winner.
	gameIsLive = false; 
	statusDiv.innerHTML = `${letter} has won!`;
}//END handleWin





//-----------------------Event Handlers-----------------------------
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
	
	//Reset Styles
	document.getElementById("btnPlayerX").style.display = "initial";
	document.getElementById("btnCompX").style.display = "initial";
	document.getElementById("btnPlayerO").style.display = "initial";
	document.getElementById("btnCompO").style.display = "initial";
	document.getElementById("game").style.display = "none";
	document.getElementById("initPlayers").style.display = "initial";
	
};//End handleReset

const handleCellClick = (e) => {
	//Fetch all classes of clicked cell into an array variable.
	const classList = e.target.classList;
	
	//If clicked cell already has X/O class, end function.
	if (classList[1] === 'X' || classList[1] === 'O'){return;}
	
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
	if(players === 0){
		xIsPlayer = true;
		document.getElementById("btnCompX").style.display = "none";
	} else if (players === 1){
		oIsPlayer = true;
		document.getElementById("btnCompO").style.display = "none";
	} 
	players ++;
};//End handlePlayerClick

const handleCompClick = (e) => {
	if(players === 0){
		xIsPlayer = false;
		document.getElementById("btnPlayerX").style.display = "none";
	} else if (players === 1){
		oIsPlayer = false;
		document.getElementById("btnPlayerO").style.display = "none";
	}
	players ++;
}//End handleCompClick

const handleBegin = (e) => {
	document.getElementById("game").style.display = "block";
	document.getElementById("initPlayers").style.display = "none";
	whoTurn();
}//END handleBegin





//-----------------------------Event Listeners--------------------------------------
resetDiv.addEventListener('click', handleReset)
beginBtn.addEventListener('click', handleBegin)

for(const cellDiv of cellDivs) {
	//Cycle through all items in cellDivs array, and assign event listener.
	cellDiv.addEventListener('click', handleCellClick)
}

for(const playerBtn of playerBtns){
	playerBtn.addEventListener('click', handlePlayerClick)
}

for(const compBtn of compBtns){
	compBtn.addEventListener('click', handleCompClick)
}

