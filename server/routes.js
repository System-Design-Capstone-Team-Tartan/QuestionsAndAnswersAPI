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

// GET answers
router.get('/questions/:question_id/answers', controller.answers.getAnswers);

module.exports = router;
