const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qa', (err) => {
  if (err) {
    throw err;
  }
});

const questionsSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true },
  product_id: { type: Number },
  question_body: { type: String },
  question_date: { type: String },
  asker_name: { type: String },
  asker_email: { type: String },
  reported: { type: Number },
  question_helpfulness: { type: Number },
});

const Question = mongoose.model('Question', questionsSchema);

module.exports = Question;
