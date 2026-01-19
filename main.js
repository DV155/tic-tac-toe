let yourMove = false;

let gameOngoing = false;

let choiceVar;

let gameState = "";

let whoWon;

let victor;

let turnNum = 0;

var imgO = document.createElement("img");
imgO.src = "circleasset.png";
var imgX = document.createElement("img");
imgX.src = "crossasset.png";

const roundTracking = document.getElementById("turn-tracking");

const conclusion = document.getElementById("game-conclusion");

const elementIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
const winPatterns = [ ['c1', 'c2', 'c3'], ['c4', 'c5', 'c6'], ['c7', 'c8', 'c9'],
['c1', 'c4', 'c7'], ['c2', 'c5', 'c8'], ['c3', 'c6', 'c9'], ['c1', 'c5', 'c9'], ['c7', 'c5', 'c3']]

function winSearch() {
    for (const pattern of winPatterns) {
        const cell1 = document.getElementById(pattern[0]);
        const cell2 = document.getElementById(pattern[1]);
        const cell3 = document.getElementById(pattern[2]);

        const crossWins = cell1.classList.contains("has-cross") && 
        cell2.classList.contains("has-cross") && 
        cell3.classList.contains("has-cross");

        const circleWins = cell1.classList.contains("has-circle") && 
        cell2.classList.contains("has-circle") && 
        cell3.classList.contains("has-circle");

        if (crossWins) return "cross";

        if (circleWins) return "circle";
    }

        let allFilled = true;
        for (const id of elementIds) {
            if (!document.getElementById(id).classList.contains("squareFilled")) {
                allFilled = false;
                break;
            }
        }
        if (allFilled) return "tie";
        
        return null;
}
function checkWin() {
    const searchRes = winSearch();
    if (searchRes == "cross") {
        victor = "Cross";
        endGame();
        return whoWon;
    }
    if (searchRes === "circle") {
        victor = "Noughts";
        endGame();
        return whoWon;
    }
    return null;
}
function updateTurn() {
    roundTracking.textContent = `Turn number ${turnNum}. `;  
}

function boardEvaluation() {
    const searchRes = winSearch();
    if (searchRes == "cross") {
        return choiceVar === "cross" ? "player-win" : "ai-win";
    }
    if (searchRes === "circle") {
        return choiceVar === "circle" ? "player-win" : "ai-win";
    }
    if (searchRes === "tie") {
        return "tie";
    }
    return null;
}

function computerMove() {
    bestMove();
    yourMove = true;
}

let scores = {
    "ai-win":10,
    "player-win":-10,
    "tie":0

}

function minimax(board, depth, isMaximising) {
    let winCheck = boardEvaluation()
    if (winCheck !== null) {
        return scores[winCheck];
    }
    if (isMaximising) {
        let bestScore = -Infinity;
        for (const place in elementIds) {
            const compPosition = document.getElementById(elementIds[place]);
            if (!compPosition.classList.contains("squareFilled")) {
                compPosition.classList.add("squareFilled");
                compPosition.classList.add(choiceVar === "cross" ? "has-circle" : "has-cross");
                let curScore = minimax(compPosition, depth + 1, false);
                compPosition.classList.remove("squareFilled", "has-circle", "has-cross");
                bestScore = Math.max(curScore, bestScore)
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (const place in elementIds) {
            const compPosition = document.getElementById(elementIds[place]);
            if (!compPosition.classList.contains("squareFilled")) {
                compPosition.classList.add("squareFilled");
                compPosition.classList.add(choiceVar === "cross" ? "has-cross" : "has-circle");
                let curScore = minimax(compPosition, depth + 1, true);
                compPosition.classList.remove("squareFilled", "has-circle", "has-cross");
                bestScore = Math.min(curScore, bestScore);
            }
        }
        return bestScore;
    } 
}
function bestMove() {
    let bestScore = -Infinity;
    let bestPosition = null;
    for (const place in elementIds) {
        const compPosition = document.getElementById(elementIds[place]);
        if (!compPosition.classList.contains("squareFilled")) {
            compPosition.classList.add("squareFilled");
            compPosition.classList.add(choiceVar === "cross" ? "has-circle" : "has-cross");
            let curScore = minimax(compPosition, 0, false);
            compPosition.classList.remove("squareFilled", "has-circle", "has-cross");
            if (curScore > bestScore) {
                bestScore = curScore;
                bestPosition = compPosition
            }
        }
    }
    if (bestPosition) {
        if (choiceVar == "cross") {
            fillSquare(bestPosition, "circle"); 
        } else if (choiceVar == "circle") {
            fillSquare(bestPosition, "cross");
        }
    }
}


function openTest() {
    document.getElementById("choice-section").style.display = "block";
}

document.getElementById('start-button').addEventListener('click', openTest); //Next 4 lines: Opening the colour choice buttons

function openTable() {
    document.getElementById("table-section").removeAttribute("id");
}
function elmntEL(element) {
    element.addEventListener('click', openTable); 
}
const choiceButtons = document.getElementsByClassName('choice-button');
Array.from(choiceButtons).forEach(elmntEL); //Next  7 lines: Opening the board

function chooseX() {
    if (gameOngoing == false) {
        choiceVar = "cross";
        yourMove = true;
        gameOngoing = true;
        updateTurn();
    }
    else {
        alert("Game is already ongoing");
    }
}

function endGame() {
    const finalTurnNum = turnNum;
    gameOngoing = false;
    yourMove = false;
    if (gameState == "draw") {
        conclusion.textContent = `Game Over! Draw in ${finalTurnNum} turns! Reload page to play again.`;
        whoWon = "tie";
    } else { //SUPERFLOUS CODE??? 
        conclusion.textContent = `Game Over! ${victor} wins in ${finalTurnNum} turns! Reload page to play again.`;
        if (((choiceVar == "cross") && (victor == "Cross")) || ((choiceVar == "circle") && (victor == "Noughts")))  {
            whoWon = "player-win"
        } else if (((choiceVar == "cross") && (victor == "Noughts")) || ((choiceVar == "circle") && (victor == "Cross"))) {
            whoWon = "ai-win";
        }
    }
    turnNum = 0;
}

function chooseO() {
    if (gameOngoing == false) {
        choiceVar = "circle";
        gameOngoing = true;
        updateTurn();
        computerMove();
    }
    else {
        alert("Game is already ongoing");
    }
}

function fillSquare(square, symbol) {
   if (square.squareFilled == true) {
       alert("Square already filled! Choose another!");
       return;
   }
    turnNum++;
    updateTurn();
   square.setAttribute("class", `squareFilled ${symbol === "cross" ? "has-cross" : "has-circle"}`);
   square.squareFilled = true;
   square.appendChild(symbol === "cross" ? imgX.cloneNode(true) : imgO.cloneNode(true));
   checkWin()
}
function fillArea(event) {
    const square = event.currentTarget;
    if ((yourMove == true) && (gameOngoing == true)) { //Sanity check

        yourMove = false;
        if (choiceVar == "cross") {
            fillSquare(square, "cross");
        } else if (choiceVar == "circle") {
            fillSquare(square, "circle");
        }
        if (gameOngoing == true) {
            computerMove();
        }
    } else {
        alert("Wait for your turn in the game!");
    }
}

const cells = document.querySelectorAll(".clickable-cell");

for (const cell of cells) {
    cell.addEventListener("click", fillArea);
}
