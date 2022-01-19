const { findAllBy } = require('../../models/mongoDB/questions');

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
    res.send('getting all answers');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getQuestions,
};
