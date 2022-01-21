const { findAllBy, add, markHelpful, report } = require('../../models/mongoDB/answers');

const getAnswers = async (req, res) => {
  try {
    if (req.params.question_id === undefined) {
      throw new Error('Please provide a question id');
    }
    const questionId = req.params.question_id;

    const page = req.query.page || 1;
    const count = req.query.count || 5;
    if (page <= 0 || count <= 0) {
      throw new Error('Please enter positive integers for pagination criteria');
    }

    const foundAnswers = await findAllBy(questionId, page, count);
    if (foundAnswers instanceof Error) {
      throw foundAnswers;
    }
    if (foundAnswers.length === 0) {
      throw new Error('No answers found for given question id');
    }

    const result = {
      question_id: questionId,
      results: foundAnswers,
    };
    return res.send(result);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
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
    let parsedPhotos;
    try {
      parsedPhotos = JSON.parse(photos);
    } catch (error) {
      throw new Error('Please ensure photos data is a JSON array');
    }
    const questionId = req.params.question_id;

    const addedAnswer = await add(questionId, body, name, email, parsedPhotos);
    if (addedAnswer instanceof Error) {
      throw addedAnswer;
    }
    if (addedAnswer === undefined) {
      throw new Error('No such question id found');
    }

    return res.send(addedAnswer);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
};

const markAnswerHelpful = async (req, res) => {
  try {
    if (req.params.answer_id === undefined) {
      throw new Error('Please provide an answer id');
    }
    const answerId = req.params.answer_id;

    const markedHelpfulAnswer = await markHelpful(answerId);
    if (markedHelpfulAnswer instanceof Error) {
      throw markedHelpfulAnswer;
    }
    if (markedHelpfulAnswer === undefined) {
      throw new Error('No such answer id found');
    }

    return res.send(markedHelpfulAnswer);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
};

const reportAnswer = async (req, res) => {
  try {
    if (req.params.answer_id === undefined) {
      throw new Error('Please provide an answer id');
    }
    const answerId = req.params.answer_id;

    const reportedAnswer = await report(answerId);
    if (reportedAnswer instanceof Error) {
      throw reportedAnswer;
    }
    if (reportedAnswer === undefined) {
      throw new Error('No such answer id found');
    }

    return res.send(reportedAnswer);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
};

module.exports = {
  getAnswers,
  addAnswer,
  markAnswerHelpful,
  reportAnswer,
};
