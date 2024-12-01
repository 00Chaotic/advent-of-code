const fs = require('fs');
const path = require('path');

// Solution assumes columns always have same number of elements and that elements are always numbers

const column1 = [];
const column2 = [];

function part1() {
  // Read input from file into two separate arrays
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  parseColumns(input, column1, column2);

  // Sort in ascending order
  column1.sort((a, b) => a - b);
  column2.sort((a, b) => a - b);

  // Calculate distances
  let distSum = 0;
  for (let i = 0; i < column1.length; i++) {
    distSum += Math.abs(column1[i] - column2[i]);
  }
  
  console.log("Total distance: %d", distSum)
}

/**
 * 
 * @param {string} data String input from text file
 * @param {int[]} column1 Left side column
 * @param {int[]} column2 Right side column
 */
function parseColumns(data, column1, column2) {
  const lines = data.split('\n');

  lines.forEach(line => {
    const nums = line.trim().split(/\s+/);

    if (nums.length !== 2) {
      console.log("error parsing input: more than two columns");
      process.exit(1);
    }

    column1.push(parseInt(nums[0]));
    column2.push(parseInt(nums[1]));
  });
}

part1();
