const { findAllBy, add, markHelpful, report } = require('../../models/mongoDB/answers');

const getAnswers = async (req, res) => {
  try {
    if (req.params.question_id === undefined) {
      throw new Error('Please provide a question id');
    }
    const questionId = req.params.question_id;

    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const foundAnswers = await findAllBy(questionId, page, count);

    // send back paginated answers
    console.log(foundAnswers);
    if (foundAnswers.length === 0) {
      throw new Error('No answers found for given question id');
    }
    return res.send(foundAnswers);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const addAnswer = async (req, res) => {
  try {
    const {
      body,
      name,
      email,
      photos,
    } = req.query;
    if (req.params.question_id === undefined) {
      throw new Error('Please provide a question id');
    }
    const questionId = req.params.question_id;
    const addedAnswer = await add(questionId, body, name, email, photos);
    if (addedAnswer === undefined) {
      throw new Error('No such question id found');
    }
    console.log(addedAnswer);
    return res.send(addedAnswer);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const markAnswerHelpful = async (req, res) => {
  try {
    if (req.params.answer_id === undefined) {
      throw new Error('Please provide an answer id');
    }
    const answerId = req.params.answer_id;
    const markedHelpfulAnswer = await markHelpful(answerId);
    if (markedHelpfulAnswer === undefined) {
      throw new Error('No such answer id found');
    }
    console.log(markedHelpfulAnswer);
    return res.send(markedHelpfulAnswer);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const reportAnswer = async (req, res) => {
  try {
    if (req.params.answer_id === undefined) {
      throw new Error('Please provide an answer id');
    }
    const answerId = req.params.answer_id;
    const reportedAnswer = await report(answerId);
    if (reportedAnswer === undefined) {
      throw new Error('No such answer id found');
    }
    console.log(reportedAnswer);
    return res.send(reportedAnswer);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  getAnswers,
  addAnswer,
  markAnswerHelpful,
  reportAnswer,
};
