#!/bin/zsh

# combine all photo URL's into imported answers and output a new collection
mongosh qa \
  --eval 'db.answerimports.aggregate([
      {
        $lookup: {
          from: "answerphotoimports",
          localField: "answer_id",
          foreignField: "answer_id",
          as: "photos"
        }
      },
      {
        $out: "answers"
      }
    ])'

#create a unique index for answers, answer_id
mongosh qa \
  --eval 'db.answers.createIndex(
    {
      answer_id: 1
    },
    {
      unique: true
    }
  )'

#create a index for faster sorting, question_id
mongosh qa \
  --eval 'db.answers.createIndex(
    {
      question_id: 1
    }
  )'

# create a collection to store the largest answer_id
mongosh qa \
  --eval 'db.answers.aggregate([
      { $sort: { answer_id: -1 }},
      { $limit: 1 },
      { $project: { answer_id: 1, _id: 0 } },
      { $out: "lastanswerids" }
])'

# combine all answers as an object with its key value as the answer_Id and the value as the answer.
mongosh qa \
  --eval 'db.questionimports.aggregate([
    {
      $lookup: {
        from: "answers",
        localField: "question_id",
        foreignField: "question_id",
        as: "answers"
      }
    },
    {
      $addFields: {
        answers: {
          $arrayToObject: {
            $map: {
              input: "$answers",
              as: "answer",
              in: {
                k: { $toString: "$$answer.answer_id" },
                v: "$$answer"
              }
            }
          }
        }
      }
    },
    {
      $out: "questions"
    }
  ])'

# create a unique index for questions, question_id
mongosh qa \
  --eval 'db.questions.createIndex(
    {
      question_id: 1
    },
    {
      unique: true
    }
  )'

# create a index for faster sorting, product_id
mongosh qa \
  --eval 'db.questions.createIndex(
    {
      product_id: 1
    }
  )'

# create a collection to store the largest question_id
mongosh qa \
  --eval 'db.questions.aggregate([
      { $sort: { question_id: -1 }},
      { $limit: 1 },
      { $project: { question_id: 1, _id: 0 } },
      { $out: "lastquestionids" }
])'
