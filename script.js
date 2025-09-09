let currentPlayer = 1;
let roundNumber = 1;
const players = {
    1: { name: "", score: 501, dartsThrown: 0, totalPoints: 0 },
    2: { name: "", score: 501, dartsThrown: 0, totalPoints: 0 },
};
const elements = {
    startPage: document.getElementById("start-page"),
    gameView: document.getElementById("game-view"),
    player1NameInput: document.getElementById("player1-name"),
    player2NameInput: document.getElementById("player2-name"),
    startButton: document.getElementById("start-game"),
    player1Display: document.getElementById("player1-display"),
    player2Display: document.getElementById("player2-display"),
    player1Score: document.getElementById("player1-score"),
    player2Score: document.getElementById("player2-score"),
    player1Average: document.getElementById("player1-average"),
    player2Average: document.getElementById("player2-average"),
    throwInputs: [
        document.getElementById("throw1"),
        document.getElementById("throw2"),
        document.getElementById("throw3"),
    ],
    submitThrowsButton: document.getElementById("submit-throws"),
    turnIndicator: document.getElementById("turn-indicator"),
    checkoutHelp: document.getElementById("checkout-help"),
    roundHistoryTable: document.querySelector("#round-history tbody"),
};
const checkoutTable = { /* wie gehabt, unverändert */ };

function calculateThreeDartAverage(totalPoints, dartsThrown) {
    if (dartsThrown === 0) return 0;
    return ((totalPoints / dartsThrown) * 3).toFixed(2);
}
function updateThreeDartAverage(playerId) {
    const player = players[playerId];
    const average = calculateThreeDartAverage(player.totalPoints, player.dartsThrown);
    elements[`player${playerId}Average`].textContent = average;
}
elements.startButton.addEventListener("click", () => {
    const player1Name = elements.player1NameInput.value.trim();
    const player2Name = elements.player2NameInput.value.trim();
    if (player1Name && player2Name) {
        players[1].name = player1Name;
        players[2].name = player2Name;
        elements.player1Display.textContent = player1Name;
        elements.player2Display.textContent = player2Name;
        elements.startPage.style.display = "none";
        elements.gameView.style.display = "block";
        updateTurnIndicator();
        checkForCheckout(players[currentPlayer].score);
    } else {
        alert("Bitte beide Spielernamen eingeben!");
    }
});
elements.submitThrowsButton.addEventListener("click", submitThrows);
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        submitThrows();
    }
});
function showWinnerBox(winnerName) {
    const winnerBox = document.getElementById("winner-box");
    const winnerMessage = document.getElementById("winner-message");
    const restartButton = document.getElementById("restart-game");
    winnerMessage.textContent = `${winnerName} hat das Spiel gewonnen!`;
    winnerBox.style.display = "block";
    restartButton.addEventListener("click", () => {
        winnerBox.style.display = "none";
        resetGame();
    });
}

function submitThrows() {
    const throwValues = elements.throwInputs.map(input => parseInt(input.value) || 0);
    if (throwValues.some(value => value > 60)) {
        alert("Ein Wurf darf maximal 60 Punkte betragen!");
        return;
    }
    const totalPoints = throwValues.reduce((sum, value) => sum + value, 0);
    const currentPlayerData = players[currentPlayer];
    const previousScore = currentPlayerData.score;
    currentPlayerData.score -= totalPoints;

    if (currentPlayerData.score < 0) {
        alert("Zu viele Punkte! Die Punktzahl bleibt unverändert.");
        currentPlayerData.score = previousScore;
    } else if (currentPlayerData.score === 0) {
        const lastThrow = throwValues[throwValues.length - 1];
        if (lastThrow % 2 !== 0) {
            alert("Das Spiel kann nur mit einer Doppelnummer abgeschlossen werden!");
            currentPlayerData.score = previousScore;
        } else {
            showWinnerBox(currentPlayerData.name);
            return;
        }
    }

    currentPlayerData.dartsThrown += throwValues.length;
    currentPlayerData.totalPoints += totalPoints;
    elements[`player${currentPlayer}Score`].textContent = `Punkte: ${currentPlayerData.score}`;
    updateThreeDartAverage(currentPlayer);

    updateRoundHistory(currentPlayerData.name, throwValues, currentPlayerData.score);

    // Nach jedem Durchgang beider Spieler, also wenn Spieler 1 wieder dran ist, die Runde erhöhen!
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    if (currentPlayer === 1) {
        roundNumber++;
    }
    updateTurnIndicator();
    checkForCheckout(players[currentPlayer].score);
    elements.throwInputs.forEach(input => (input.value = ""));
}

function updateTurnIndicator() {
    elements.turnIndicator.textContent = `Es ist ${players[currentPlayer].name} dran.`;
    document.getElementById("player1").classList.toggle("active", currentPlayer === 1);
    document.getElementById("player2").classList.toggle("active", currentPlayer === 2);
}

function updateRoundHistory(playerName, throws, remainingScore) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${roundNumber}</td>
        <td>${playerName}</td>
        <td>${throws.join(", ")}</td>
        <td>${remainingScore}</td>
    `;
    elements.roundHistoryTable.appendChild(row);
}

function checkForCheckout(score) {
    elements.checkoutHelp.textContent = checkoutTable[score] || "Nicht möglich";
}

function resetGame() {
    const tempPlayer = players[1];
    players[1] = players[2];
    players[2] = tempPlayer;
    players[1].score = 501;
    players[2].score = 501;
    players[1].dartsThrown = 0;
    players[1].totalPoints = 0;
    players[2].dartsThrown = 0;
    players[2].totalPoints = 0;
    elements.player1Display.textContent = players[1].name;
    elements.player2Display.textContent = players[2].name;
    elements.player1Score.textContent = "Punkte: 501";
    elements.player2Score.textContent = "Punkte: 501";
    elements.player1Average.textContent = "0.00";
    elements.player2Average.textContent = "0.00";
    elements.roundHistoryTable.innerHTML = "";
    currentPlayer = 1;
    roundNumber = 1;
    updateTurnIndicator();
    checkForCheckout(players[currentPlayer].score);
}
