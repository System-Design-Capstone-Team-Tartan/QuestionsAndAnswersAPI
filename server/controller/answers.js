const getAnswers = (req, res) => {
  console.log(req.params);
  console.log(req.params.question_id);
  res.send('getting all answers');
};

module.exports = {
  getAnswers,
};
