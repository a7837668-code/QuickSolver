// Automated Unit Test Suite for QuickSolve Calculation Engines
import {
  calculatePercentage,
  calculateDiscount,
  calculateProfitLoss,
  calculateSalary,
  calculateEmi,
  calculateCompoundInterest,
  calculateTip,
  calculateSplitBill,
} from '../src/utils/calculations/finance.ts';

import {
  calculateGPA,
  calculateCGPA,
  calculateMarksPercentage,
  calculateAttendance,
  calculateRequiredMarks,
  calculateGrade,
} from '../src/utils/calculations/student.ts';

import {
  calculateAge,
  calculateDateDifference,
  calculateDaysBetween,
  calculateTimeDuration,
} from '../src/utils/calculations/dateTime.ts';

import {
  convertTemperature,
  convertLength,
  convertWeight,
  convertSpeed,
  convertTime,
} from '../src/utils/calculations/converters.ts';

import {
  analyzeText,
  convertCase,
  removeDuplicateLines,
  sortLines,
  cleanText,
  generateSlug,
} from '../src/utils/calculations/text.ts';

import {
  formatJSON,
  validateJSON,
  encodeBase64,
  decodeBase64,
  encodeUrl,
  decodeUrl,
  generateUUIDs,
  convertUnixTimestamp,
  testRegex,
} from '../src/utils/calculations/developer.ts';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: any) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName}`, detail || '');
  }
}

console.log('=== RUNNING QUICKSOLVE ENGINE VERIFICATION TESTS ===\n');

// 1. FINANCE TESTS
console.log('--- 1. Finance Calculations ---');

// Percentage
const p1 = calculatePercentage('what_is_p_of_x', 20, 250);
assert(p1.success && p1.result === 50, '20% of 250 is 50');

const p2 = calculatePercentage('x_is_what_p_of_y', 50, 200);
assert(p2.success && p2.result === 25, '50 is 25% of 200');

const p3 = calculatePercentage('x_is_what_p_of_y', 50, 0);
assert(!p3.success && !!p3.error, 'Division by zero rejected in percentage');

const p4 = calculatePercentage('percentage_change', 100, 150);
assert(p4.success && p4.result === 50, 'Change from 100 to 150 is 50% increase');

// Discount
const d1 = calculateDiscount(100, 20, 10);
assert(d1.success && d1.savings === 20 && d1.discountedPrice === 80 && d1.finalPrice === 88, 'Discount $100 with 20% off and 10% tax is $88');

const d2 = calculateDiscount(-50, 10);
assert(!d2.success && !!d2.error, 'Negative price rejected in discount');

// Profit/Loss
const pl1 = calculateProfitLoss(100, 130);
assert(pl1.success && pl1.isProfit === true && pl1.difference === 30 && pl1.percentage === 30, 'Cost 100, Sell 130 is 30% profit');

const pl2 = calculateProfitLoss(100, 80);
assert(pl2.success && pl2.isProfit === false && pl2.difference === 20 && pl2.percentage === 20, 'Cost 100, Sell 80 is 20% loss');

// Salary
const sal1 = calculateSalary(50000, 'annual', 40, 5, 20);
assert(sal1.success && sal1.annualGross === 50000 && sal1.netAnnual === 40000, 'Salary $50k gross with 20% tax yields $40k net');

// Loan / EMI
// Principal 100,000 at 12% for 12 months -> EMI ~ 8884.88
const emi1 = calculateEmi(100000, 12, 12);
assert(emi1.success && Math.abs((emi1.monthlyEmi || 0) - 8884.88) < 1, 'Loan EMI 100k at 12% for 1 year is approx 8884.88', emi1);

const emiZero = calculateEmi(12000, 0, 12);
assert(emiZero.success && emiZero.monthlyEmi === 1000 && emiZero.totalInterest === 0, 'Zero-interest loan EMI equals principal / months');

// Compound Interest
// Principal 10,000 at 5% for 10 years compounded annually -> ~16288.95
const ci1 = calculateCompoundInterest(10000, 5, 10, 1, 0);
assert(ci1.success && Math.abs((ci1.futureValue || 0) - 16288.95) < 1, 'Compound interest 10k at 5% for 10 years');

// Tip & Split
const tip1 = calculateTip(100, 15, 2);
assert(tip1.success && tip1.tipAmount === 15 && tip1.totalAmount === 115 && tip1.totalPerPerson === 57.5, 'Tip $100 at 15% split by 2 is $57.50 each');

// 2. STUDENT TESTS
console.log('\n--- 2. Student Calculations ---');

// GPA
const gpa1 = calculateGPA([
  { id: '1', name: 'Math', credits: 4, gradePoint: 4.0 }, // A (16)
  { id: '2', name: 'Physics', credits: 3, gradePoint: 3.0 }, // B (9)
]);
// (16 + 9) / 7 = 25 / 7 = 3.571
assert(gpa1.success && gpa1.gpa === 3.571, 'GPA weighted average is 3.571');

// CGPA
const cgpa1 = calculateCGPA([
  { id: '1', semesterName: 'Sem 1', credits: 20, gpa: 3.5 },
  { id: '2', semesterName: 'Sem 2', credits: 20, gpa: 3.9 },
]);
assert(cgpa1.success && cgpa1.cgpa === 3.7, 'CGPA across 2 semesters is 3.700');

// Marks Percentage
const marks1 = calculateMarksPercentage(85, 100);
assert(marks1.success && marks1.percentage === 85 && marks1.letterGrade === 'A', 'Marks 85/100 gives 85% grade A');

// Attendance
const att1 = calculateAttendance(35, 50, 75); // 70%, needs classes
assert(att1.success && att1.currentPercentage === 70 && (att1.classesNeeded || 0) > 0, 'Attendance shortfall accurately calculates classes needed');

const att2 = calculateAttendance(45, 50, 75); // 90%, can skip
assert(att2.success && (att2.classesCanSkip || 0) >= 10, 'Attendance surplus accurately calculates skippable classes');

// Required Marks on Final
// Current: 80%, Target: 85%, Final Exam Weight: 30%
// Coursework = 70% * 80 = 56. Target = 85. Needed on final: (85 - 56) / 0.3 = 29 / 0.3 = 96.67%
const req1 = calculateRequiredMarks(80, 85, 30);
assert(req1.success && req1.requiredFinalScore === 96.67 && req1.isPossible === true, 'Required final score calculation is 96.67%');

// 3. DATE & TIME TESTS
console.log('\n--- 3. Date & Time Calculations ---');

const age1 = calculateAge('2000-01-01', '2025-01-01');
assert(age1.success && age1.age?.years === 25, 'Age from 2000-01-01 to 2025-01-01 is 25 years');

const dateDiff1 = calculateDateDifference('2024-01-01', '2024-01-31');
assert(dateDiff1.success && dateDiff1.totalDays === 30, 'Date diff in January is 30 elapsed days');

const leapDiff = calculateDaysBetween('2024-02-01', '2024-03-01');
assert(leapDiff.success && leapDiff.days === 29, 'Leap year February 2024 has 29 days');

const duration1 = calculateTimeDuration('09:00', '17:30');
assert(duration1.success && duration1.hours === 8 && duration1.minutes === 30 && duration1.decimalHours === 8.5, 'Duration from 9:00 to 17:30 is 8.5 hours');

// 4. CONVERTER TESTS
console.log('\n--- 4. Converter Calculations ---');

const c1 = convertTemperature(100, 'C', 'F');
assert(c1.success && c1.result === 212, '100°C is 212°F');

const c2 = convertTemperature(0, 'C', 'K');
assert(c2.success && c2.result === 273.15, '0°C is 273.15 K');

const l1 = convertLength(1, 'km', 'm');
assert(l1.success && l1.result === 1000, '1 km is 1000 meters');

const w1 = convertWeight(1, 'kg', 'lb');
assert(w1.success && Math.abs((w1.result || 0) - 2.20462) < 0.01, '1 kg is approx 2.20462 lbs');

const s1 = convertSpeed(100, 'kmh', 'mps');
assert(s1.success && Math.abs((s1.result || 0) - 27.7778) < 0.1, '100 km/h is ~27.78 m/s');

// 5. TEXT TESTS
console.log('\n--- 5. Text Calculations ---');

const text1 = analyzeText('The quick brown fox jumps over the lazy dog. It was amazing!');
assert(text1.words === 12 && text1.sentences === 2, 'Analyzed text has 12 words and 2 sentences');

const case1 = convertCase('hello world QuickSolve', 'kebab');
assert(case1 === 'hello-world-quicksolve', 'Case conversion to kebab-case works');

const dup1 = removeDuplicateLines('apple\nbanana\napple\norange');
assert(dup1.result === 'apple\nbanana\norange' && dup1.removedCount === 1, 'Duplicate lines removed correctly');

const slug1 = generateSlug('QuickSolve: Free Tools & Calculators 2025!');
assert(slug1 === 'quicksolve-free-tools-calculators-2025', 'Slug generator outputs clean SEO slug');

// 6. DEVELOPER TESTS
console.log('\n--- 6. Developer Calculations ---');

const jsonValid = validateJSON('{"name":"QuickSolve","version":1}');
assert(jsonValid.isValid && jsonValid.type === 'Object' && jsonValid.keysCount === 2, 'Valid JSON correctly recognized');

const jsonMalformed = validateJSON('{name:"unquoted"}');
assert(!jsonMalformed.isValid, 'Malformed JSON correctly caught');

const b64 = encodeBase64('Hello, QuickSolve! 🚀');
assert(b64.success && !!b64.result, 'UTF-8 Base64 encoded successfully');
const b64Decoded = decodeBase64(b64.result!);
assert(b64Decoded.success && b64Decoded.result === 'Hello, QuickSolve! 🚀', 'Base64 decoded back to original with unicode');

const uuids = generateUUIDs(5);
assert(uuids.length === 5 && uuids[0].length === 36, 'Generated 5 valid UUIDs');

const rx = testRegex('[A-Z]\\w+', 'g', 'Hello World from QuickSolve');
assert(rx.isValidPattern && rx.matchesCount === 3, 'Regex tester extracted 3 capitalized words');

console.log(`\n==============================================`);
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`==============================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All calculations passed verification with 100% accuracy!');
}
