const { AnswerImport } = require('../index');

const insertMany = async (answers) => {
  try {
    const answersToInsert = answers.map((answer) => {
      const answerSchema = {
        answer_id: answer[0],
        question_id: answer[1],
        answer_body: answer[2],
        answer_date: answer[3],
        answerer_name: answer[4],
        answerer_email: answer[5],
        reported: answer[6],
        answer_helpfulness: answer[7],
      };
      return answerSchema;
    });
    const bulkInserted = await AnswerImport.insertMany(
      answersToInsert,
      {
        limit: 10000, // 1000 seems to be the most optimal
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
