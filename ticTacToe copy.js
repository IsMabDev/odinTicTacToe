function GameBoard() {
  const row = 3;
  const column = 3;
  const board = [];

  const getBoard = () => board;

  const dropToken = (token, row, column) => {
    if (availableCell(row, column)) {
      board[row][column].setValue(token);
      return true;
    } else return false;
  };

  const availableCell = (row, column) => {
    return board[row][column].getValue() === " " ? true : false;
  };

  const printBoard = () => {
    const updatedBoard = board.map((row) =>
      row.map((column) => column.getValue())
    );
    console.log("updatedBoard: ", updatedBoard);
  };
  function Cell() {
    let value = " ";
    const setValue = (newValue) => {
      value = newValue;
    };
    const getValue = () => {
      return value;
    };
    return { setValue, getValue };
  }

  const resetBoard = () => {
    for (let i = 0; i < row; i++) {
      board[i] = [];
      for (let j = 0; j < column; j++) {
        board[i].push(Cell());
      }
    }
  };
  resetBoard();

  return { getBoard, dropToken, printBoard, resetBoard };
}

function GameController() {
  const players = [
    {
      name: "player one",
      token: "./images/cat-animal-icon.svg",
    },
    {
      name: "player two",
      token: "./images/bull-stock-market-icon.svg",
    },
  ];
  let activePlayer = players[0];
  const setActivePlayer = (player) => {
    activePlayer = player;
  };
  const getActivePlayer = () => {
    return activePlayer;
  };
  const getPlayers = () => {
    return players;
  };
  const setPlayers = (player1 = players[0], player2 = players[1]) => {
    players[0] = player1;
    players[1] = player2;
  };
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  //initialisation of the board
  const board = GameBoard();
  const playRound = (rowChoice, columnChoice) => {
    console.log("game.getActivePlayer(): ", getActivePlayer());

    if (board.dropToken(activePlayer.token, rowChoice, columnChoice))
      switchPlayerTurn();

    board.printBoard();
  };
  const getBoard = () => board.getBoard();

  const checkWinner = () => {
    const checkRows = () => {
      for (let rowIndex in getBoard()) {
        row = getBoard()[rowIndex];
        if (
          row.every((cell) => {
            return (
              cell.getValue() === row[0].getValue() && row[0].getValue() !== " "
            );
          })
        ) {
          return ["row", rowIndex];
        }
      }

      return null;
    };

    const checkColumns = () => {
      for (let colIndex = 0; colIndex < getBoard().length; colIndex++) {
        if (
          getBoard().every((row, rowIndex) => {
            return (
              row[colIndex].getValue() === getBoard()[0][colIndex].getValue() &&
              getBoard()[0][colIndex].getValue() !== " "
            );
          })
        ) {
          return ["column", colIndex];
        }
      }

      return null;
    };
    const checkDiagonals = () => {
      let n = 0;
      let n2 = 0;
      for (let rowIndex in getBoard()) {
        rowIndex;
        for (let colIndex in getBoard()[rowIndex]) {
          if (
            rowIndex === colIndex &&
            getBoard()[rowIndex][colIndex].getValue() ===
              getBoard()[0][0].getValue() &&
            getBoard()[0][0].getValue() !== " "
          ) {
            n++;
            n;
            if (n === 3) return "diag1";
          }

          if (
            parseInt(rowIndex) + parseInt(colIndex) === 2 &&
            getBoard()[rowIndex][colIndex].getValue() ===
              getBoard()[2][0].getValue() &&
            getBoard()[2][0].getValue() !== " "
          ) {
            n2;
            n2++;
            n2;
            if (n2 === 3) return "diag2";
          }
        }
      }

      return null;
    };
    if (checkRows() !== null) {
      return checkRows();
    }
    if (checkColumns() !== null) {
      return checkColumns();
    }
    if (checkDiagonals() !== null) {
      return checkDiagonals();
    }
    return null;
  };
  const resetBoard = () => board.resetBoard();
  return {
    switchPlayerTurn,
    getBoard,
    playRound,
    checkWinner,
    resetBoard,
    setActivePlayer,
    getActivePlayer,
    getPlayers,
    setPlayers,
  };
}

function ScreenController() {
  const game = GameController();
  const players = game.getPlayers();
  const boardDiv = document.querySelector("#board");
  const newGame = document.querySelector("#newGame");
  const dialog = document.querySelector("dialog");
  const playerOneHumanButton = document.querySelector("#playerOneHumanButton");
  const playerOneName = document.querySelector("#playerOneName");
  const save = document.querySelector("#save");
  const choosePlayersButton = document.querySelector("#choosePlayersButton");
  const dialogForm = document.querySelector("dialog>form");
  const resetForm = document.querySelector("#reset");

  resetForm.addEventListener("click", (e) => {
    e.preventDefault();
    selectedHumanComputerButton = null;
    selectedTokenButton = null;
    resetTokensSelection();
  });

  const humanComputerButtons = document.querySelectorAll(
    ".humanComputerButtons>button"
  );
  const tokens = document.querySelectorAll(".token");

  const handleTokensClick = (e) => {
    if (selectedTokenButton) {
      selectedTokenButton.classList.remove("playerOneBackground");
    }
    selectedTokenButton = e.target;
    e.target.disabled = true;
    selectedTokenButton.classList.add("playerOneBackground");
  };
  tokens.forEach((token) => token.addEventListener("click", handleTokensClick));
  const resetTokensSelection = () => {
    tokens.forEach((token) => token.classList.remove("playerOneBackground"));
  };
  let selectedHumanComputerButton = null;
  let selectedTokenButton = null;
  const handleHumanComputerButtonsClick = (e) => {
    if (selectedHumanComputerButton) {
      selectedHumanComputerButton.classList.remove("playerOneBackground");
    }
    selectedHumanComputerButton = e.target;
    selectedHumanComputerButton.classList.add("playerOneBackground");
    if (e.target.id === "playerOneComputerButton") {
      playerOneName.value = "Computer1";
      playerOneName.disabled = true;
    }
    if (e.target.id === "playerOneHumanButton") {
      playerOneName.value = "";
      playerOneName.disabled = false;
      playerOneName.focus();
    }
  };

  humanComputerButtons.forEach((button) => {
    button.addEventListener("click", handleHumanComputerButtonsClick);
  });
  save.addEventListener("click", (e) => {
    e.preventDefault();
    game.resetBoard();
    updateScreen();
    players[0].name = playerOneName.value;
    players[0].token = getComputedStyle(
      selectedTokenButton
    ).backgroundImage.replace(/^url\(['"](.+)['"]\)$/, "$1");

    if (dialogForm.checkValidity()) {
      dialog.close();
      game.setPlayers(players[0]);
      game.setActivePlayer(players[0]);
      console.log("game.getPlayers(): ", game.getPlayers());
      dialogForm.reset();
    }
  });

  const handleChoosePlayers = () => {
    dialog.showModal();
  };
  choosePlayersButton.addEventListener("click", handleChoosePlayers);
  newGame.addEventListener("click", () => {
    boardDiv.addEventListener("click", handleButtonClick);
    game.setActivePlayer(game.getPlayers()[0]);
    game.resetBoard();
    updateScreen();
  });

  const updateScreen = () => {
    boardDiv.textContent = "";
    game.getBoard().map((row, rowIndex) =>
      row.map((column, columnIndex) => {
        const buttonCell = document.createElement("button");
        buttonCell.classList.add("cell");
        buttonCell.dataset.row = rowIndex;
        buttonCell.dataset.column = columnIndex;
        buttonCell.style.backgroundImage = `url("${game
          .getBoard()
          [rowIndex][columnIndex].getValue()}")`;

        boardDiv.appendChild(buttonCell);
      })
    );

    if (game.checkWinner() !== null) {
      boardDiv.removeEventListener("click", handleButtonClick);

      console.log("game.checkWinner(): ", game.checkWinner());
    }
  };

  updateScreen();
  const handleButtonClick = (e) => {
    game.playRound(e.target.dataset.row, e.target.dataset.column);
    game.getBoard();

    updateScreen();
  };

  boardDiv.addEventListener("click", handleButtonClick);
}
ScreenController();
