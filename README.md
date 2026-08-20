# 2nd-Project---Tic-tac-toe
A simple and interactive Tic-Tac-Toe (Cross &amp; Zero) game built using HTML, CSS, and JavaScript. 🎮 Players can play X vs O with automatic winner and draw detection, turn tracking, restart functionality, responsive design, and a clean modern interface. 🚀
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Tic-Tac-Toe | Cross & Zero</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #141e30, #243b55);
            color: white;
        }

        .game-container {
            width: 380px;
            max-width: 95%;
            text-align: center;
        }

        h1 {
            font-size: 38px;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #ccc;
            margin-bottom: 25px;
        }

        .status {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 25px;
        }

        .cell {
            height: 110px;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 55px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
        }

        .cell:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.03);
        }

        .cell.x {
            color: #ff5c5c;
        }

        .cell.o {
            color: #5cc8ff;
        }

        button {
            padding: 12px 30px;
            border: none;
            border-radius: 8px;
            background: white;
            color: #243b55;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
        }

        button:hover {
            transform: scale(1.05);
        }

        .winner {
            animation: winner 0.5s infinite alternate;
        }

        @keyframes winner {
            from {
                transform: scale(1);
            }
            to {
                transform: scale(1.05);
            }
        }

        @media (max-width: 450px) {
            .cell {
                height: 90px;
                font-size: 45px;
            }

            h1 {
                font-size: 32px;
            }
        }
    </style>
</head>

<body>

    <div class="game-container">

        <h1>❌ Tic-Tac-Toe ⭕</h1>

        <p class="subtitle">Cross & Zero Game</p>

        <div class="status" id="status">
            Player X's Turn
        </div>

        <div class="board" id="board">

            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>

            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>

            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>

        </div>

        <button id="restartBtn">
            🔄 Restart Game
        </button>

    </div>

    <script>

        const cells = document.querySelectorAll(".cell");
        const status = document.getElementById("status");
        const restartBtn = document.getElementById("restartBtn");

        let board = ["", "", "", "", "", "", "", "",];
        let currentPlayer = "X";
        let gameRunning = true;

        const winningCombinations = [

            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]

        ];

        cells.forEach(cell => {
            cell.addEventListener("click", handleCellClick);
        });

        restartBtn.addEventListener("click", restartGame);


        function handleCellClick() {

            const index = this.getAttribute("data-index");

            if (board[index] !== "" || !gameRunning) {
                return;
            }

            board[index] = currentPlayer;

            this.textContent = currentPlayer;

            this.classList.add(
                currentPlayer === "X" ? "x" : "o"
            );

            checkWinner();

        }


        function checkWinner() {

            let winner = null;
            let winningCells = [];

            for (let combination of winningCombinations) {

                const [a, b, c] = combination;

                if (
                    board[a] !== "" &&
                    board[a] === board[b] &&
                    board[a] === board[c]
                ) {

                    winner = board[a];
                    winningCells = combination;

                    break;
                }
            }

            if (winner) {

                status.textContent = `🎉 Player ${winner} Wins!`;

                gameRunning = false;

                winningCells.forEach(index => {
                    cells[index].classList.add("winner");
                });

                return;
            }


            if (!board.includes("")) {

                status.textContent = "🤝 It's a Draw!";

                gameRunning = false;

                return;
            }


            currentPlayer = currentPlayer === "X" ? "O" : "X";

            status.textContent = `Player ${currentPlayer}'s Turn`;

        }


        function restartGame() {

            board = ["", "", "", "", "", "", "", ""];

            currentPlayer = "X";

            gameRunning = true;

            status.textContent = "Player X's Turn";

            cells.forEach(cell => {

                cell.textContent = "";

                cell.classList.remove("x");
                cell.classList.remove("o");
                cell.classList.remove("winner");

            });

        }

    </script>

</body>
</html>
