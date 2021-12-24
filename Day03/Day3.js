const fs = require("fs");
const path = require("path");
const range = require("lodash").range;

const inputArray = fs.readFileSync(path.join(__dirname, "input.txt"), {
  encoding: "utf-8"
});

const rows = inputArray.split("\n").map(row => {
  return row;
});

// Part 1
let part1 = 0;
let gammaRate = "";
let epsilonRate = "";

let temp = [];

for (let i = 0; i < 12; i++) {
  let zeros = 0;
  let ones = 0;

  for (let x = 0; x < rows.length; x++) {
    if (rows[x][i] === "0") {
      zeros++;
    }

    if (rows[x][i] === "1") {
      ones++;
    }
  }
  temp.push({ zeros: zeros, ones: ones });
}

for (const pos of temp) {
  if (pos.zeros < pos.ones) {
    gammaRate += "1";
    epsilonRate += "0";
  } else {
    gammaRate += "0";
    epsilonRate += "1";
  }
}

part1 = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

console.log("part 1: ", part1);

// Part 2
let part2 = 0;

const oxy = range(12).reduce((accVal, currInd) => {
  let z = 0;
  let o = 0;

  for (let x = 0; x < accVal.length; x++) {
    if (accVal[x][currInd] === "0") {
      z++;
    }

    if (accVal[x][currInd] === "1") {
      o++;
    }
  }

  if (accVal.length > 1) {
    return accVal.filter(val => {
      if (z > o) {
        return val[currInd] === "0";
      }
      if (o > z) {
        return val[currInd] === "1";
      }
      return val[currInd] === "1";
    });
  }
  return accVal;
}, rows);

const scrub = range(12).reduce((accVal, currInd) => {
  let z = 0;
  let o = 0;

  for (let x = 0; x < accVal.length; x++) {
    if (accVal[x][currInd] === "0") {
      z++;
    }

    if (accVal[x][currInd] === "1") {
      o++;
    }
  }

  if (accVal.length > 1) {
    return accVal.filter(val => {
      if (z > o) {
        return val[currInd] === "1";
      }
      if (o > z) {
        return val[currInd] === "0";
      }
      return val[currInd] === "0";
    });
  }
  return accVal;
}, rows);

part2 = parseInt(oxy, 2) * parseInt(scrub, 2);

console.log("part 2: ", part2);
