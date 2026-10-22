const fs = require('fs');
const path = require('path');
const { generateS1Questions } = require('./generate_s1_questions.js');
const { generateS2Questions } = require('./generate_s2_questions.js');
const { assignConceptToExisting } = require('./tag_existing_questions.js');

const questionsJsPath = path.resolve(__dirname, '../questions.js');
const rawFileContent = fs.readFileSync(questionsJsPath, 'utf8');

// Extract the header (SVG helpers and setup before RAW_QUESTIONS)
const splitToken = '  // 題庫資料陣列 (250 題)\n  const RAW_QUESTIONS = [';
const altSplitToken = 'const RAW_QUESTIONS = [';

let headerEndIdx = rawFileContent.indexOf('const RAW_QUESTIONS = [');
if (headerEndIdx === -1) {
  throw new Error('Could not find RAW_QUESTIONS start in questions.js');
}
const fileHeader = rawFileContent.substring(0, headerEndIdx);

// Extract the footer (after RAW_QUESTIONS ends)
const footerStartToken = '  // 題庫工廠函式 (Question Bank Factory)';
let footerStartIdx = rawFileContent.indexOf(footerStartToken);
if (footerStartIdx === -1) {
  footerStartIdx = rawFileContent.indexOf('function getQuestionsForExam(');
}
const fileFooter = rawFileContent.substring(footerStartIdx);

// Load existing 300 questions
require('../questions.js');
const existingQuestions = global.RAW_QUESTION_BANK;
console.log('Existing questions loaded:', existingQuestions.length);

// Tag existing questions
existingQuestions.forEach(q => assignConceptToExisting(q));

// Generate new questions
const newS1Questions = generateS1Questions();
const newS2Questions = generateS2Questions();
console.log('New s1 questions generated:', newS1Questions.length);
console.log('New s2 questions generated:', newS2Questions.length);

// Combine and organize by year
const years = ['109', '110', '111', '112', '113', '114'];
const fullBank = [];

years.forEach(year => {
  // Existing s1 questions (001~025)
  const exS1 = existingQuestions.filter(q => q.year === year && q.subject === 'subject1');
  // New s1 questions (026~050)
  const nwS1 = newS1Questions.filter(q => q.year === year);
  
  // New s2 questions (001~025)
  const nwS2 = newS2Questions.filter(q => q.year === year);
  // Existing s2 questions (026~050)
  const exS2 = existingQuestions.filter(q => q.year === year && q.subject === 'subject2');

  console.log(`Year ${year}: exS1=${exS1.length}, nwS1=${nwS1.length}, nwS2=${nwS2.length}, exS2=${exS2.length}`);

  fullBank.push(...exS1, ...nwS1, ...nwS2, ...exS2);
});

console.log('Total questions in fullBank:', fullBank.length);

// Integrity checks
const idSet = new Set();
fullBank.forEach((q, idx) => {
  if (idSet.has(q.id)) {
    throw new Error(`Duplicate ID detected: ${q.id} at index ${idx}`);
  }
  idSet.add(q.id);

  if (!q.options || q.options.length !== 4) {
    throw new Error(`Question ${q.id} does not have exactly 4 options!`);
  }
  if (q.answer < 0 || q.answer > 3) {
    throw new Error(`Question ${q.id} has invalid answer: ${q.answer}`);
  }
  if (!q.concept || !q.conceptName) {
    throw new Error(`Question ${q.id} is missing concept or conceptName!`);
  }
});

console.log('All 600 questions passed integrity checks!');

// Build new questions.js content
const formattedQuestionsJson = fullBank.map(q => {
  return '  ' + JSON.stringify(q, null, 2).split('\n').join('\n  ');
}).join(',\n');

const updatedFileContent = `${fileHeader}const RAW_QUESTIONS = [\n${formattedQuestionsJson}\n];\n\n${fileFooter}`;

fs.writeFileSync(questionsJsPath, updatedFileContent, 'utf8');
console.log('Successfully wrote updated 600 questions to questions.js!');
