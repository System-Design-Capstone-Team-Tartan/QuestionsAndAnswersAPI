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
    return error;
  }
};

const add = async (questionId, body, name, email, photos) => {
  try {
    let addedAnswer;
    // if question exists
    if (await Question.exists({ question_id: questionId })) {
    // will return latest question id before incrementing
      const latestAnswerId = await LastAnswerId.findOneAndUpdate(
        {},
        { $inc: { id: 1 } },
        { returnDocument: 'after' },
      );
      const answerToAdd = {
        id: latestAnswerId.id,
        question_id: questionId,
        body,
        date: new Date().toISOString().split('T')[0],
        answerer_name: name,
        answerer_email: email,
        reported: 0,
        helpful: 0,
        photos,
      };
      // add answer with incremented answer id
      addedAnswer = await Answer.findOneAndUpdate(
        { id: latestAnswerId.id },
        answerToAdd,
        { returnDocument: 'after', upsert: true, runValidators: true },
      );
      // add answer to related question in questions' collection
      await Question.findOneAndUpdate(
        { id: questionId },
        { $set: { [`answers.${latestAnswerId.id}`]: addedAnswer } },
        { returnDocument: 'after' },
      );
    }
    return addedAnswer;
  } catch (error) {
    return error;
  }
};

const markHelpful = async (answerId) => {
  try {
    let markedHelpful;
    if (await Answer.exists({ id: answerId })) {
      markedHelpful = await Answer.findOneAndUpdate(
        { id: answerId },
        { $inc: { helpful: 1 } },
        { returnDocument: 'after' },
      );
    }
    return markedHelpful;
  } catch (error) {
    return error;
  }
};

const report = async (answerId) => {
  try {
    let reported;
    if (await Answer.exists({ id: answerId })) {
      reported = await Answer.findOneAndUpdate(
        { id: answerId },
        { reported: 1 },
        { returnDocument: 'after' },
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
