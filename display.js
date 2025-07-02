import game from "./game.js";

const displayControl = (() => {
    let curGame;
    const domCache = {
        // containers
        outerContainer: document.querySelector(".outer-container"),
        buttonContainer: document.querySelector(".button-container"),
        gameContainer: document.querySelector(".game-container"),
        tieContainer: document.querySelector(".tie-container"),

        // buttons
        newGameBtn: document.querySelector(".new-game"),
        startGameBtn: document.querySelector(".game-start"),
        resetBtn: document.querySelector(".reset"),

        // player 1 elements
        p1Score: document.querySelector(".score.p1"),
        p1Title: document.querySelector(".title.p1"),
        p1Symbol: document.querySelector(".p1 > .symbol"),
        p1Input: document.querySelector(".p1 > input"),

        // player 2 elements 
        p2Score: document.querySelector(".score.p2"),
        p2Title: document.querySelector(".title.p2"),
        p2Symbol: document.querySelector(".p2 > .symbol"),
        p2Input: document.querySelector(".p2 > input"),

        // Logo
        logo: document.querySelector(".mid-header > h1"),

        // tie card
        tieTitle: document.querySelector(".tie-container > .title"),
        tieScore: document.querySelector(".tie.score"),

        // game section
        gameBoard: document.querySelector(".game-board"),
        tiles: Array.from(document.getElementsByClassName("tile")),
    };



    // Event functions 


    function bindEvents() {
        addButtonEvents();       
        addTileEvents();
    };

    function addButtonEvents() {
        domCache.newGameBtn.addEventListener("click", playNewGame);
        domCache.resetBtn.addEventListener("click", resetGame);
        domCache.startGameBtn.addEventListener("click", startGame);
    }

    function addTileEvents() {
        domCache.tiles.forEach(element => {
            element.textContent = " ";
            element.addEventListener("click", tileClicked)
        });
    };

    function removeTileEvents() {
        domCache.tiles.forEach(element => {
            element.removeEventListener("click", tileClicked);
        });
    }

    function tileClicked() {
        const index = this.getAttribute("id");
        this.textContent = curGame.getCurrentPlayer().getSymbol();
        let result = curGame.playRound(index);
        console.log(result);
        if (result == "Xwin" || result == "Owin" || result == "tie") {
            gameOver();
        };
    };



    // Button clicked functions

    function playNewGame() {
        curGame.restartGame();
        addTileEvents();
        toggleScreenDisplay("game");
    };

    function resetGame() {
        console.log("reset");
        curGame.resetGame();
        resetDOMScores()
        removeTileEvents();
        addTileEvents();
        toggleScreenDisplay("start");
    }

    function escapeHTML(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    function startGame() {
        const p1name = escapeHTML(domCache.p1Input.value);
        const p2name = escapeHTML(domCache.p2Input.value);
        curGame = game(p1name, p2name);
        const gameNames = curGame.getPlayerNames();
        domCache.p1Title.textContent = gameNames[0];
        domCache.p2Title.textContent = gameNames[1];
        toggleScreenDisplay("game");
    }

    function gameOver() {
        const scores = curGame.getScore();
        updateDOMScores();
        console.log(scores); 
        removeTileEvents();
        toggleScreenDisplay("score");
    }

    function updateDOMScores() {
        const scores = curGame.getScore();
        domCache.p1Score.textContent = scores[0];
        domCache.p2Score.textContent = scores[1];
        domCache.tieScore.textContent = scores[2];
    }

    function resetDOMScores() {
        domCache.p1Score.textContent = 0;
        domCache.p2Score.textContent = 0;
        domCache.p1Input.value = "";
        domCache.p2Input.value = "";
    }



    // Functions to change screen styles between start, score and gmae screens

    function toggleScreenDisplay(mode) {
        removeDisplayClass("score-screen");
        removeDisplayClass("hide");
        removeDisplayClass("start-screen");
        removeDisplayClass("large-padding");

        if (mode == "start") {
            addStartScreenClasses();
        }

        if (mode == "game") {
            addGameScreenClasses();
        }

        if (mode == "score") {
            addScoreScreenClasses();
        }
    }

    function addScoreScreenClasses() {
        const elementsToChange = [
            domCache.outerContainer, 
            domCache.buttonContainer, 
            domCache.gameContainer, 
            domCache.gameBoard
        ];

        const elementsToHide = [
            domCache.p1Symbol, 
            domCache.p1Input, 
            domCache.startGameBtn, 
            domCache.p2Symbol, 
            domCache.p2Input,
            domCache.gameContainer,
            domCache.gameBoard
        ];
        
        addDisplayClass(elementsToChange, "score-screen");
        addDisplayClass(elementsToHide, "hide");
    }

    function addStartScreenClasses() {
        const elementsToChange = [
            domCache.outerContainer, 
            domCache.p1Title, 
            domCache.p1Score, 
            domCache.tieContainer, 
            domCache.newGameBtn, 
            domCache.resetBtn, 
            domCache.p2Title, 
            domCache.p2Score, 
            domCache.gameContainer
        ];

        addDisplayClass(elementsToChange, "start-screen");
        addDisplayClass([domCache.logo], "large-padding");
    }

    function addGameScreenClasses() {
        const elementsToChange = [
            domCache.p1Symbol,
            domCache.p1Input,
            domCache.p2Symbol,
            domCache.p2Input,
            domCache.startGameBtn,
            domCache.tieContainer
        ];

        addDisplayClass(elementsToChange, "hide");
    }

    function addDisplayClass(arr, classValue) {
        // adds specified class value to every element in the provided element array
        arr.forEach(element => {
            element.classList.add(classValue);
        })
    }

    function removeDisplayClass(classValue) {
        const elements = document.getElementsByClassName(classValue);
        Array.from(elements).forEach(element => {
            element.classList.remove(classValue);
        });
    }
    

    function init() {
        bindEvents();
    }
    // init();
    return {
        init,
    }

})();

window.addEventListener("DOMContentLoaded", displayControl.init)
;