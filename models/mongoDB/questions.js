// date must be a string in YYYY-mm-dd format;
const Question = require('./index');

// question.csv headers: question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness

const add = (questions) => {
  const questionsPromises = questions.map((question) => {
    const questionToSave = {
      question_id: question[0],
      product_id: question[1],
      question_body: question[2],
      question_date: question[3],
      asker_name: question[4],
      asker_email: question[5],
      reported: question[6],
      question_helpfulness: question[7],
    };
    return Question.findOneAndUpdate(
      { question_id: question[0] },
      questionToSave,
      { upsert: true },
    );
  });
  return Promise.all(questionsPromises);
};

module.exports = {
  add,
};
