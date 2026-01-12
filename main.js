yourMove = false;

let choiceVar;


function chooseX() {
    choiceVar = "cross";
}

function chooseO() {
    choiceVar = "circle";
}

function fillArea() {
    if yourMove == true {
        if choiceVar == "cross" {

        } else if choiceVar == "circle" {

        } else {

        }
    }
    else {

    }
}

const cells = document.querySelectorAll(".clickable-cell"));

for (const cell of cells) {
    cell.addEventListener("click", fillArea);
}