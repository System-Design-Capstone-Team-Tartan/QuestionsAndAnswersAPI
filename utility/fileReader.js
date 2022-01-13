const fs = require('fs');
const path = require('path');
const { occurrenceCount } = require('./occurrenceCount');

const questionPath = path.resolve(__dirname, '../database/data/testData/testQuestions.csv');

// question.csv headers: question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness

fs.readFile(questionPath, 'utf-8', (err, data) => {
  if (err) throw err;
  const rawData = data.split('\n')[1].split(',');
  console.log('raw data ', rawData[0]);
  occurrenceCount(rawData[0], '"');
  const parsedData = [];
  for (let i = 0; i < rawData.length; i += 1) {
    if (occurrenceCount(rawData[i], '"') === 1) {
      let handleQuotes = rawData[i];
      for (let j = i + 1; j < rawData.length; j += 1) {
        handleQuotes += rawData[j];
        if (rawData[j].includes('"')) {
          parsedData.push(handleQuotes);
          i = j;
          break;
        }
      }
    } else {
      parsedData.push(rawData[i]);
    }
  }
  console.log(parsedData);
});

// answers_photos: 0 = photo_id, 1 = answer_id, 2 = URL

// fs.readFile(dataPath, 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(JSON.parse(data.split('\n')[0].split(',')[2]));
// });

/**
 * answers:
 * 0 = answer_id,
 * 1 = question_id,
 * 2 = question_body,
 * 3 = question_date, no time stamp, just date
 * 4 = answerer_name,
 * 5 = answerer_email,
 * 6 = question_reported, 0 for false, 1 for true.
 * 7 = question_helpfullness
 */

// fs.readFile(dataPath, 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(data.split('\n')[1]);
//   csv.parse(data.split('\n')[1], {
//     delimitter: ',',
//   }, (err, records) => {
//     if (err) throw err;
//     console.log(records);
//   });
// });
