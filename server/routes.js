const express = require('express');
const controller = require('./controller');

const router = express.Router();
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now());
  next();
};

router.use(timeLog);

// GET questions
router.get('/questions', controller.questions.getQuestions);

// POST question
router.post('/questions/', controller.questions.addQuestion);

// PUT question - report a question

// PUT question - mark a question helpful

// GET answers
router.get('/questions/:question_id/answers', controller.answers.getAnswers);

// POST answer
router.post('/questions/:question_id/answers', controller.answers.addAnswer);

// PUT answer - report a answer

// PUT answer - mark a answer helpful

module.exports = router;
