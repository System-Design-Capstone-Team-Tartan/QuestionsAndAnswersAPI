const { } = require('../../models/mongoDB/questions');

const getQuestions = async (req, res) => {
  console.log(req.query);
  // req.query.product_id
  const productId = req.query.product_id;
  // const foundQuestions = await findAllBy(productId);
  // console.log(foundQuestions[0].answers);
  // req.query.page
  // req.query.count
  res.send('getting all answers');
};

module.exports = {
  getQuestions,
};
