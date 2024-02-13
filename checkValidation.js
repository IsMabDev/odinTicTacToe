// Function to check rows and return the winning row and its index
function checkRows(board) {
  for (let rowIndex in board) {
    const row = board[rowIndex];
    if (row.every((cell) => cell === row[0] && cell !== " ")) {
      return { line: row, index: parseInt(rowIndex) };
    }
  }
  return null;
}

// Function to check columns and return the winning column and its index
function checkColumns(board) {
  for (let col = 0; col < 3; col++) {
    if (
      board.every(
        (row, rowIndex) => row[col] === board[0][col] && row[col] !== " "
      )
    ) {
      return { line: board.map((row) => row[col]), index: col };
    }
  }
  return null;
}

// Function to check diagonals and return the winning diagonal and its index
function checkDiagonals(board) {
  if (board.every((row, i) => row[i] === board[0][0] && row[i] !== " ")) {
    return { line: board.map((row, i) => row[i]), index: 0 };
  }
  if (
    board.every((row, i) => row[2 - i] === board[0][2] && row[2 - i] !== " ")
  ) {
    return { line: board.map((row, i) => row[2 - i]), index: 1 };
  }
  return null;
}

// Function to check for a winner and return the winning line and its index
function checkWinner(board) {
  return checkRows(board) || checkColumns(board) || checkDiagonals(board);
}

// Example usage:
const gameBoard = [
  ["X", "O", " "],
  ["O", "X", "O"],
  ["X", "O", " "],
];

const winnerInfo = checkWinner(gameBoard);
if (winnerInfo) {
  console.log(
    "We have a winner! Winning line:",
    winnerInfo.line,
    "at index:",
    winnerInfo.index
  );
} else {
  console.log("No winner yet.");
}
