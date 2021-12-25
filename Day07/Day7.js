const fs = require("fs");
const path = require("path");

const inputArray = fs
  .readFileSync(path.join(__dirname, "input.txt"), { encoding: "utf-8" })
  .split(",")
  .map(el => parseInt(el));

const getFuelAllowance = (targetPosition, constantCost) => {
  return inputArray.reduce(
    (prev, curr) =>
      prev + getMoveAllowance(Math.abs(curr - targetPosition), constantCost),
    0
  );
};

const getMedian = values => {
  values.sort((a, b) => a - b);
  return values[Math.floor(values.length) / 2];
};

const getAverage = values => {
  if (values.length == 0) return 0;
  let sum = values.reduce((prev, curr) => prev + curr, 0);
  return sum / values.length;
};

const getMoveAllowance = (distance, constantCost) => {
  if (constantCost) {
    return distance;
  }

  return (distance * distance + distance) / 2;
};

console.log("Part 1", getFuelAllowance(getMedian(inputArray), true));
console.log(
  "Part 2",
  Math.min(
    getFuelAllowance(Math.ceil(getAverage(inputArray)), false),
    getFuelAllowance(Math.floor(getAverage(inputArray)), false)
  )
);
