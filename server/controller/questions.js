const getQuestions = (req, res) => {
  console.log(req.params);
  res.send('getting all answers');
};

module.exports = {
  getQuestions,
};
