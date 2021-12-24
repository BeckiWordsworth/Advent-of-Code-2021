const fs = require("fs");
const path = require("path");

//helper
const processLine = line => {
  const [a, b] = line
    .split(" -> ")
    .map(coordinate => coordinate.split(",").map(c => parseInt(c, 10)));

  const from = { col: a[0], row: a[1] };
  const to = { col: b[0], row: b[1] };
  const type =
    from.col === to.col ? "col" : from.row === to.row ? "row" : "diagonal";
  const vert =
    from.row < to.row ? "down" : from.row > to.row ? "up" : undefined;
  const horz =
    from.col < to.col ? "right" : from.col > to.col ? "left" : undefined;
  return { from, to, type, vert, horz };
};

const inputArray = fs
  .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
  .split("\n")
  .map(processLine);

const drawFloor = types =>
  inputArray.reduce((floor, line) => {
    const { from, to, type, vert, horz } = line;

    if (types.includes(type)) {
      let coordinate = { ...from };
      let shouldContinue = true;
      while (shouldContinue) {
        const { row, col } = coordinate;
        shouldContinue = col !== to.col || row !== to.row;

        if (!floor[row]) {
          floor[row] = [];
        }

        floor[row][col] =
          typeof floor[row][col] === "number" ? floor[row][col] + 1 : 1;

        coordinate = {
          col: horz === "right" ? col + 1 : horz === "left" ? col - 1 : col,
          row: vert === "down" ? row + 1 : vert === "up" ? row - 1 : row
        };
      }
    }
    return floor;
  }, []);

const overlaps = types =>
  drawFloor(types)
    .flat()
    .filter(coordinate => typeof coordinate === "number" && coordinate > 1)
    .length;

console.log("Part 1", overlaps(["row", "col"]));
console.log("Part 2", overlaps(["row", "col", "diagonal"]));
