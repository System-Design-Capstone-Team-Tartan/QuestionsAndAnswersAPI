const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qa', (err) => {
  if (err) {
    throw err;
  }
});

const questionsImportSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true },
  product_id: { type: Number, index: true },
  question_body: { type: String },
  question_date: { type: String },
  asker_name: { type: String },
  asker_email: { type: String },
  reported: { type: Number },
  question_helpfulness: { type: Number },
});

const answersImportSchema = new mongoose.Schema({
  answer_id: { type: Number, unique: true },
  question_id: { type: Number, index: true },
  answer_body: { type: String },
  answer_date: { type: String },
  answerer_name: { type: String },
  answerer_email: { type: String },
  reported: { type: Number },
  answer_helpfulness: { type: Number },
});

const answersPhotosImportSchema = new mongoose.Schema({
  photo_id: { type: Number, unique: true },
  answer_id: { type: Number, index: true },
  url: { type: String },
});

// for ETL import
const QuestionImport = mongoose.model('QuestionImport', questionsImportSchema);
const AnswerImport = mongoose.model('AnswerImport', answersImportSchema);
const AnswerPhotoImport = mongoose.model('AnswerPhotoImport', answersPhotosImportSchema);

// for CRUD operations after combining imports
const questionsSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true },
  product_id: { type: Number, index: true },
  question_body: { type: String },
  question_date: { type: String },
  asker_name: { type: String },
  asker_email: { type: String },
  reported: { type: Number },
  question_helpfulness: { type: Number },
  answers: {},
});

const Question = mongoose.model('Question', questionsSchema);

module.exports = {
  QuestionImport,
  AnswerImport,
  AnswerPhotoImport,
  Question,
};
