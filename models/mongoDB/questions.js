const { Question, LastQuestionId } = require('./index');

const findAllBy = async (productId, page, count) => {
  try {
    const skipBy = (page - 1) * count;
    const foundQuestions = await Question.find(
      { product_id: productId },
      null,
      { skip: skipBy, limit: count },
    );
    return foundQuestions;
  } catch (error) {
    return error;
  }
};

const add = async (productId, body, name, email) => {
  try {
    // will return latest question_id before incrementing
    const latestQuestionId = await LastQuestionId.findOneAndUpdate(
      {},
      { $inc: { question_id: 1 } },
      { returnDocument: 'after' },
    );
    const questionToAdd = {
      question_id: latestQuestionId.question_id,
      product_id: productId,
      question_body: body,
      question_date: Date(),
      asker_name: name,
      asker_email: email,
      reported: 0,
      question_helpfulness: 0,
      answers: {},
    };
    const addedQuestion = await Question.findOneAndUpdate(
      { question_id: latestQuestionId.question_id },
      questionToAdd,
      { returnDocument: 'after', upsert: true },
    );
    return addedQuestion;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findAllBy,
  add,
};
