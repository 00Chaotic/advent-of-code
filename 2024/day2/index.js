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

// While a lot of the part 2 code is the same as the part 1 code, it has been kept separate to demonstrate the difference between both problems/solutions.
function part2() {
  const input = fs.readFileSync(path.resolve(__dirname, 'temp.txt')).toString();
  const reports = parseInput(input);

  let safeReports = 0;
  reports.forEach(report => {
    if (isReportSafeWithProblemDampener(report, true)) {
      safeReports++;
    }
  });

  console.log(`${safeReports} safe reports`);
}

/**
 * Recursively checks whether the report is safe with a tolerance of one fault
 * @param {number[][]} report
 * @param {boolean} canRetry True if checks can be retried by removing one element
 * @returns Boolean indicating whether report is safe or not
 */
function isReportSafeWithProblemDampener(report, canRetry) {
  const prevIncreasing = report[0] - report[1] < 0;

  for (let i = 0; i < report.length; i++) {
    let diff = report[i] - report[i+1];
    if (i === report.length-1) {
      diff = report[i-1] - report[i];
    }

    const absDiff = Math.abs(diff);
    const increasing = diff < 0;

    if (isDiffUnsafe(absDiff) || increasing !== prevIncreasing) {
      const tempReport = report.slice();

      if (canRetry) {
        tempReport.splice(i, 1);

        const isRetrySafe = isReportSafeWithProblemDampener(tempReport, false);

        if (isRetrySafe) {
          return true;
        }

        if (!isRetrySafe && i === report.length-2) {
          continue;
        }
      }

      return false;
    }
  }

  return true;
}

function isDiffUnsafe(diff) {
  return diff > 3 || diff < 1;
}

part1();
part2();
