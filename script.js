const gameBoard = (() => {
    // declares an array with 9 empty tile spots
    let board =  Array(9);

    function init() {
        // fills each tile with whitespace
        board.fill(" ");
    };
    function getBoard() {
        // returns the board array
        return board;
    };
    function newBoard() {
        // uses init to clear the board array
        init();
    };

    function placePiece(index, marker) {
        // places a marker on the board at the given index and returns true,
        // returns false if the position is filled
        let valid;
        board[index] == " "? (board[index] = marker, valid = true):valid =false;
        return valid;
    };

    init();

    return {
        getBoard,
        newBoard,
        placePiece
    }
})();
console.log(gameBoard.placePiece(1,"x"));
console.log(gameBoard.placePiece(1,"o"));
console.log(gameBoard.getBoard());
gameBoard.newBoard()
console.log(gameBoard.getBoard());
const arr = Array(2);
console.log(arr);
