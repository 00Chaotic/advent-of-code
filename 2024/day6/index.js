const fs = require('fs');
const path = require('path');

function part1() {
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  const matrix = parseInput(input);

  const initialGuardPos = indexOf(matrix, '^');
  const processedMatrix = processPath(matrix, initialGuardPos);

  let count = 0;
  processedMatrix.forEach(line => {
    line.forEach(element => {
      if (element === 'X') {
        count++;
      }
    });
  })

  console.log(`Count: ${count}`);
}

/**
 * 
 * @param {string} input 
 * @returns {string[][]}
 */
function parseInput(input) {
  const output = [];

  // Need to account for \r (carriage return)
  const lines = input.split(/\r?\n/);

  lines.forEach(line => {
    const charArray = line.split('');
    output.push(charArray);
  });

  return output;
}

/**
 * Marks all steps of guard's path until she leaves the area
 * @param {string[][]} matrix
 * @param {number[]} guardPos Initial guard position
 * @returns {string[][]} Matrix with all steps marked
 */
function processPath(matrix, guardPos) {
  matrix[guardPos[0]][guardPos[1]] = 'X';
  
  let y = guardPos[0];
  let x = guardPos[1];
  let maxLength = matrix[y].length;
  let maxHeight = matrix.length;

  while (true) {
    // Up direction
    for (y; y >= -1; y--) {
      // Finish if guard leaves area
      if (y === -1) {
        return matrix;
      }    

      if (matrix[y][x] === '.') {
        matrix[y][x] = 'X';
      }

      if (matrix[y][x] === '#') {
        y++;
        break;
      }
    }

    // Right direction
    for (x; x <= maxLength; x++) {
      // Finish if guard leaves area
      if (x === maxLength) {
        return matrix
      }

      if (matrix[y][x] === '.') {
        matrix[y][x] = 'X';
      }

      if (matrix[y][x] === '#') {
        x--;
        break;
      }
    }

    // Down direction
    for (y; y <= maxHeight; y++) {
      // Finish if guard leaves area
      if (y === maxHeight) {
        return matrix;
      }    

      if (matrix[y][x] === '.') {
        matrix[y][x] = 'X';
      }

      if (matrix[y][x] === '#') {
        y--;
        break;
      }
    }

    // Left direction
    for (x; x >= -1; x--) {
      // Finish if guard leaves area
      if (x === -1) {
        return matrix;
      }

      if (matrix[y][x] === '.') {
        matrix[y][x] = 'X';
      }

      if (matrix[y][x] === '#') {
        x++;
        break;
      }
    }
  }
}

/**
 * Finds the index pair of an element in a 2d matrix
 * @param {string[][]} matrix 
 * @param {string} value
 * @returns {number[] | null} Index of value or `-1` if not found
 */
function indexOf(matrix, value) {
  for (i = 0; i < matrix.length; i++) {
    const index = matrix[i].indexOf(value);
    if (index !== -1) {
      return [i, index];
    }
  }

  return null;
}

part1();
