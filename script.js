let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let gameOver = false;

let cells = document.querySelectorAll(".board button");
let status = document.getElementById("status");

function play(index) {

    if (board[index] !== "" || gameOver) {
        return;
    }

    board[index] = player;
    cells[index].innerText = player;

    checkWinner();

    if (!gameOver) {
        player = player === "X" ? "O" : "X";
        status.innerText = "Player " + player + " Turn";
    }
}

function checkWinner() {

    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let win of wins) {

        let [a, b, c] = win;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            status.innerText = "🎉 Player " + player + " Wins!";
            gameOver = true;
            return;
        }
    }

    if (!board.includes("")) {
        status.innerText = "🤝 It's a Draw!";
        gameOver = true;
    }
}

function restart() {

    board = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    gameOver = false;

    cells.forEach(cell => {
        cell.innerText = "";
    });

    status.innerText = "Player X Turn";
}