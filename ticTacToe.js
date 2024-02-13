function GameBoard() {
  const row = 3;
  const column = 3;
  const board = [];
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }
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

  return { getBoard, dropToken, printBoard };
}

function GameController() {
  const players = [
    {
      name: "player one",
      token: "X",
    },
    {
      name: "player two",
      token: "O",
    },
  ];
  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  //initialisation of the board
  const board = GameBoard();
  const playRound = (rowChoice, columnChoice) => {
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
    console.log("checkRowsWinner: ", checkRows());
    console.log("checkColumn: ", checkColumns());
    console.log("checkDiagonals: ", checkDiagonals());

    //return checkDiagonals();
  };

  return { switchPlayerTurn, getBoard, playRound, checkWinner };
}

function ScreenController() {
  const game = GameController();

  const boardDiv = document.querySelector("#board");

  const updateScreen = () => {
    boardDiv.textContent = "";
    game.getBoard().map((row, rowIndex) =>
      row.map((column, columnIndex) => {
        const buttonCell = document.createElement("button");
        buttonCell.classList.add("cell");
        buttonCell.dataset.row = rowIndex;
        buttonCell.dataset.column = columnIndex;
        buttonCell.textContent = game
          .getBoard()
          [rowIndex][columnIndex].getValue();
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
