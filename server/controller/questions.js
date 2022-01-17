const getQuestions = (req, res) => {
  console.log(req.query);
  // req.query.product_id
  // req.query.page
  // req.query.count
  res.send('getting all answers');
};

module.exports = {
  getQuestions,
};
