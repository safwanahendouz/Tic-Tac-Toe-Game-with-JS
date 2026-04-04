
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    let currentPlayer = 'X';
    let gameActive = true;
});

function handleCellClick(event) {
    const cell = event.target;}
    if (cell.textContent === '' && gameActive) {
        cell.textContent = currentPlayer;
        checkResult();
        switchPlayer();
    }
