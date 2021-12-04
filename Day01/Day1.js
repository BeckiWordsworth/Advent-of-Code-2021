const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8"
});

const arrayInput = input.split("\n").map(row => parseInt(row));

let part1 = 0;
for (let i = 1; i < arrayInput.length; i++) {
  if (arrayInput[i - 1] < arrayInput[i]) {
    part1++;
  }
}

console.log("part 1: ", part1);

let part2 = 0;
for (let i = 1; i < arrayInput.length; i++) {
  const first = arrayInput[i - 1] + arrayInput[i] + arrayInput[i + 1];
  const second = arrayInput[i] + arrayInput[i + 1] + arrayInput[i + 2];

  if (second > first) {
    part2++;
  }
}

console.log("part 2: ", part2);
