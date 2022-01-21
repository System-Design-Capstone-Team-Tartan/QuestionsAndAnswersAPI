const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qa', (err) => {
  if (err) {
    throw err;
  }
});

const questionsImportSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true },
  product_id: { type: Number, index: true },
  question_body: { type: String, minLength: 1, maxLength: 1000 },
  question_date: { type: String },
  asker_name: { type: String, minLength: 1, maxLength: 60 },
  asker_email: { type: String, minLength: 1, maxLength: 60 },
  reported: { type: Number, max: 1 },
  question_helpfulness: { type: Number },
});

const answersImportSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  question_id: { type: Number, index: true },
  body: { type: String, minLength: 1, maxLength: 1000 },
  date: { type: String },
  answerer_name: { type: String, minLength: 1, maxLength: 60 },
  answerer_email: { type: String, minLength: 1, maxLength: 60 },
  reported: { type: Number, max: 1 },
  helpful: { type: Number },
});

const answersPhotosImportSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
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
  question_body: { type: String, minLength: 1, maxLength: 1000 },
  question_date: { type: String },
  asker_name: { type: String, minLength: 1, maxLength: 60 },
  asker_email: { type: String, minLength: 1, maxLength: 60 },
  reported: { type: Number, max: 1 },
  question_helpfulness: { type: Number },
  answers: {},
});

const lastQuestionIdSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true },
});

const answersSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  question_id: { type: Number, index: true },
  body: { type: String, minLength: 1, maxLength: 1000 },
  date: { type: String },
  answerer_name: { type: String, minLength: 1, maxLength: 60 },
  answerer_email: { type: String, minLength: 1, maxLength: 60 },
  reported: { type: Number, max: 1 },
  helpful: { type: Number },
  photos: [String],
});

const lastAnswerIdSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
});

const Question = mongoose.model('Question', questionsSchema);
const LastQuestionId = mongoose.model('LastQuestionId', lastQuestionIdSchema);
const Answer = mongoose.model('Answer', answersSchema);
const LastAnswerId = mongoose.model('LastAnswerId', lastAnswerIdSchema);

module.exports = {
  QuestionImport,
  AnswerImport,
  AnswerPhotoImport,
  Question,
  LastQuestionId,
  Answer,
  LastAnswerId,
};
