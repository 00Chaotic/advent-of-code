const fs = require('fs');
const path = require('path');

function part1() {
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);

  let sum = 0;
  for (const match of matches) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    
    sum += x * y;
  }

  console.log(`Sum: ${sum}`);
}

part1();
