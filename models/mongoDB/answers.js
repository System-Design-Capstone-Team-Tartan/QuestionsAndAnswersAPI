const { Answer, LastAnswerId, Question } = require('./index');

const findAllBy = async (questionId, page, count) => {
  try {
    const skipBy = (page - 1) * count;
    const foundAnswers = await Answer.find(
      { product_id: questionId },
      null,
      { skip: skipBy, limit: count },
    );
    return foundAnswers;
  } catch (error) {
    return error;
  }
};

const add = async (questionId, body, name, email, photos) => {
  try {
    // will return latest question_id before incrementing
    const latestAnswerId = await LastAnswerId.findOneAndUpdate(
      {},
      { $inc: { answer_id: 1 } },
      { returnDocument: 'after' },
    );
    const answerToAdd = {
      answer_id: latestAnswerId.answer_id,
      question_id: questionId,
      answer_body: body,
      answer_date: Date(),
      answerer_name: name,
      answerer_email: email,
      reported: 0,
      answer_helpfulness: 0,
      photos,
    };
    const addedAnswer = await Answer.findOneAndUpdate(
      { answer_id: latestAnswerId.answer_id },
      answerToAdd,
      { returnDocument: 'after', upsert: true },
    );
    // add answer to related question in questions' collection
    const nestAnswerInQuestions = await Question.findOneAndUpdate(
      { question_id: questionId },
      { $set: { [`answers.${latestAnswerId.answer_id}`]: addedAnswer } },
      { returnDocument: 'after', upsert: true },
    );
    console.log(nestAnswerInQuestions);
    return addedAnswer;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findAllBy,
  add,
};
