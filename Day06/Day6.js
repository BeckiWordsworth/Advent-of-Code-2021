const fs = require("fs");
const path = require("path");

const inputArray = fs
  .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
  .split(",");

const InitialReproductionTime = 9;
const reproductionTime = 7;

const simulateDays = days => {
  let fish = new Array(InitialReproductionTime).fill(0);
  inputArray.forEach(age => fish[age]++);

  for (let i = 0; i < days; i++) {
    let newSpawners = fish.shift();
    fish.push(newSpawners);
    fish[reproductionTime - 1] += newSpawners;
  }

  return fish.reduce((acc, a) => acc + a, 0);
};

console.log("Part 1", simulateDays(80));
console.log("Part 2", simulateDays(256));
