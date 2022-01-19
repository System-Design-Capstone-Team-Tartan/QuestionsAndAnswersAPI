const { findAllBy, add, markHelpful, report } = require('../../models/mongoDB/questions');

const getQuestions = async (req, res) => {
  try {
    if (req.query.product_id === undefined) {
      throw new Error('Please provide a product id');
    }
    const productId = req.query.product_id;

    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const foundQuestions = await findAllBy(productId, page, count);

    // send back paginated questions
    console.log(foundQuestions);
    if (foundQuestions.length === 0) {
      throw new Error('No questions found for given product id');
    }
    return res.send(foundQuestions);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const addQuestion = async (req, res) => {
  try {
    const {
      product_id,
      body,
      name,
      email,
    } = req.query;
    if (product_id === undefined) {
      throw new Error('Please provide a product id');
    }
    const addedQuestion = await add(product_id, body, name, email);
    if (addedQuestion === undefined) {
      throw new Error('No such product id found');
    }
    console.log(addedQuestion);
    return res.send(addedQuestion);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const markQuestionHelpful = async (req, res) => {
  try {
    if (req.params.question_id === undefined) {
      throw new Error('Please provide a question id');
    }
    const questionId = req.params.question_id;
    const markedHelpfulQuestion = await markHelpful(questionId);
    if (markedHelpfulQuestion === undefined) {
      throw new Error('No such question id found');
    }
    console.log(markedHelpfulQuestion);
    return res.send(markedHelpfulQuestion);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

const reportQuestion = async (req, res) => {
  try {
    if (req.params.question_id === undefined) {
      throw new Error('Please provide a question id');
    }
    const questionId = req.params.question_id;
    const reportedQuestion = await report(questionId);
    if (reportedQuestion === undefined) {
      throw new Error('No such question id found');
    }
    console.log(reportedQuestion);
    return res.send(reportedQuestion);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  getQuestions,
  addQuestion,
  markQuestionHelpful,
  reportQuestion,
};
