const { findAllBy, add } = require('../../models/mongoDB/answers');

const getAnswers = async (req, res) => {
  try {
    if (req.params.question_id === undefined) {
      throw new Error('Please provide a question id');
    }
    const questionId = req.params.question_id;

    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const foundAnswers = await findAllBy(questionId, page, count);

    // console.log('found answers ', foundAnswers[0].photos);
    console.log(foundAnswers);
    res.send('getting all answers');
  } catch (error) {
    console.error(error);
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
    return res.send(addedAnswer);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  getAnswers,
  addAnswer,
};
