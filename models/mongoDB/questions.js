const { Question, LastQuestionId } = require('./index');

const findAllBy = async (productId, page, count) => {
  try {
    const skipBy = (page - 1) * count;
    const foundQuestions = await Question.find(
      { $and: [{ product_id: productId }, { reported: { $ne: 1 } }] },
      null,
      { skip: skipBy, limit: count }, // will count reported questions
    );
    return foundQuestions;
  } catch (error) {
    return error;
  }
};

const add = async (productId, body, name, email) => {
  try {
    let addedQuestion;
    // if product exists
    if (await Question.exists({ product_id: productId })) {
    // will return latest question id before incrementing
      const latestQuestionId = await LastQuestionId.findOneAndUpdate(
        {},
        { $inc: { question_id: 1 } },
        { returnDocument: 'after' },
      );
      console.log(latestQuestionId);
      const questionToAdd = {
        question_id: latestQuestionId.question_id,
        product_id: productId,
        question_body: body,
        question_date: new Date().toISOString().split('T')[0],
        asker_name: name,
        asker_email: email,
        reported: 0,
        question_helpfulness: 0,
        answers: {},
      };
      addedQuestion = await Question.findOneAndUpdate(
        { question_id: latestQuestionId.question_id },
        questionToAdd,
        { returnDocument: 'after', upsert: true, runValidators: true },
      );
    }
    return addedQuestion;
  } catch (error) {
    return error;
  }
};

const markHelpful = async (questionId) => {
  try {
    let markedHelpful;
    if (await Question.exists({ question_id: questionId })) {
      markedHelpful = await Question.findOneAndUpdate(
        { question_id: questionId },
        { $inc: { question_helpfulness: 1 } },
        { returnDocument: 'after' },
      );
    }
    return markedHelpful;
  } catch (error) {
    return error;
  }
};

const report = async (questionId) => {
  try {
    let reported;
    if (await Question.exists({ question_id: questionId })) {
      reported = await Question.findOneAndUpdate(
        { question_id: questionId },
        { reported: 1 },
        { returnDocument: 'after', runValidators: true },
      );
    }
    return reported;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findAllBy,
  add,
  markHelpful,
  report,
};
