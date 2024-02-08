function GameBoard() {
  const row = 3;
  const column = 3;
  const board = [];
  board;
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }

  const dropToken = (token, row, column) => {
    if (availableCell(row, column)) {
      board[row][column].setValue(token);
      return true;
    } else return false;
  };
  console.log(board[row][column].getValue());

  const availableCell = (row, column) => {
    return board[row][column].getValue() === 0 ? true : false;
  };

  const printBoard = () => {
    const updatedBoard = board.map((row) =>
      row.map((column) => column.getValue())
    );
    console.log("updatedBoard: ", updatedBoard);
  };

  return { dropToken, printBoard };
}

function Cell() {
  let value = 0;
  const setValue = (newValue) => {
    value = newValue;
  };
  const getValue = () => {
    return value;
  };
  return { setValue, getValue };
}

function GameController() {
  const players = [
    {
      name: "player one",
      token: "X",
    },
    {
      name: "player two",
      token: "Z",
    },
  ];
  let activePlayer = players[0];
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  //initialisation of the game
  const game = GameBoard();
  const playRound = (() => {
    const rowChoice = prompt("Choose one row between 0 an 2");
    const columnChoice = prompt("choose one column between 0 and 2");

    if (game.dropToken(activePlayer.token, rowChoice, columnChoice))
      switchPlayerTurn();

    game.printBoard();
  })();
  return { switchPlayerTurn };
}

const game = GameController();
