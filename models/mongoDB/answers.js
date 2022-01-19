const { Answer, LastAnswerId, Question } = require('./index');

const findAllBy = async (questionId, page, count) => {
  try {
    const skipBy = (page - 1) * count;
    const foundAnswers = await Answer.find(
      { $and: [{ question_id: questionId }, { reported: { $ne: 1 } }] },
      null,
      { skip: skipBy, limit: count },
    );
    return foundAnswers;
  } catch (error) {
    console.error('Error with database query');
    return error;
  }
};

const add = async (questionId, body, name, email, photos) => {
  try {
    let addedAnswer;
    // if question exists
    if (await Question.exists({ question_id: questionId })) {
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
      // add answer with incremented answer id
      addedAnswer = await Answer.findOneAndUpdate(
        { answer_id: latestAnswerId.answer_id },
        answerToAdd,
        { returnDocument: 'after', upsert: true },
      );
      // add answer to related question in questions' collection
      await Question.findOneAndUpdate(
        { question_id: questionId },
        { $set: { [`answers.${latestAnswerId.answer_id}`]: addedAnswer } },
        { returnDocument: 'after' },
      );
    }
    return addedAnswer;
  } catch (error) {
    console.error('Error with database query');
    return error;
  }
};

const markHelpful = async (answerId) => {
  try {
    let markedHelpful;
    if (await Answer.exists({ answer_id: answerId })) {
      markedHelpful = await Answer.findOneAndUpdate(
        { answer_id: answerId },
        { $inc: { answer_helpfulness: 1 } },
        { returnDocument: 'after' },
      );
    }
    return markedHelpful;
  } catch (error) {
    console.error('Error with database query');
    return error;
  }
};

const report = async (answerId) => {
  try {
    let reported;
    if (await Answer.exists({ answer_id: answerId })) {
      reported = await Answer.findOneAndUpdate(
        { answer_id: answerId },
        { reported: 1 },
        { returnDocument: 'after' },
      );
    }
    return reported;
  } catch (error) {
    console.error('Error with database query');
    return error;
  }
};

module.exports = {
  findAllBy,
  add,
  markHelpful,
  report,
};
