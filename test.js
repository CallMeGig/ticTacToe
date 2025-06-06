
function testGameboard() {
    console.log(gameBoard.placePiece(1,"x"));
    console.log(gameBoard.placePiece(1,"o"));
    console.log(gameBoard.getBoard());
    gameBoard.newBoard()
    console.log(gameBoard.getBoard());
    
};