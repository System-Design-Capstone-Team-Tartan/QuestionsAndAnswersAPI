#!/bin/zsh

# combine all photo URL's into imported answers and output a new collection
mongosh qa \
  --eval 'db.answerimports.aggregate([
      {
        $lookup: {
          from: "answerphotoimports",
          localField: "id",
          foreignField: "answer_id",
          as: "photos"
        }
      },
      {
        $project: {
          id: 1,
          question_id: 1,
          body: 1,
          date: 1,
          answerer_name: 1,
          answerer_email: 1,
          reported: 1,
          helpful: 1,
          photos: {
            $map: {
              input: "$photos",
              as: "photos",
              in: "$$photos.url"
            }
          }
        }
      },
      {
        $out: "answers"
      }
    ])'

#create a unique index for answers, id
mongosh qa \
  --eval 'db.answers.createIndex(
    {
      id: 1
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

# create a collection to store the largest answer id
mongosh qa \
  --eval 'db.answers.aggregate([
      { $sort: { id: -1 }},
      { $limit: 1 },
      { $project: { id: 1, _id: 0 } },
      { $out: "lastanswerids" }
])'

# combine all answers as an object with its key value as the answer id and the value as the answer.
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
                k: { $toString: "$$answer.id" },
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

# create a unique index for questions, question id
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
