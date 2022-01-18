# QuestionsAndAnswersAPI

This is the Atelier API service that services the Catwalk Website. Please use the following routes for the API.

Questions

GET /qa/questions

Parameters
product_id, integer
page, integer
count, integer

POST /qa/questions

Parameters
product_id, integer
body, string
name, string
email, string

PUT /qa/questions/:question_id/helpful

Parameters
question_id, integer

PUT /qa/questions/:question_id/report

Parameters
question_id, integer

Answers

GET /qa/questions/:question_id/answers

Parameters
question_id, integer
page, integer
count, integer

POST /qa/questions/:question_id/answers

Parameters
question_id, int
body, string
name, string
email, string
photos, [string]

PUT /qa/answers/:answer_id/helpful

Parameters
answer_id, integer

PUT /qa/answers/:answer_id/report

Parameters
answer_id, integer


