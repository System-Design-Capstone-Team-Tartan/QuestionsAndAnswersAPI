// date must be a string in YYYY-mm-dd format;
const { Question } = require('./index');

const insertMany = async (questions) => {
  const questionsToInsert = questions.map((question) => {
    const questionSchema = {
      question_id: question[0],
      product_id: question[1],
      question_body: question[2],
      question_date: question[3],
      asker_name: question[4],
      asker_email: question[5],
      reported: question[6],
      question_helpfulness: question[7],
    };
    return questionSchema;
  });
  try {
    const bulkInserted = Question.insertMany(
      questionsToInsert,
      {
        limit: 1000, // 1000 seems to be the most optimal
        ordered: false,
        lean: false,
      },
    );
    return bulkInserted;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  insertMany,
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
