const fs = require('fs');
const path = require('path');
const csv = require('csv-parse');

const dataPath = path.resolve(__dirname, '../../database/data/test');

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

fs.readFile(dataPath, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data.split('\n')[1]);
  csv.parse(data.split('\n')[1], {
    delimitter: ',',
  }, (err, records) => {
    if (err) throw err;
    console.log(records);
  });
});
