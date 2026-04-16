document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = Array(9).fill('');

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] !== '' || !gameActive) return;

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken', `player-${currentPlayer.toLowerCase()}`);

        if (checkWin()) {
            statusText.innerHTML = `Player <span class="player-${currentPlayer.toLowerCase()}">${currentPlayer}</span> wins! 🎉`;
            gameActive = false;
            highlightWinner();
            resetButton.style.display = 'block';
            return;
        }

        if (checkDraw()) {
            statusText.textContent = "It's a draw! 🤝";
            gameActive = false;
            resetButton.style.display = 'block';
            return;
        }

        switchPlayer();
    }

    function checkWin() {
        return winningCombinations.some(combo => {
            return combo.every(index => boardState[index] === currentPlayer);
        });
    }

    function highlightWinner() {
        winningCombinations.forEach(combo => {
            if (combo.every(index => boardState[index] === currentPlayer)) {
                combo.forEach(index => cells[index].classList.add('winner'));
            }
        });
    }

    function checkDraw() {
        return boardState.every(cell => cell !== '');
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.innerHTML = `Player <span class="player-${currentPlayer.toLowerCase()}">${currentPlayer}</span>'s turn`;
    }

    function resetGame() {
        boardState = Array(9).fill('');
        currentPlayer = 'X';
        gameActive = true;
        statusText.innerHTML = `Player <span class="player-x">X</span>'s turn`;
        resetButton.style.display = 'none';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
    }

    // Attach event listeners
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});