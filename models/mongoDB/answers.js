// date must be a string in YYYY-mm-dd format;
const { Answer } = require('./index');

const insertMany = async (answers) => {
  const answersToInsert = answers.map((answer) => {
    const answerSchema = {
      answer_id: answer[0],
      question_id: answer[1],
      answer_body: answer[2],
      answer_date: answer[3],
      asker_name: answer[4],
      asker_email: answer[5],
      reported: answer[6],
      answer_helpfulness: answer[7],
    };
    return answerSchema;
  });
  try {
    const bulkInserted = Answer.insertMany(
      answersToInsert,
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

// TODO: Move this to model queries
// script to simulate a join between answers and answers' photos
// mongosh qa --eval 'db.answers.aggregate([
  // {
    // "$lookup": {
      // "from": "answersPhotos",
      // "localField": "answer_id",
      // "foreignField": "answer_id",
      // "as": "photos"
    // }
  // }
// ])'