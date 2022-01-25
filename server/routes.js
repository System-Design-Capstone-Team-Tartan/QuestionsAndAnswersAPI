const express = require('express');
const controller = require('./controller');

const router = express.Router();

// GET questions
router.get('/questions', controller.questions.getQuestions);

// POST question
router.post('/questions', controller.questions.addQuestion);

// PUT question - mark a question helpful
router.put('/questions/:question_id/helpful', controller.questions.markQuestionHelpful);

// PUT question - report a question
router.put('/questions/:question_id/report', controller.questions.reportQuestion);

// GET answers
router.get('/questions/:question_id/answers', controller.answers.getAnswers);

// POST answer
router.post('/questions/:question_id/answers', controller.answers.addAnswer);

// PUT answer - mark an answer helpful
router.put('/answers/:answer_id/helpful', controller.answers.markAnswerHelpful);

// PUT answer - report an answer
router.put('/answers/:answer_id/report', controller.answers.reportAnswer);

module.exports = router;
