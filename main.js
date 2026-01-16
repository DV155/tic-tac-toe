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

const elementIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
const winPatterns = [ ['c1', 'c2', 'c3'], ['c4', 'c5', 'c6'], ['c7', 'c8', 'c9'],
['c1', 'c4', 'c7'], ['c2', 'c5', 'c8'], ['c3', 'c6', 'c9'], ['c1', 'c5', 'c9'], ['c7', 'c5', 'c3']]

function updateTurn() {
    roundTracking.textContent = `Turn number ${turnNum}. `;  
}

function computerMove() { //Rudimentary logic for computer to move randomly; to be replaced later; minimax?
    const randomIndex = Math.floor(Math.random() * 9);
    const compPosition = document.getElementById(elementIds[randomIndex]);
    if (compPosition.squareFilled == true) {
        computerMove();
        return;
    }
    if (choiceVar == "cross") {
        fillSquare(compPosition, "circle");
    } else if (choiceVar == "circle") {
        fillSquare(compPosition, "cross");
    }
    yourMove = true;
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
    square.setAttribute("class", "squareFilled");
    square.squareFilled = true;
    if ((yourMove == true) && (choiceVar == "cross")) {
        square.appendChild(imgX.cloneNode(true));
    } else if ((yourMove == false) && (choiceVar == "cross")) {
        square.appendChild(imgO.cloneNode(true));
    } else if ((yourMove == true) && (choiceVar == "circle")) {
        square.appendChild(imgO.cloneNode(true));
    } else {
        square.appendChild(imgX.cloneNode(true));
    }
}

function fillSquare(square, symbol) {
   if (square.squareFilled == true) {
       alert("Square already filled! Choose another!");
       return;
   }
    turnNum++;
    updateTurn();
   square.setAttribute("class", "squareFilled");
   square.squareFilled = true;
   square.appendChild(symbol === "cross" ? imgX.cloneNode(true) : imgO.cloneNode(true));
}
function fillArea(event) {
    const square = event.currentTarget;
    if ((yourMove == true) && (gameOngoing == true)) { //Sanity check

        yourMove = false;
        if (choiceVar == "cross") {
            fillSquare(square, "cross")
        } else if (choiceVar == "circle") {
            fillSquare(square, "circle")
        }
        computerMove();
    } else {
        alert("Wait for your turn in the game!");
    }
}

const cells = document.querySelectorAll(".clickable-cell");

for (const cell of cells) {
    cell.addEventListener("click", fillArea);
}

