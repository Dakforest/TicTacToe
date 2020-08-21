// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.cell');

// Game Variables
let gameIsLive = true;
let xIsNext = true;

// Functions
const handleWin = (letter) => {
	gameIsLive = false; 
	statusDiv.innerHTML = `${letter} has won!`;
}

const checkGameStatus = () => {
	const a1 = cellDivs[0].classList[2];
	const a2 = cellDivs[1].classList[2];
	const a3 = cellDivs[2].classList[2];
	const b1 = cellDivs[3].classList[2];
	const b2 = cellDivs[4].classList[2];
	const b3 = cellDivs[5].classList[2];
	const c1 = cellDivs[6].classList[2];
	const c2 = cellDivs[7].classList[2];
	const c3 = cellDivs[8].classList[2];
	
	//Begin "Is there a winner?"
	if(a1 && a1 === a2 && a1 === a3){handleWin(a1);}
	else if(b1 && b1 === b2 && b1 === b3){handleWin(b1);}
	else if(c1 && c1 === c2 && c1 === c3){handleWin(c1);}
	else if(a1 && a1 === b1 && a1 === c1){handleWin(a1);}
	else if(a2 && a2 === b2 && a2 === c2){handleWin(a2);}
	else if(a3 && a3 === b3 && a3 === c3){handleWin(a3);}
	else if(a1 && a1 === b2 && a1 === c3){handleWin(a1);}
	else if(a3 && a3 === b2 && a3 === c1){handleWin(a3);}
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
	console.log(e);
};

const handleCellClick = (e) => {
	const location = e.target.classList[1];
	const classList = e.target.classList;
	
	if (classList[2] === 'X' || classList[2] === 'O'){return;}
	if (gameIsLive == false) {return;}
	
	if (xIsNext){
		classList.add('X');
		checkGameStatus();
	} else {
		classList.add('O');
		checkGameStatus();
	}
};

// Event Listeners
resetDiv.addEventListener('click', handleReset)

for(const cellDiv of cellDivs) {
	cellDiv.addEventListener('click', handleCellClick)
}


