let boxes = document.querySelectorAll(".box");
let clickSound = new Audio('click.mp3')
let pAgain = new Audio('playAgain.mp3');
let winSound = new Audio('win.mp3');
let drawSound = new Audio('draw.mp3');
let turnX = document.getElementById("X")
let turnO = document.getElementById("O")

let turn = "X";
let isGameOver = false;

boxes.forEach(e =>{
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
        clickSound.play();
        if(!isGameOver && e.innerHTML === ""){
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    })
})

function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
        turnO.style.color = "#262626"
        turnX.style.color = "#ffffff"
        
    }
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
        turnX.style.color = "#262626"
        turnO.style.color = "#ffffff"
    }
}

function checkWin(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            winSound.play();
            document.querySelector("#results").innerHTML = turn + " Won!";
            document.querySelector("#play-again").style.display = "inline"

            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#ffffff"
                boxes[winConditions[i][j]].style.border = "2px solid #ff7f11"
                boxes[winConditions[i][j]].style.color = "#222222"
            }
        }
    }
}

function checkDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        if(isDraw){
            isGameOver = true;
            drawSound.play();
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}

document.querySelector("#play-again").addEventListener("click", ()=>{
    pAgain.play();
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    turnX.style.color = "#262626"
    turnO.style.color = "#ffffff"
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.removeProperty("border");
        e.style.color = "#fff"
    })
})
