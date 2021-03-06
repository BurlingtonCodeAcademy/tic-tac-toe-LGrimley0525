//Welcome message to the player(s)
alert('Welcome to Tic-Tac-Toe! The rules are to get 3 in-a-row, whether up, down, or diagonally.  Click below to either play with another human or play against the computer - and be sure to have fun!')

//Global Variables--------------------------------------------------------------------
let menu = document.querySelector("#menu");
let option = document.querySelector("#option");
let list = document.querySelector(".list");
let info = document.querySelector("#info");
let reset = document.querySelector("#reset");
let turn = 0; //for PVP option

// Creates game board ----------------------------------------------------------------
const generalBoard = (() => {
    let board = ["topLeft", "topCenter", "topRight", "centerLeft", "center", "centerRight", "bottomLeft", "bottomCenter", "bottomRight"]
    function displayBoard() {
        mainTable.style.gridTemplateColumns = `repeat(3, 1fr)`;
        mainTable.style.gridTemplateRows = `repeat(3, 1fr)`;
        let cell = 3 * 3;
        for (let i = 0; i < cell; i++) {
            let child = document.createElement("div");
            child.classList.add("cell");
            child.setAttribute("id", board[i]);
            mainTable.appendChild(child);
        }
    }
    return {
        displayBoard,
        board
    }
})();

//Creates player and checks position on board for winner-----------------------------

let Player = (name, symbol) => {
    function checkVictory(position) {
        if ((position[0] === "X" && position[1] === "X" && position[2] === "X") || position[0] === "O" && position[1] === "O" && position[2] === "O") {
            box.forEach(ele => {
                if (ele.getAttribute("id") == 0 || ele.getAttribute("id") == 1 || ele.getAttribute("id") == 2) {
                    ele.classList.add("cell-victory");
                }
            })
            return true
        }
        if ((position[0] === "X" && position[4] === "X" && position[8] === "X") || (position[0] === "O" && position[4] === "O" && position[8] === "O")) {
            box.forEach(ele => {
                if (ele.getAttribute("id") == 0 || ele.getAttribute("id") == 4 || ele.getAttribute("id") == 8) {
                    ele.classList.add("cell-victory");
                }
            })
            return true
        }
        if ((position[0] === "O" && position[3] === "O" && position[6] === "O") || (position[0] === "X" && position[3] === "X" && position[6] === "X")) {
            box.forEach(ele => {
                if (ele.getAttribute("id") == 0 || ele.getAttribute("id") == 3 || ele.getAttribute("id") == 6) {
                    ele.classList.add("cell-victory");
                }
            })
            return true
        }
        if ((position[1] === "X" && position[4] === "X" && position[7] === "X") || (position[1] === "O" && position[4] === "O" && position[7] === "O")) {
            box.forEach(ele => {
                if (ele.getAttribute("id") == 1 || ele.getAttribute("id") == 4 || ele.getAttribute("id") == 7) {
                    ele.classList.add("cell-victory");
                }
            })
            return true
        }
        if ((position[2] === "X" && position[5] === "X" && position[8] === "X") || (position[2] === "O" && position[5] === "O" && position[8] === "O")) {
            box.forEach(ele => {
                if (ele.getAttribute("id") == 2 || ele.getAttribute("id") == 5 || ele.getAttribute("id") == 8) {
                    ele.classList.add("cell-victory");
                }
            })
            return true
        }
        if ((position[2] === "X" && position[4] === "X" && position[6] === "X") || (position[2] === "O" && position[4] === "O" && position[6] === "O")) {
            box.forEach(ele => {
                if (ele.getAttribute("id") == 2 || ele.getAttribute("id") == 4 || ele.getAttribute("id") == 6) {
                    ele.classList.add("cell-victory");
                }
            })
            return true
        }
        if ((position[3] === "X" && position[4] === "X" && position[5] === "X") || (position[3] === "O" && position[4] === "O" && position[5] === "O")) {
            box.forEach(ele => {
                if (ele.getAttribute("id") == 3 || ele.getAttribute("id") == 4 || ele.getAttribute("id") == 5) {
                    ele.classList.add("cell-victory");
                }
            })
            return true
        }
        if ((position[6] === "X" && position[7] === "X" && position[8] === "X") || (position[6] === "O" && position[7] === "O" && position[8] === "O")) {
            box.forEach(ele => {
                if (ele.getAttribute("id") == 6 || ele.getAttribute("id") == 7 || ele.getAttribute("id") == 8) {
                    ele.classList.add("cell-victory");
                }
            })
            return true
        }
        return false
    }

//when winner determined, returns function below-----------------------------------
    function winner() {
        return `Congrats ${name} , You won!`;
    }
    return { name, symbol, checkVictory, winner }
}


//Starts the game either for PlayervPlayer|| PlayervsComputer-------------------------

const game = (() => {
    function menuInitial() {
        option.innerHTML = `<button id="optionPVP">Player vs Player</button>
        <button id="optionPVPC">Player vs Computer</button>`
        optionPVP = document.querySelector("#optionPVP");
        optionPVPC = document.querySelector("#optionPVPC");
    }

    //function for when player selects playing against another human--------

    function formPVP() {
        menu.innerHTML = `<p>Player One</p>
        <input type="text" id="playerOne"><br>
        <p>Player Two</p>
        <input type="text" id="playerTwo"><br>
        <button id="play">Play</button>`

        playerOneName = document.querySelector("#playerOne");
        playerTwoName = document.querySelector("#playerTwo");
        playButton = document.querySelector("#play")
    }

    //function for when player selects playing against computer-------------

    function formPVPC() {
        menu.innerHTML = `<p>Player One</p>
        <input type="text" id="playerOne"><br>
        <button id="play">Play</button>`
        playerOneName = document.querySelector("#playerOne");
        playButton = document.querySelector("#play")
    }

    //Initialization of the game-----------------------------------------------------

    function initial() {
        info.innerHTML = `<div class="info">
                <h1>Player ${playerOne.name}<span id="symbolPlayerOne"></span></h1>
                <h2>Turn Player: <span style="text-transform: uppercase;" id="turnPlayer"></span></h2>
                <h1>Player ${playerTwo.name} <span id="symbolPlayerTwo"></span></h1>
            </div>
            <div class="table" id="mainTable"></div>`
        mainTable = document.querySelector("#mainTable");
        playerOneBox = document.querySelector("#symbolPlayerOne");
        playerTwoBox = document.querySelector("#symbolPlayerTwo");
        turnBox = document.querySelector("#turnPlayer")
        generalBoard.displayBoard();
        setTimeout(() => {
            playerOneBox.textContent = playerOne.symbol;
            playerTwoBox.textContent = playerTwo.symbol;
            turnBox.textContent = playerOne.name;
            menu.classList.add("invisible");
            menu.classList.remove("visible");
            setTimeout(() => {
                menu.remove()
            }, 1000);
            setTimeout(() => {
                info.classList.remove("invisible")
                info.classList.add("visible");
            }, 1000)
        }, 1000);
    }

    //Starts the game upon player click------------------------------

    function start() {
        box = document.querySelectorAll(".cell")
        let position = generalBoard.board;
        box.forEach(ele => {
            ele.addEventListener("click", (e) => {
                if (turn % 2 === 0) {
                    if (e.target.textContent !== "O" && e.target.textContent !== "X") {
                        e.target.textContent = playerOne.symbol;
                        idx = position.indexOf(ele.getAttribute("id"));
                        position[idx] = playerOne.symbol;
                        ele.setAttribute("id", idx);
                        turnBox.textContent = playerTwo.name;
                        if (playerOne.checkVictory(position)) {
                            let child = document.createElement("h1");
                            child.classList.add("winner");
                            child.innerHTML = `${playerOne.winner()}`
                            info.appendChild(child);
                            box.forEach(ele => {
                                ele.style.pointerEvents = "none";
                            })
                        }
                        turn++;
                    }
                } else {
                    if (e.target.textContent !== "O" && e.target.textContent !== "X") {
                        e.target.textContent = playerTwo.symbol;
                        idx = position.indexOf(ele.getAttribute("id"));
                        position[idx] = playerTwo.symbol;
                        ele.setAttribute("id", idx);
                        turnBox.textContent = playerOne.name;
                        if (playerTwo.checkVictory(position)) {
                            let child = document.createElement("h1");
                            child.classList.add("winner");
                            child.innerHTML = `${playerTwo.winner()}`;
                            info.appendChild(child);
                            box.forEach(ele => {
                                ele.style.pointerEvents = "none";
                            })
                        }
                        turn++;
                    }
                }

            })
        })
    }

    //function for starting game against computer----------------------------------------
    function startVsPc() {
        box = document.querySelectorAll(".cell")
        let position = generalBoard.board;
        box.forEach(ele => {
            ele.addEventListener("click", (e) => {
                if (e.target.textContent !== "O" && e.target.textContent !== "X") {
                    e.target.textContent = playerOne.symbol;
                    idx = position.indexOf(ele.getAttribute("id"));
                    position[idx] = playerOne.symbol;
                    ele.setAttribute("id", idx);
                    turnBox.textContent = playerTwo.name;
                    if (playerOne.checkVictory(position)) {
                        let child = document.createElement("h1");
                        child.classList.add("winner");
                        child.innerHTML = `${playerOne.winner()}`
                        info.appendChild(child);
                        box.forEach(ele => {
                            ele.style.pointerEvents = "none";
                        })
                    } else {
                        setTimeout(() => {
                            let random = Math.floor(Math.random() * 101);
                            if (random >= 65) {
                                if (canWin(position)) {
                                    moveElement(canWin(position).idx, position);
                                    if (playerTwo.checkVictory(position)) {
                                        let child = document.createElement("h1");
                                        child.classList.add("winner");
                                        child.innerHTML = `${playerTwo.winner()}`
                                        info.appendChild(child);
                                        box.forEach(ele => {
                                            ele.style.pointerEvents = "none";
                                        })
                                    }
                                } else if (canLose(position)) {
                                    moveElement(canLose(position).idx, position);
                                    if (playerTwo.checkVictory(position)) {
                                        let child = document.createElement("h1");
                                        child.classList.add("winner");
                                        child.innerHTML = `${playerTwo.winner()} `
                                        info.appendChild(child);
                                        box.forEach(ele => {
                                            ele.style.pointerEvents = "none";
                                        })
                                    }
                                } else {
                                    movePc(position)
                                }
                            } else {
                                movePc(position)
                            }
                        }, 1000)
                    }
                }
            })
        })
    }

//function for generating computer move-------------------------------------------

    function movePc(position) {
        let validCell = position.filter(ele => ele !== "O" && ele !== "X")
        let randomChoice = Math.floor(Math.random() * validCell.length);
        idx = position.indexOf(validCell[randomChoice]);
        box.forEach(ele => {
            if (ele.getAttribute("id") === validCell[randomChoice]) {
                ele.textContent = playerTwo.symbol;
                position[idx] = playerTwo.symbol;
                ele.setAttribute("id", idx);
            }
        })
        turnBox.textContent = playerOne.name;
        if (playerTwo.checkVictory(position)) {
            let child = document.createElement("h1");
            child.classList.add("winner");
            child.innerHTML = `${playerTwo.winner()}`;
            info.appendChild(child);
            box.forEach(ele => {
                ele.style.pointerEvents = "none";
            })
        }
    }

    function pad(val) {
        let valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }

//Determines if computer can win then determines the computer move to win------------------

    function canWin(position) {
        if (position[0] === "X" && position[1] === "X" && (position[2] !== "O" || position[2] !== "X")) {
            return { idx: 2 };
        }
        if (position[0] === "X" && position[2] === "X" && (position[1] !== "O" || position[1] !== "X")) {
            return { idx: 1 };
        }
        if (position[1] === "X" && position[2] === "X" && (position[0] !== "O" || position[0] !== "X")) {
            return { idx: 0 };
        }
        if (position[0] === "X" && position[4] === "X" && (position[8] !== "O" || position[8] !== "X")) {
            return { idx: 8 };
        }
        if (position[0] === "X" && position[8] === "X" && (position[4] !== "O" && position[4] !== "X")) {
            return { idx: 4 };
        }
        if (position[4] === "X" && position[8] === "X" && (position[0] !== "O" && position[0] !== "X")) {
            return { idx: 0 };
        }
        if (position[0] === "X" && position[3] === "X" && (position[6] !== "O" && position[6] !== "X")) {
            return { idx: 6 };
        }
        if (position[0] === "X" && position[6] === "X" && (position[3] !== "O" && position[3] !== "X")) {
            return { idx: 3 };
        }
        if (position[3] === "X" && position[6] === "X" && (position[0] !== "O" && position[0] !== "X")) {
            return { idx: 0 };
        }
        if (position[1] === "X" && position[4] === "X" && (position[7] !== "O" && position[7] !== "X")) {
            return { idx: 7 };
        }
        if (position[1] === "X" && position[7] === "X" && (position[4] !== "O" && position[4] !== "X")) {
            return { idx: 4 };
        }
        if (position[4] === "X" && position[7] === "X" && (position[1] !== "O" && position[1] !== "X")) {
            return { idx: 1 };
        }
        if (position[2] === "X" && position[5] === "X" && (position[8] !== "O" && position[8] !== "X")) {
            return { idx: 8 };
        }
        if (position[2] === "X" && position[8] === "X" && (position[5] !== "O" && position[5] !== "X")) {
            return { idx: 5 };
        }
        if (position[5] === "X" && position[8] === "X" && (position[2] !== "O" && position[2] !== "X")) {
            return { idx: 2 };
        }
        if (position[3] === "X" && position[4] === "X" && (position[5] !== "O" && position[5] !== "X")) {
            return { idx: 5 };
        }
        if (position[3] === "X" && position[5] === "X" && (position[4] !== "O" && position[4] !== "X")) {
            return { idx: 4 };
        }
        if (position[5] === "X" && position[4] === "X" && (position[3] !== "O" && position[3] !== "X")) {
            return { idx: 3 };
        }
        if (position[6] === "X" && position[7] === "X" && (position[8] !== "O" && position[8] !== "X")) {
            return { idx: 8 };
        }
        if (position[6] === "X" && position[8] === "X" && (position[7] !== "O" && position[7] !== "X")) {
            return { idx: 7 };
        }
        if (position[7] === "X" && position[8] === "X" && (position[6] !== "O" && position[6] !== "X")) {
            return { idx: 6 };
        }
        if (position[2] === "X" && position[4] === "X" && (position[6] !== "O" && position[6] !== "X")) {
            return { idx: 6 };
        }
        if (position[2] === "X" && position[6] === "X" && (position[4] !== "O" && position[4] !== "X")) {
            return { idx: 4 };
        }
        if (position[6] === "X" && position[4] === "X" && (position[2] !== "O" && position[2] !== "X")) {
            return { idx: 2 };
        }
        return false
    }

//Determines if computer computer can lose then determines the placement------------------------------

    function canLose(position) {
        if (position[0] === "O" && position[1] === "O" && (position[2] !== "O" && position[2] !== "X")) {
           return { idx: 2 };
        }
        if (position[0] === "O" && position[2] === "O" && (position[1] !== "O" && position[1] !== "X")) {
            return { idx: 1 };
        }
        if (position[1] === "O" && position[2] === "O" && (position[0] !== "O" && position[0] !== "X")) {
            return { idx: 0 };
        }
        if (position[0] === "O" && position[4] === "O" && (position[8] !== "O" && position[8] !== "X")) {
            return { idx: 8 };
        }
        if (position[0] === "O" && position[8] === "O" && (position[4] !== "O" && position[4] !== "X")) {
            return { idx: 4 };
        }
        if (position[4] === "O" && position[8] === "O" && (position[0] !== "O" && position[0] !== "X")) {
            return { idx: 0 };
        }
        if (position[0] === "O" && position[3] === "O" && (position[6] !== "O" && position[6] !== "X")) {
            return { idx: 6 };
        }
        if (position[0] === "O" && position[6] === "O" && (position[3] !== "O" && position[3] !== "X")) {
            return { idx: 3 };
        }
        if (position[3] === "O" && position[6] === "O" && (position[0] !== "O" && position[0] !== "X")) {
            return { idx: 0 };
        }
        if (position[1] === "O" && position[4] === "O" && (position[7] !== "O" && position[7] !== "X")) {
            return { idx: 7 };
        }
        if (position[1] === "O" && position[7] === "O" && (position[4] !== "O" && position[4] !== "X")) {
            return { idx: 4 };
        }
        if (position[4] === "O" && position[7] === "O" && (position[1] !== "O" && position[1] !== "X")) {
            return { idx: 1 };
        }
        if (position[2] === "O" && position[5] === "O" && (position[8] !== "O" && position[8] !== "X")) {
            return { idx: 8 };
        }
        if (position[2] === "O" && position[8] === "O" && (position[5] !== "O" && position[5] !== "X")) {
            return { idx: 5 };
        }
        if (position[5] === "O" && position[8] === "O" && (position[2] !== "O" && position[2] !== "X")) {
            return { idx: 2 };
        }
        if (position[3] === "O" && position[4] === "O" && (position[5] !== "O" && position[5] !== "X")) {
            return { idx: 5 };
        }
        if (position[3] === "O" && position[5] === "O" && (position[4] !== "O" && position[4] !== "X")) {
            return { idx: 4 };
        }
        if (position[5] === "O" && position[4] === "O" && (position[3] !== "O" && position[3] !== "X")) {
            return { idx: 3 };
        }
        if (position[6] === "O" && position[7] === "O" && (position[8] !== "O" && position[8] !== "X")) {
            return { idx: 8 };
        }
        if (position[6] === "O" && position[8] === "O" && (position[7] !== "O" && position[7] !== "X")) {
            return { idx: 7 };
        }
        if (position[7] === "O" && position[8] === "O" && (position[6] !== "O" && position[6] !== "X")) {
            return { idx: 6 };
        }
        if (position[2] === "O" && position[4] === "O" && (position[6] !== "O" && position[6] !== "X")) {
            return { idx: 6 };
        }
        if (position[2] === "O" && position[6] === "O" && (position[4] !== "O" && position[4] !== "X")) {
            return { idx: 4 };
        }
        if (position[6] === "O" && position[4] === "O" && (position[2] !== "O" && position[2] !== "X")) {
            return { idx: 2 };
        }
        return false
    }
    function moveElement(idx, position) {
        box.forEach(ele => {
            if (ele.getAttribute("id") === position[idx]) {
                ele.textContent = playerTwo.symbol;
                position[idx] = playerTwo.symbol;
                ele.setAttribute("id", idx);
            }
        })
    } return { initial, start, menuInitial, formPVP, formPVPC, startVsPc }
})()
game.menuInitial();


//Creating game timer----------------------------------------

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}


//Event Listeners-------------------------------------------------------------------------

//If player clicks on button to play against another human--------------------------------
optionPVP.addEventListener("click", () => {
    list.classList.add("invisible");
    setTimeout(() => {
        list.remove();
    }, 1000)
    setTimeout(() => {
        game.formPVP();
        playButton.addEventListener("click", () => {
            if (playerOneName.value.length > 0 && playerTwoName.value.length > 0) {
                playerOne = Player(playerOneName.value, "X");
                playerTwo = Player(playerTwoName.value, "O");
                game.initial();
                game.start();
            } else {
                alert("Give us your name!")
            }
        })
        reset.classList.remove("invisible");
        reset.classList.add("visible")
        menu.classList.toggle("invisible");
        menu.classList.toggle("visible");
    }, 1000)
})
//If Player clicks on button to play against computer--------------------------------------
optionPVPC.addEventListener("click", () => {
    list.classList.add("invisible");
    setTimeout(() => {
        list.remove();
    }, 1000)
    setTimeout(() => {
        game.formPVPC();
        playButton.addEventListener("click", () => {
            if (playerOneName.value.length > 0) {
                playerOne = Player(playerOneName.value, "X");
                playerTwo = Player("PC", "O");
                game.initial();
                game.startVsPc();
            } else {
                alert("Give us your name!")
            }
        })
        reset.classList.remove("invisible");
        reset.classList.add("visible")
        menu.classList.toggle("invisible");
        menu.classList.toggle("visible");
    }, 1000)
})
