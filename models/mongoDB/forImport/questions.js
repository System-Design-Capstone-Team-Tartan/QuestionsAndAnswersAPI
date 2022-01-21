const { QuestionImport } = require('../index');

const insertMany = async (questions) => {
  try {
    const questionsToInsert = questions.map((question) => {
      const questionSchema = {
        question_id: question[0],
        product_id: question[1],
        question_body: question[2].replaceAll('"', ''),
        question_date: question[3].replaceAll('"', ''),
        asker_name: question[4].replaceAll('"', ''),
        asker_email: question[5].replaceAll('"', ''),
        reported: question[6],
        question_helpfulness: question[7],
      };
      return questionSchema;
    });
    const bulkInserted = await QuestionImport.insertMany(
      questionsToInsert,
      {
        limit: 10000,
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
