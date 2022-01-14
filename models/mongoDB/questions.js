// date must be a string in YYYY-mm-dd format;
const Question = require('./index');

let invokedCount = 0;

const addMany = (row, cb) => {
  const questionsToInsert = {
    question_id: row[0],
    product_id: row[1],
    question_body: row[2],
    question_date: row[3],
    asker_name: row[4],
    asker_email: row[5],
    reported: row[6],
    question_helpfulness: row[7],
  };
  invokedCount += 1;
  console.log('Invoked Count ', invokedCount);
  return Question.insertMany(
    questionsToInsert,
    {
      limit: 1000, // 1000 seems to be the most optimal
      ordered: false,
      lean: false,
    },
    (err, saved) => {
      if (err) {
        cb(err, null);
      }
      cb(null, saved);
    },
  );
};

module.exports = {
  addMany,
};

// return Question.findOneAndUpdate(
//   { question_id: question[0] },
//   questionToSave,
//   { upsert: true, new: true },
//   (err, saved) => {
//     if (err) {
//       cb(err, null);
//     }
//     cb(null, saved);
//   },
// );
// return new Question(questionToSave);
