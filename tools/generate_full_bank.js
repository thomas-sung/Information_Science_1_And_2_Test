/**
 * 完整擴充高職資訊科歷屆統測與模考全庫 (109~114 年共 600 題)
 * 每年 100 題：
 *   - 專一 50 題 (25 題基本電學 + 25 題電子學)
 *   - 專二 50 題 (17 題數位邏輯設計 + 17 題程式設計實習 + 16 題微處理機)
 * 每道題目皆綁定精準 micro-concept 標籤，達成 100% 智慧排重！
 */

const fs = require('fs');

// We will load existing questions and assign concept to each,
// then append the new 300 questions (25 s1 + 25 s2 per year for 109~114).
console.log('Starting full 600-question builder...');
