const fs = require('fs');
const path = require('path');

// Solution assumes input is always in capital letters and has lines of equal length

function part1() {
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  const matrix = parseInput(input);

  let count = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const currentLetter = matrix[y][x];

      if (currentLetter !== 'X') {
        continue;
      }

      count += findXmasMatches(matrix, y, x);
    }
  }

  console.log(`Count: ${count}`);
}

/**
 * Parse input string into a 2d char array
 * @param {string} input 
 * @returns 2d char array
 */
function parseInput(input) {
  let output = [];

  const lines = input.split('\n');

  lines.forEach(line => {
    output.push(line.split(''));
  });

  return output;
}

/**
 * Processes an 'X' index in the matrix to count occurrences of "XMAS"
 * in all directions
 * @param {char[][]} matrix 
 * @param {number} y Y-index
 * @param {number} x X-index
 * @returns 
 */
function findXmasMatches(matrix, y, x) {
  let count = 0;

  // Forward
  if (matrix[y][x+1] === 'M') {
    if (matrix[y][x+2] === 'A') {
      if (matrix[y][x+3] === 'S') {
        count++;
      }
    }
  }

  // Backwards
  if (matrix[y][x-1] === 'M') {
    if (matrix[y][x-2] === 'A') {
      if (matrix[y][x-3] === 'S') {
        count++;
      }
    }
  }

  // Up
  if (matrix[y-1]?.[x] === 'M') {
    if (matrix[y-2]?.[x] === 'A') {
      if (matrix[y-3]?.[x] === 'S') {
        count++;
      }
    }
  }

  // Down
  if (matrix[y+1]?.[x] === 'M') {
    if (matrix[y+2]?.[x] === 'A') {
      if (matrix[y+3]?.[x] === 'S') {
        count++;
      }
    }
  }

  // Horizontal up-right
  if (matrix[y-1]?.[x+1] === 'M') {
    if (matrix[y-2]?.[x+2] === 'A') {
      if (matrix[y-3]?.[x+3] === 'S') {
        count++;
      }
    }
  }

  // Horizontal up-left
  if (matrix[y-1]?.[x-1] === 'M') {
    if (matrix[y-2]?.[x-2] === 'A') {
      if (matrix[y-3]?.[x-3] === 'S') {
        count++;
      }
    }
  }

  // Horizontal down-right
  if (matrix[y+1]?.[x+1] === 'M') {
    if (matrix[y+2]?.[x+2] === 'A') {
      if (matrix[y+3]?.[x+3] === 'S') {
        count++;
      }
    }
  }

  // Horizontal down-left
  if (matrix[y+1]?.[x-1] === 'M') {
    if (matrix[y+2]?.[x-2] === 'A') {
      if (matrix[y+3]?.[x-3] === 'S') {
        count++;
      }
    }
  }

  return count;
}

function part2() {
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  const matrix = parseInput(input);

  let count = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const currentLetter = matrix[y][x];

      if (currentLetter !== 'A') {
        continue;
      }

      // Create smaller matrix with only relevant chars
      const tempMatrix = [];
      tempMatrix.push([matrix[y-1]?.[x-1], matrix[y-1]?.[x+1]]);
      tempMatrix.push([matrix[y+1]?.[x-1], matrix[y+1]?.[x+1]]);

      if (isHorizontalMas(tempMatrix, y, x)) {
        count++;
      }
    }
  }

  console.log(`Count: ${count}`);
}

/**
 * Processes an 'A' index in a 2x2 matrix to check whether an X-MAS pattern
 * is found
 * @param {char[][]} matrix At most 2x2
 * @returns 
 */
function isHorizontalMas(matrix, y, x) {
  return (
    (
      (matrix[0]?.[0] === 'M' && matrix[1]?.[1] === 'S') ||
      (matrix[0]?.[0] === 'S' && matrix[1]?.[1] === 'M')
    )
    &&
    (
      (matrix[1]?.[0] === 'M' && matrix[0]?.[1] === 'S') ||
      (matrix[1]?.[0] === 'S' && matrix[0]?.[1] === 'M')
    )
  )
}

part1();
part2();
