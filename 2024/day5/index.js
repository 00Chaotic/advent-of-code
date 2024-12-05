const fs = require('fs');
const path = require('path');

// Custom object for easier data handling
function OrderRule(x, y) {
  this.x = x;
  this.y = y;
}

function part1() {
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  const lines = input.split('\n');
  
  const separator = lines.findIndex(line => line.trim() === '');
  const ruleStr = lines.slice(0, separator);
  const updateStr = lines.slice(separator+1);

  const rules = parseRules(ruleStr);
  const updates = parseUpdates(updateStr);

  const evaluatedUpdates = sortUpdates(rules, updates);

  let sum = 0;
  evaluatedUpdates.validUpdates.forEach(row => {
    const middleIndex = (row.length-1)/2;
    sum += row[middleIndex];
  });

  console.log(`Sum of middle numbers of valid updates: ${sum}`);
}

/**
 * 
 * @param {string[]} input
 * @returns {OrderRule[]} Array of rules sorted by ascending y value 
 */
function parseRules(input) {
  const rules = input.map(line => {
    const parts = line.split('|');
    return new OrderRule(parseInt(parts[0]), parseInt(parts[1]));
  });

  // Sort by y to make future lookups a little quicker
  rules.sort((a, b) => a.y - b.y);

  return rules;
}

/**
 * 
 * @param {string[]} input
 * @returns {number[][]} 2d array of update page numbers
 */
function parseUpdates(input) {
  const updates = [];

  input.forEach(line => {
    const row = [];
    const nums = line.trim().split(',');
    
    nums.forEach(num => {
      row.push(parseInt(num));
    });

    updates.push(row);
  });

  return updates;
}

/**
 * Create a list of valid and invalid updates according to the specified list of rules
 * @param {OrderRule[]} rules 
 * @param {number[][]} updates
 * @returns {number[][]}
 */
function sortUpdates(rules, updates) {
  const validUpdates = [];
  const invalidUpdates = [];

  for (i = 0; i < updates.length; i++) {
    if (isValidUpdate(rules, updates[i])) {
      validUpdates.push(updates[i]);
    } else {
      invalidUpdates.push(updates[i]);
    }
  }

  return { validUpdates: validUpdates, invalidUpdates: invalidUpdates };
}

/**
 * Evaluate one update according to the specified rules
 * @param {OrderRule[]} rules 
 * @param {number[]} update 
 * @returns {boolean}
 */
function isValidUpdate(rules, update) {
  let invalidNums = [];

  for (j = 0; j < update.length; j++) {
    const value = update[j];

    if (invalidNums.some(rule => rule.x === value)) {
      return false;
    }

    invalidNums = invalidNums.concat(rules.filter(rule => !invalidNums.includes(value) && rule.y === value));
  }

  return true;
}

function part2() {
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  const lines = input.split('\n');
  
  const separator = lines.findIndex(line => line.trim() === '');
  const ruleStr = lines.slice(0, separator);
  const updateStr = lines.slice(separator+1);

  const rules = parseRules(ruleStr);
  const updates = parseUpdates(updateStr);

  const sortedUpdates = sortUpdates(rules, updates);
  const fixedUpdates = fixUpdates(rules, sortedUpdates.invalidUpdates);

  let sum = 0;
  fixedUpdates.forEach(row => {
    const middleIndex = (row.length-1)/2;
    sum += row[middleIndex];
  });

  console.log(`Sum of middle numbers of valid updates: ${sum}`);
}

/**
 * Sorts through and fixes incorrect updates
 * @param {OrderRule[]} rules 
 * @param {number[][]} updates
 * @returns {number[][]}
 */
function fixUpdates(rules, updates) {
  const fixedUpdates = [];

  for (i = 0; i < updates.length; i++) {
    fixedUpdates.push(fixUpdate(rules, updates[i]));
  }

  return fixedUpdates;
}

/**
 * Fix one update according to the specified rules
 * @param {OrderRule[]} rules 
 * @param {number[]} update 
 * @returns {number[]}
 */
function fixUpdate(rules, update) {
  for (j = 0; j < update.length; j++) {
    const currNum = update[j];

    for (k = update.length-1; k >= 0; k--) {
      const tempNum = update[k];

      if (rules.some(rule => rule.y === currNum && rule.x === tempNum)) {
        update[k] = currNum;
        update[j] = tempNum;

        // Reset to current index and reprocess
        if (!isValidUpdate(rules, update)) {
          j -= 2;
          break;
        }

        return update;
      }
    }
  }

  return update;
}

part1();
part2();
