const { findAllBy } = require('../../models/mongoDB/answers');

const getAnswers = async (req, res) => {
  // console.log(req.params); // will be sent with params
  // console.log(req.query); // page and count will be sent as a query
  const questionId = req.params.question_id;
  const foundAnswers = await findAllBy(questionId);
  console.log('found answers ', foundAnswers[0].photos);
  res.send('getting all answers');
};

module.exports = {
  getAnswers,
};
