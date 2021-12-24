const fs = require("fs");
const path = require("path");

const inputArray = fs
  .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
  .split("\n")
  .filter(line => line.length); // drop empty lines

const numbers = inputArray
  .splice(0, 1)[0]
  .split(",")
  .map(n => parseInt(n, 10));

const boards = inputArray.reduce((boards, line, i) => {
  const row = line
    .trim()
    .split(/\s+/)
    .map(n => parseInt(n, 10));
  i % 5 ? boards[boards.length - 1].push(row) : boards.push([row]);
  return boards;
}, []);

const boardsWithStats = boards.map(board => ({
  board,
  stats: {
    rows: [0, 0, 0, 0, 0],
    cols: [0, 0, 0, 0, 0]
  },
  isWinner: false
}));

const updateBoard = (calledNumber, { board, stats, isWinner }) => {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (calledNumber === board[row][col]) {
        stats.rows[row] += 1;
        stats.cols[col] += 1;
        isWinner = stats.rows[row] === 5 || stats.cols[col] === 5;
        board[row][col] = undefined;
        return { board, stats, isWinner };
      }
    }
  }
  return { board, stats, isWinner };
};

const getWinningBoard = () => {
  for (let i = 0; i < numbers.length; i++) {
    const calledNumber = numbers[i];
    for (let k = 0; k < boardsWithStats.length; k++) {
      boardsWithStats[k] = updateBoard(calledNumber, boardsWithStats[k]);
      if (boardsWithStats[k].isWinner) {
        return { calledNumber, winningBoard: boardsWithStats[k].board };
      }
    }
  }
  throw new Error("No winner");
};

const getLastWinningBoard = () => {
  for (let i = 0; i < numbers.length; i++) {
    const calledNumber = numbers[i];
    for (let k = 0; k < boardsWithStats.length; ) {
      boardsWithStats[k] = updateBoard(calledNumber, boardsWithStats[k]);
      if (boardsWithStats[k].isWinner) {
        if (boardsWithStats.length === 1) {
          return { calledNumber, winningBoard: boardsWithStats[k].board };
        } else {
          boardsWithStats.splice(k, 1);
        }
      } else {
        k++;
      }
    }
  }
  throw new Error("No winner");
};

const sumUnmarkedNumbers = board =>
  board
    .flat()
    .filter(n => n !== undefined)
    .reduce((sum, n) => sum + n, 0);

const calculateScore = boardGetter => {
  const { calledNumber, winningBoard } = boardGetter();
  const unmarkedSum = sumUnmarkedNumbers(winningBoard);
  return calledNumber * unmarkedSum;
};

console.log("part 1", calculateScore(getWinningBoard));
console.log("part 2", calculateScore(getLastWinningBoard));
