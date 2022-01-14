/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable no-loop-func */

const fs = require('fs');
// const fsPromises = require('fs/promises');
const { exec } = require('child_process');
const path = require('path');
const { parser } = require('./parser');
const { addMany } = require('../models/mongoDB/questions');

// various paths
const pathToQuestions = path.resolve(__dirname, '../database/data/questions.csv');
const questionPath = path.resolve(__dirname, '../database/data/questions');

exec(`wc -l < ${pathToQuestions}`, (err, results) => {
  if (err) throw err;
  // start time
  console.time();
  const totalRows = Number(results) - 1;
  let rowsUploaded = 0;
  let filesUploaded = 0;
  fs.readdir(questionPath, 'utf-8', (err, files) => {
    if (err) throw err;
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const questionFilePath = path.resolve(__dirname, `../database/data/questions/${file}`);
      fs.readFile(questionFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        const splitDataByRow = data.split('\n');
        const dataPerFile = [];
        for (let j = 0; j < splitDataByRow.length; j += 1) {
          const row = splitDataByRow[j];
          if (j > 0) {
            if (row.length !== 0) {
              const delimittedData = row.split(',');
              const parsedData = parser(delimittedData);
              dataPerFile.push(parsedData);
            }
          }
        }
        filesUploaded += 1;
        console.log('FileCount / Total Files / Rows per File ', filesUploaded, files.length, dataPerFile.length);
        addMany(dataPerFile, (err, saved) => {
          if (err) console.log(err);
          rowsUploaded += saved.length;
          console.log('Total Uploaded from Mongoose ', rowsUploaded, totalRows);
          if (rowsUploaded === totalRows) {
            // time end
            console.timeEnd();
            process.exit();
          }
        });
      });
    }
  });
});

// exec(`wc -l < ${pathToQuestions}`, (err, results) => {
//   const totalRows = Number(results);
//   let rowsUploaded = 0;
//   let filesUploaded = 0;
//   fs.readdir(questionPath, 'utf-8', (err, files) => {
//     if (err) throw err;
//     files.map((file) => {
//       const questionFilePath = path.resolve(__dirname, `../database/data/questions/${file}`);
//       fs.readFile(questionFilePath, 'utf-8', (err, data) => {
//         if (err) throw err;
//         const splitDataByRow = data.split('\n');
//         const dataPerFile = [];
//         splitDataByRow.map((row, idx) => {
//           if (idx > 0) {
//             if (row.length !== 0) {
//               const delimittedData = row.split(',');
//               const parsedData = parser(delimittedData);
//               dataPerFile.push(parsedData);
//             }
//           }
//           return row;
//         });
//         filesUploaded += 1;
//         console.log('FileCount and Length ', filesUploaded, dataPerFile.length);
//         addMany(dataPerFile, (err, saved) => {
//           if (err) throw err;
//           rowsUploaded += saved.length;
//           console.log(rowsUploaded);
//           if (rowsUploaded === totalRows) {
//             process.exit();
//           }
//         });
//       });
//       return file;
//     });
//   });
// });

// fsPromises.readdir(questionPath, 'utf-8')
//   .then((files) => {
//     return Promise.all(files.map((file) => {
//       const questionFilePath = path.resolve(__dirname, `../database/data/questions/${file}`);
//       return fsPromises.readFile(questionFilePath, 'utf-8');
//     }));
//   })
//   .then((files) => {
//     return Promise.all(files.map((file) => {
//       return file.split('\n');
//     }));
//   })
//   .then((files) => {
//     const data = [];
//     Promise.all(files.map((file) => {
//       return file.map((row, idx) => {
//         if (idx > 0) {
//           if (row.length !== 0) {
//             const delimittedData = row.split(',');
//             const parsedData = parser(delimittedData);
//             data.push(parsedData);
//           }
//         }
//         return row;
//       });
//     }));
//     return data;
//   })
//   .then((rows) => {
//     return addMany(rows, (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(data);
//     });
//   })
//   .catch((error) => {
//     throw error;
//   })
//   .then(() => {
//     process.exit();
//   });

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
