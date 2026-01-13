let yourMove = false;

let gameOngoing = false;

let choiceVar;

let turnNum = 0;

function openTest() {
    document.getElementById("choice-section").style.display = "block";
}

document.getElementById('start-button').addEventListener('click', openTest); //Lines 9-13: Opening the colour choice buttons

function openTable() {
    document.getElementById("table-section").removeAttribute("id");
}
function elmntEL(element) {
    element.addEventListener('click', openTable); 
}
const choiceButtons = document.getElementsByClassName('choice-button');
Array.from(choiceButtons).forEach(elmntEL); //Lines 15-22: Opening the board

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

function chooseO() {
    if (gameOngoing == false) {
        choiceVar = "circle";
        gameOngoing = true;
    }
    else {
        alert("Game is already ongoing");
    }
}

function fillArea() {
    if ((yourMove == true) && (gameOngoing == true)) { //Sanity check
        turnNum++;
        if (choiceVar == "cross") {

        } else if (choiceVar == "circle") {

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