
/*-------------------------------- Constants --------------------------------*/
//define possible winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/
//initialize variables
let board; //represents state of the board
let turn; //current Players turn
let winner; //check if there's a winner
let tie; //check if there's a tie


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr'); // all square elements
const messageEl = document.getElementById('message'); // displays the game message
const boardEl = document.querySelector('.board'); // the board element
const resetBtnEl = document.getElementById('reset'); // the reset button element


/*-------------------------------- Functions --------------------------------*/

// initialize the game, render the board and message
function init() {
    console.log('Initializing the game...');
    board = ['', '', '', '', '', '', '', '', '']; //empty board
    turn = 'X'; // x starts the game
    winner = false; // no initial winner
    tie = false; // no inital tie
    render(); //render the initial state
}

//render board and message
function render() {
    updateBoard(); //update the board with current values
    updateMessage(); // update message based on game state
}

//update the board state with current values
function updateBoard () {
    board.forEach((cell, index) => {
        squareEls[index].textContent = cell; //set the text content of each square
    });
}

//update the game message
function updateMessage() {
    if (winner) {
        messageEl.textContent = `Congratulations, Player ${turn} wins!`; //display winner
    } else if (tie) {
        messageEl.textContent = `It's a tie!`; //display tie
    } else {
        messageEl.textContent = `Player ${turn}'s turn`; //display turn
    }
}

//place current player's piece
function placePiece(index) {
    board[index] = turn //set the board at index to the current player's turn
}

// check for a winner
function checkForWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if(board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = true; //set winner to true if a win combo is found
            return;
        }
    }
}

//check for a tie
function checkForTie() {
    if(winner) {
        return; //if there's a winner, won't check for a tie
    }
    tie = !board.includes(''); //if the board has no empty squares, it's a tie
}

//switch current player's turn
function switchPlayerTurn() {
    if (winner) {
        return; //if there's a winner, won't switch turns
    }
    if (turn === 'X') {
        turn = "O";
    } else {
        turn ='X';
    }
}

//handle a square being clicked
function handleClick(event) {
    const clickedElement = event.target; //get the clicked element

    if(!clickedElement.classList.contains('sqr')) {
        return; //returns if clicked element is not a square
    }
    const squareIndex = parseInt(clickedElement.id); //index of the clicked square

    if(board[squareIndex] !== '' || winner) {
        return; //returns if the square is already filled or there is a winnner
    }

    
    placePiece(squareIndex); //place current player's piece
    checkForWinner(); //check if current player won
    checkForTie(); //check if the game is a tie
    switchPlayerTurn(); //switch turn
    render(); //render the updated state
}


/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('DOMContentLoaded', init); //initializes the game when the page is loaded
boardEl.addEventListener('click', handleClick); // handles clicks
resetBtnEl.addEventListener('click', init); //reset the game when clicked