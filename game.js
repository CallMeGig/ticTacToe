import player from "./player.js";
import gameBoard from "./script.js";

const game = ((xPlayer, oPlayer) => {
    let board = gameBoard.getBoard();

    if (xPlayer == "") {
        xPlayer = "Player 1";
    }

    if (oPlayer == "") {
        oPlayer = "Player 2"
    }

    const player1 = player(xPlayer, "X");
    const player2 = player(oPlayer, "O");
    let currentPlayer = player1;
    let gameOver = false;
    let ties = 0;
    init();
    function init() {
        board = gameBoard.getBoard();
    }
    function restartGame() {
        gameBoard.newBoard();
        board = gameBoard.getBoard();
        gameOver = false;
        currentPlayer = player1;
        console.log("game start");
    };

    function resetGame() {
        restartGame()
        player1.resetScore()
        player2.resetScore()
    };

    function changePlayer() {
        currentPlayer === player1? currentPlayer = player2 : currentPlayer = player1;
    };

    function playRound(index) {        
        if (gameOver) return "gameover";

        const placed = gameBoard.placePiece(index, currentPlayer.getSymbol());
        if (!placed) return "filled";
        displayBoard();

        const roundResult = evalBoard();

        if (roundResult === "win") {
            gameOver = true;
            updateScore("win");
            return `${getCurrentPlayer().getSymbol()}win`; 
        } else if (roundResult === "tie") {
            gameOver = true;
            updateScore("tie");
            return "tie";
        };

        changePlayer();
        return "continue";
    }

    function displayBoard() {
        // const board = board.getBoard();
        console.log(`${board[0]}|${board[1]}|${board[2]}`)
        console.log(`${board[3]}|${board[4]}|${board[5]}`)
        console.log(`${board[6]}|${board[7]}|${board[8]}`)
    }

    function evalBoard() {
        // returns "win" or "tie" if the game is over
        // const board = board.getBoard();
        let win = false;
        const conds = [[0, 1, 2],
                       [3, 4, 5],
                       [6, 7, 8],
                       [0, 4, 8],
                       [2, 4, 6],
                       [0, 3, 6],
                       [1, 4, 7],
                       [2, 5, 8]];

        for (let arr in conds) {
            if ( (board[conds[arr][0]]  != " ") && (board[conds[arr][0]] == board[conds[arr][1]] && board[conds[arr][1]] == board[conds[arr][2]])) {
                win = true;
                return `win`;
            }
        }

        if (win == false && !board.includes(" ")) {
            return "tie";
        } 
        
    }
    
    function updateScore(result) {
        if (result == "win") {
            currentPlayer.addWin()
        }
        if (result == "tie") {
            ties++;
        }
    };

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function getScore() {
        return [
            player1.getWins(),
            player2.getWins(),
            ties

        ]
    }

    function getPlayerNames() {
        return [player1.getName(), player2.getName()]
    }

    return {
        getPlayerNames,
        getCurrentPlayer,
        changePlayer,
        init,
        playRound, 
        displayBoard, 
        restartGame,
        getScore,
        resetGame
    };
})

export default game;