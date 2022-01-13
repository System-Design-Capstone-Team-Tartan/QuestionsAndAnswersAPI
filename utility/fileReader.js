const fsPromises = require('fs/promises');
const path = require('path');
const { parser } = require('./parser');
const { add } = require('../models/mongoDB/questions');

const testQuestionPath = path.resolve(__dirname, '../database/data/testData/testQuestions');

fsPromises.readdir(testQuestionPath, 'utf-8')
/* eslint-disable arrow-body-style */
  .then((files) => {
    return Promise.all(files.map((file) => {
      return fsPromises.readFile(path.resolve(__dirname, `../database/data/testData/testQuestions/${file}`), 'utf-8');
    }));
  })
  .catch((error) => {
    throw error;
  })
  .then((files) => {
    return Promise.all(files.map((file) => {
      return file.split('\n');
    }));
  })
  .catch((error) => {
    throw error;
  })
  .then((files) => {
    const data = [];
    Promise.all(files.map((file) => {
      return file.map((row, idx) => {
        if (idx > 0) {
          if (row.length !== 0) {
            const delimittedData = row.split(',');
            const parsedData = parser(delimittedData);
            data.push(parsedData);
          }
        }
        return row;
      });
    }));
    return data;
  })
  .then((rows) => {
    return add(rows);
  })
  .then((test) => {
    console.log(test);
    process.exit();
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
