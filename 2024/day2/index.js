const fs = require('fs');
const path = require('path');

// Solution assumes each report has at least 3 levels/elements

function part1() {
  const input = fs.readFileSync(path.resolve(__dirname, 'input.txt')).toString();
  const reports = parseInput(input);

  let safeReports = 0;
  reports.forEach(report => {
    if (isReportSafe(report)) {
      safeReports++;
    }
  });

  console.log(`${safeReports} safe reports`);
}

/**
 * @param {string} input Input from text file
 * @returns 2d array containing each report
 */
function parseInput(input) {
  const lines = input.split('\n');

  const reports = [];
  lines.forEach(line => {
    const report = line.split(' ').map(level => Number.parseInt(level));
    reports.push(report);
  });

  return reports;
}

/**
 * 
 * @param {number[][]} report 
 * @returns Boolean indicating whether report is safe or not
 */
function isReportSafe(report) {
  if (report[0] === report[1] || (Math.abs(report[0] - report[1]) > 3)) {
    return false;
  }

  let increasing = false;
  if (report[0] < report[1]) {
    increasing = true;
  }

  for (let i = 2; i < report.length; i++) {
    const difference = report[i] - report[i-1];

    if (
      (increasing && difference <= 0)
      || (!increasing && difference >= 0)
      || Math.abs(difference) > 3
    ) {
      return false;
    }
  }

  return true;
}

part1();
