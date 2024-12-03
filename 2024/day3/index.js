const fs = require('fs');
const path = require('path');

function part1() {
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

  const sum = processMatches(matches);
  console.log(`Sum: ${sum}`);
}

function part2() {
  let input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  input = input.replaceAll(/don\'t\(\)(.|\n)*?do\(\)/gs, '')

  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  const sum = processMatches(matches);
  
  console.log(`Sum: ${sum}`);
}

/**
 * Find the sum of multiplying each pair in the list of matches
 * @param {RegExpStringIterator<RegExpExecArray>} matches iterator for regex matches
 * @returns 
 */
function processMatches(matches) {
  let sum = 0;

  for (const match of matches) {
    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    
    sum += x * y;
  }

  return sum
}

part1();
part2();
