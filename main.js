let yourMove = false;

let gameOngoing = false;

let choiceVar;

let victor;

let turnNum = 0;

var imgO = document.createElement("img");
imgO.src = "circleasset.png";
var imgX = document.createElement("img");
imgX.src = "crossasset.png";

const roundTracking = document.getElementById("turn-tracking");

const conclusion = document.getElementById("game-conclusion");

function updateTurn() {
    roundTracking.textContent = `Turn number ${turnNum}. `;  
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
    gameOngoing = false;
    yourMove = false;
    turnNum = 0;
    conclusion.textContent = `Game Over! ${victor} wins in ${turnNum} turns! Reload page to play again.`;
}

function chooseO() {
    if (gameOngoing == false) {
        choiceVar = "circle";
        gameOngoing = true;
        updateTurn();
    }
    else {
        alert("Game is already ongoing");
    }
}

function fillArea(event) {
    const square = event.currentTarget;
    if ((yourMove == true) && (gameOngoing == true)) { //Sanity check

        if (square.squareFilled == true) {
            alert("Square already filled! Choose another!");
            return;
        }

        turnNum++;
        updateTurn();

        if (choiceVar == "cross") {
            square.setAttribute("class", "squareFilled");
            square.appendChild(imgX.cloneNode(true));
            square.squareFilled = true;
        } else if (choiceVar == "circle") {
            square.setAttribute("class", "squareFilled");
            square.appendChild(imgO.cloneNode(true));
            square.squareFilled = true;
        }
    } else {
        alert("Wait for your turn in the game!");
    }
}

const cells = document.querySelectorAll(".clickable-cell");

for (const cell of cells) {
    cell.addEventListener("click", fillArea);
}