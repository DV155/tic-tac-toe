let yourMove = false;

let choiceVar;

function openTest() {
    document.getElementById("choice-section").style.display = "block";
}

document.getElementById('start-button').addEventListener('click', openTest);

function openTable() {
    document.getElementById("table-section").removeAttribute("id");
}
function elmntEL(element) {
    element.addEventListener('click', openTable);
}
const choiceButtons = document.getElementsByClassName('choice-button');
Array.from(choiceButtons).forEach(elmntEL);

function chooseX() {
    choiceVar = "cross";
}

function chooseO() {
    choiceVar = "circle";
}

function fillArea() {
    if (yourMove == true) {
        if (choiceVar == "cross") {

        } else if (choiceVar == "circle") {

        } else {

        }
    }
    else {

    }
}

const cells = document.querySelectorAll(".clickable-cell");

for (const cell of cells) {
    cell.addEventListener("click", fillArea);
}