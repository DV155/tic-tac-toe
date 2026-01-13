let yourMove = false;

let gameOngoing = false;

let choiceVar;

let victor;

let turnNum = 0;

const conclusion = document.getElementById("game-conclusion");


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
    }
    else {
        alert("Game is already ongoing");
    }
}

function fillArea(square) {
    if ((yourMove == true) && (gameOngoing == true)) { //Sanity check
        turnNum++;
        if ((choiceVar == "cross") && (squareFilled == false)) {
            square.appendChild(drawCross());
            square.element.setAttribute("class", "squareFilled");
        } else if ((choiceVar == "circle") && (squareFilled == false)) {
            square.appendChild(drawCircle());
            square.element.setAttribute("class", "squareFilled");
        } else {

        }
    } else {
        alert("Wait for your turn in the game!");
    }
}

const cells = document.querySelectorAll(".clickable-cell");

for (const cell of cells) {
    cell.addEventListener("click", fillArea);
}