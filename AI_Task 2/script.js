const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const human = "X";
const ai = "O";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", playerMove);
});

function playerMove(e){
    let index = e.target.dataset.index;

    if(board[index] !== "" || gameOver) return;

    board[index] = human;
    e.target.textContent = human;

    if(checkWinner(board, human)){
        statusText.textContent = "🎉 You Win!";
        gameOver = true;
        return;
    }

    if(isDraw()){
        statusText.textContent = "🤝 Match Draw!";
        gameOver = true;
        return;
    }

    statusText.textContent = "🤖 AI Thinking...";

    setTimeout(()=>{
        aiMove();
    },500);
}

function aiMove(){
    let bestScore = -Infinity;
    let move;

    for(let i=0;i<9;i++){
        if(board[i] === ""){
            board[i] = ai;
            let score = minimax(board,0,false);
            board[i] = "";

            if(score > bestScore){
                bestScore = score;
                move = i;
            }
        }
    }

    board[move] = ai;
    cells[move].textContent = ai;

    if(checkWinner(board, ai)){
        statusText.textContent = "🤖 AI Wins!";
        gameOver = true;
        return;
    }

    if(isDraw()){
        statusText.textContent = "🤝 Match Draw!";
        gameOver = true;
        return;
    }

    statusText.textContent = "Your Turn (X)";
}

function minimax(board, depth, isMaximizing){

    if(checkWinner(board, ai)) return 1;
    if(checkWinner(board, human)) return -1;
    if(board.every(cell => cell !== "")) return 0;

    if(isMaximizing){
        let bestScore = -Infinity;

        for(let i=0;i<9;i++){
            if(board[i] === ""){
                board[i] = ai;
                let score = minimax(board, depth+1, false);
                board[i] = "";
                bestScore = Math.max(score,bestScore);
            }
        }
        return bestScore;
    }
    else{
        let bestScore = Infinity;

        for(let i=0;i<9;i++){
            if(board[i] === ""){
                board[i] = human;
                let score = minimax(board, depth+1, true);
                board[i] = "";
                bestScore = Math.min(score,bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinner(board, player){
    return winPatterns.some(pattern=>{
        return pattern.every(index=>board[index]===player);
    });
}

function isDraw(){
    return board.every(cell => cell !== "");
}

function restartGame(){
    board = ["","","","","","","","",""];
    gameOver = false;

    cells.forEach(cell=>{
        cell.textContent = "";
    });

    statusText.textContent = "Your Turn (X)";
}