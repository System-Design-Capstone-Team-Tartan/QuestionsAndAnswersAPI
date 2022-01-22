/* eslint-disable no-console */ // console is intended show process times and errors
/* eslint-disable consistent-return */ // no return in catch blocks to break script
const { AnswerImport } = require('../index');

const insertMany = async (answers) => {
  try {
    const answersToInsert = answers.map((answer) => {
      const answerSchema = {
        id: answer[0],
        question_id: answer[1],
        body: answer[2].replaceAll('"', ''),
        date: answer[3].replaceAll('"', ''),
        answerer_name: answer[4].replaceAll('"', ''),
        answerer_email: answer[5].replaceAll('"', ''),
        reported: answer[6],
        helpful: answer[7],
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
