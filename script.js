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

const checkoutTable = {
    170: "T20, T20, D25",
    167: "T20, T19, D25",
    164: "T20, T18, D25",
    161: "T20, T17, D25",
    160: "T20, T20, D20",
    158: "T20, T20, D19",
    157: "T20, T19, D20",
    156: "T20, T20, D18",
    155: "T20, T19, D19",
    154: "T20, T18, D20",
    153: "T20, T19, D18",
    152: "T20, T20, D16",
    151: "T20, T17, D20",
    150: "T20, T18, D18",
    149: "T20, T19, D16",
    148: "T20, T16, D20",
    147: "T20, T17, D18",
    146: "T20, T18, D16",
    145: "T20, T15, D20",
    144: "T20, T20, D12",
    143: "T20, T17, D16",
    142: "T20, T14, D20",
    141: "T20, T15, D18",
    140: "T20, T20, D10",
    139: "T20, T13, D20",
    138: "T20, T18, D12",
    137: "T20, T15, D16",
    136: "T20, T20, D8",
    135: "T20, T17, D12",
    134: "T20, T14, D16",
    133: "T20, T19, D8",
    132: "T20, T16, D12",
    131: "T20, T13, D16",
    130: "T20, T18, D8",
    129: "T19, T16, D12",
    128: "T18, T18, D8",
    127: "T20, T17, D8",
    126: "T19, T19, D6",
    125: "T20, T15, D10",
    124: "T20, T14, D11",
    123: "T20, T17, D6",
    122: "T20, T16, D8",
    121: "T20, T11, D14",
    120: "T20, 20, D20",
    119: "T19, 10, D20",
    118: "T20, 18, D20",
    117: "T19, 20, D20",
    116: "T20, 16, D20",
    115: "T19, 18, D20",
    114: "T20, 14, D20",
    113: "T19, 16, D20",
    112: "T20, 12, D20",
    111: "T20, 19, D16",
    110: "T20, 18, D16",
    109: "T20, 17, D16",
    108: "T20, 16, D16",
    107: "T19, 18, D16",
    106: "T20, 10, D18",
    105: "T19, 16, D16",
    104: "T20, 12, D16",
    103: "T19, 10, D18",
    102: "T20, 6, D18",
    101: "T20, 9, D16",
    100: "T20, D20",
    99: "T19, 10, D16",
    98: "T20, D19",
    97: "T19, D20",
    96: "T20, D18",
    95: "T19, D19",
    94: "T18, D20",
    93: "T19, D18",
    92: "T20, D16",
    91: "T17, D20",
    90: "T18, D18",
    89: "T19, D16",
    88: "T16, D20",
    87: "T17, D18",
    86: "T18, D16",
    85: "T15, D20",
    84: "T20, D12",
    83: "T17, D16",
    82: "T14, D20",
    81: "T15, D18",
    80: "T20, D10",
    79: "T13, D20",
    78: "T18, D12",
    77: "T15, D16",
    76: "T20, D8",
    75: "T17, D12",
    74: "T14, D16",
    73: "T19, D8",
    72: "T16, D12",
    71: "T13, D16",
    70: "T18, D8",
    69: "T19, D6",
    68: "T20, D4",
    67: "T17, D8",
    66: "T18, D6",
    65: "T19, D4",
    64: "T16, D8",
    63: "T13, D12",
    62: "T10, D16",
    61: "T15, D8",
    60: "T20, D20",
    50: "D25",
    40: "D20",
    38: "D19",
    36: "D18",
    34: "D17",
    32: "D16",
    30: "D15",
    28: "D14",
    26: "D13",
    24: "D12",
    22: "D11",
    20: "D10",
    18: "D9",
    16: "D8",
    14: "D7",
    12: "D6",
    10: "D5",
    8: "D4",
    6: "D3",
    4: "D2",
    2: "D1",
    1: "Nicht möglich",
};

// Function to calculate the 3-darter average
function calculateThreeDartAverage(totalPoints, dartsThrown) {
    if (dartsThrown === 0) return 0; // Avoid division by zero
    return ((totalPoints / dartsThrown) * 3).toFixed(2);
}

// Update the 3-darter average for a player
function updateThreeDartAverage(playerId) {
    const player = players[playerId];
    const average = calculateThreeDartAverage(player.totalPoints, player.dartsThrown);
    elements[`player${playerId}Average`].textContent = average;
}

// Event listener for starting the game
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

// Event listener for submitting throws with the "Bestätigen" button
elements.submitThrowsButton.addEventListener("click", submitThrows);

// Event listener for submitting throws with the Enter key
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        submitThrows();
    }
});

// Funktion zum Anzeigen der Gewinner-Box
function showWinnerBox(winnerName) {
    const winnerBox = document.getElementById("winner-box");
    const winnerMessage = document.getElementById("winner-message");
    const restartButton = document.getElementById("restart-game");

    // Gewinner-Nachricht setzen
    winnerMessage.textContent = `${winnerName} hat das Spiel gewonnen!`;

    // Gewinner-Box anzeigen
    winnerBox.style.display = "block";

    // Event-Listener für den "Neues Spiel starten"-Button
    restartButton.addEventListener("click", () => {
        winnerBox.style.display = "none"; // Gewinner-Box ausblenden
        resetGame(); // Spiel zurücksetzen
    });
}

// Gewinner-Logik im submitThrows() integrieren
function submitThrows() {
    const throwValues = elements.throwInputs.map(input => parseInt(input.value) || 0);

    // Validate throws
    if (throwValues.some(value => value > 60)) {
        alert("Ein Wurf darf maximal 60 Punkte betragen!");
        return;
    }

    const totalPoints = throwValues.reduce((sum, value) => sum + value, 0);

    // Update player data
    const currentPlayerData = players[currentPlayer];
    const previousScore = currentPlayerData.score; // Save the previous score

    currentPlayerData.score -= totalPoints;

    // Check if the player has exceeded the required score
    if (currentPlayerData.score < 0) {
        alert("Zu viele Punkte! Die Punktzahl bleibt unverändert.");
        currentPlayerData.score = previousScore; // Reset to the previous score
    } else if (currentPlayerData.score === 0) {
        // Check if the last dart was a double
        const lastThrow = throwValues[throwValues.length - 1];
        if (lastThrow % 2 !== 0) {
            alert("Das Spiel kann nur mit einer Doppelnummer abgeschlossen werden!");
            currentPlayerData.score = previousScore; // Reset to the previous score
        } else {
            // Player wins
            showWinnerBox(currentPlayerData.name); // Gewinner-Box anzeigen
            return;
        }
    }

    currentPlayerData.dartsThrown += throwValues.length; // Increment darts thrown
    currentPlayerData.totalPoints += totalPoints; // Increment total points scored

    // Update UI
    elements[`player${currentPlayer}Score`].textContent = `Punkte: ${currentPlayerData.score}`;
    updateThreeDartAverage(currentPlayer); // Update the 3-darter average
    updateRoundHistory(currentPlayerData.name, throwValues, currentPlayerData.score);

    // Switch turn
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateTurnIndicator();
    checkForCheckout(players[currentPlayer].score);

    // Reset throw inputs
    elements.throwInputs.forEach(input => (input.value = ""));
}

// Update the turn indicator
function updateTurnIndicator() {
    elements.turnIndicator.textContent = `Es ist ${players[currentPlayer].name} dran.`;
    document.getElementById("player1").classList.toggle("active", currentPlayer === 1);
    document.getElementById("player2").classList.toggle("active", currentPlayer === 2);
}

// Update the round history
function updateRoundHistory(playerName, throws, remainingScore) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${roundNumber}</td>
        <td>${playerName}</td>
        <td>${throws.join(", ")}</td>
        <td>${remainingScore}</td>
    `;
    elements.roundHistoryTable.appendChild(row);
    if (currentPlayer === 2) roundNumber++;
}

// Check for checkout suggestions
function checkForCheckout(score) {
    elements.checkoutHelp.textContent = checkoutTable[score] || "Nicht möglich";
}

// Reset the game and swap starting players
function resetGame() {
    // Swap players
    const tempPlayer = players[1];
    players[1] = players[2];
    players[2] = tempPlayer;

    // Reset scores and averages
    players[1].score = 501;
    players[2].score = 501;
    players[1].dartsThrown = 0;
    players[1].totalPoints = 0;
    players[2].dartsThrown = 0;
    players[2].totalPoints = 0;

    // Update UI
    elements.player1Display.textContent = players[1].name;
    elements.player2Display.textContent = players[2].name;
    elements.player1Score.textContent = "Punkte: 501";
    elements.player2Score.textContent = "Punkte: 501";
    elements.player1Average.textContent = "0.00";
    elements.player2Average.textContent = "0.00";

    elements.roundHistoryTable.innerHTML = ""; // Clear the round history

    // Set the new starting player
    currentPlayer = 1;
    roundNumber = 1;

    updateTurnIndicator();
    checkForCheckout(players[currentPlayer].score);
}
