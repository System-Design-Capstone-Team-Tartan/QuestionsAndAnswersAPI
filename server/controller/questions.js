const { findAllBy, add, markHelpful, report } = require('../../models/mongoDB/questions');

const getQuestions = async (req, res) => {
  try {
    if (req.query.product_id === undefined) {
      throw new Error('Please provide a product id');
    }
    const productId = req.query.product_id;

    const page = req.query.page || 1;
    const count = req.query.count || 5;
    if (page <= 0 || count <= 0) {
      throw new Error('Please enter positive integers for pagination criteria');
    }

    const foundQuestions = await findAllBy(productId, page, count);
    if (foundQuestions instanceof Error) {
      throw foundQuestions;
    }
    if (foundQuestions.length === 0) {
      throw new Error('No questions found for given product id');
    }

    const result = {
      product_id: productId,
      results: foundQuestions,
    };
    return res.send(result);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
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
    if (addedQuestion instanceof Error) {
      throw addedQuestion;
    }
    if (addedQuestion === undefined) {
      throw new Error('No such product id found');
    }

    return res.send(addedQuestion);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
};

const markQuestionHelpful = async (req, res) => {
  try {
    if (req.params.question_id === undefined) {
      throw new Error('Please provide a question id');
    }
    const questionId = req.params.question_id;

    const markedHelpfulQuestion = await markHelpful(questionId);
    if (markedHelpfulQuestion instanceof Error) {
      throw markedHelpfulQuestion;
    }
    if (markedHelpfulQuestion === undefined) {
      throw new Error('No such question id found');
    }

    return res.send(markedHelpfulQuestion);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
};

const reportQuestion = async (req, res) => {
  try {
    if (req.params.question_id === undefined) {
      throw new Error('Please provide a question id');
    }
    const questionId = req.params.question_id;

    const reportedQuestion = await report(questionId);
    if (reportedQuestion instanceof Error) {
      throw reportedQuestion;
    }
    if (reportedQuestion === undefined) {
      throw new Error('No such question id found');
    }

    return res.send(reportedQuestion);
  } catch (error) {
    return res.status(400).json({ error: error.toString() });
  }
};

module.exports = {
  getQuestions,
  addQuestion,
  markQuestionHelpful,
  reportQuestion,
};
