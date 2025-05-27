const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');
const closePopup = document.getElementById('closePopup');
const replayButton = document.getElementById('replayButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let turnsTaken = 0;

// Winning conditions: the indices of the cells that need to be filled for a win
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check the game status
function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return gameState.includes("") ? null : "draw";
}

// Handle cell clicks
function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (gameState[cellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    turnsTaken++;

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        resultMessage.textContent = winner === "draw" ? "It's a Draw!" : `Congratulations! ${winner} Won`;
        resultScreen.classList.remove('hidden');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Start a new game and auto-close popup
function startNewGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    turnsTaken = 0;
    currentPlayer = turnsTaken % 2 === 0 ? 'X' : 'O'; // Alternate turn on new game start
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = "");

    // Auto-close the popup if it's open
    resultScreen.classList.add('hidden');
}

// Close the result popup manually
closePopup.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
});

// Replay the game (reset everything)
replayButton.addEventListener('click', startNewGame);

// Attach event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
newGameButton.addEventListener('click', startNewGame);
