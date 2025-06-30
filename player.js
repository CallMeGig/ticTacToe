const player = ((name,symbol)=> {
    
    let wins = 0;

    function getName() {
        return name;
    };
    
    function getSymbol() {
        return symbol;
    };
    
    function addWin() {
        wins++;
    };

    function resetScore() {
        wins = 0;
    }

    function getWins() {
        return wins;
    }
    return {
        getName,
        getSymbol,
        getWins,
        addWin,
        resetScore
    };
})

export default player;