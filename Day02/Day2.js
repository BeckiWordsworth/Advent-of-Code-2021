const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8"
});

const inputArray = input.split("\n").map(row => {
  const [direction, units] = row.split(" ");
  return { direction: direction, units: parseInt(units) };
});

//  Part 1
const horizontalPosition = inputArray.reduce((acc, curr) => {
  if (curr.direction === "forward") {
    return acc + curr.units;
  }
  return acc;
}, 0);

const depth = inputArray.reduce((acc, curr) => {
  if (curr.direction === "up") {
    return acc - curr.units;
  }
  if (curr.direction === "down") {
    return acc + curr.units;
  }
  return acc;
}, 0);

console.log("part 1: ", horizontalPosition * depth);

let depthPart2 = 0;
let horizontalPositionPart2 = 0;
let aimPart2 = 0;

for (const row of inputArray) {
  switch (row.direction) {
    case "forward":
      horizontalPositionPart2 += row.units;
      depthPart2 += aimPart2 * row.units;
      break;
    case "up":
      aimPart2 -= row.units;
      break;
    case "down":
      aimPart2 += row.units;
      break;
  }
}

console.log("part 2: ", depthPart2 * horizontalPositionPart2);
