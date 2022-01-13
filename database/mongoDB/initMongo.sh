#!/bin/zsh

# drop current database 'qa'
mongosh qa \
  --eval 'db.dropDatabase()'

### VALIDATION QUERIES

# ensure header id's align between import csv(s) via validation
# question.csv headers: question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness

mongosh qa \
  --eval 'db.createCollection("questions", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["question_id", "product_id", "question_body", "question_date", "asker_name", "asker_email", "reported", "question_helpfulness"],
        properties: {
          question_id: {
            bsonType: "int",
            description: "must be an integer and is required"
          },
          product_id: {
            bsonType: "int",
            description: "must be a string and is required"
          },
          question_body: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          question_date: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          asker_name: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          asker_email: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          reported: {
            bsonType: "int",
            description: "must be an integer and is required"
          },
          question_helpfulness: {
            bsonType: "int",
            description: "must be an integer and is required"
          }
        }
      }
    }
  })'

# ensure question_id is unique
mongosh qa \
  --eval 'db.questions.createIndex( { question_id: 1 }, { unique: true } )'

# test insert
# mongosh qa \
#   --eval 'db.questions.insertOne({
#     question_id: 7,
#     product_id: 2,
#     question_body: "is this a test? what gives?",
#     question_date: "2022-01-04",
#     asker_name: "McTest",
#     asker_email: "mcTest@gmail.com",
#     reported: 0,
#     question_helpfulness: 0
#   })'

## answers.csv headers: answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness
mongosh qa \
  --eval 'db.createCollection("answers", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["answer_id", "question_id", "answer_body", "answer_date", "answerer_name", "answerer_email", "reported", "answer_helpfulness"],
        properties: {
          answer_id: {
            bsonType: "int",
            description: "must be an integer and is required"
          },
          question_id: {
            bsonType: "int",
            description: "must be a string and is required"
          },
          answer_body: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          answer_date: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          answerer_name: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          answerer_email: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          reported: {
            bsonType: "int",
            description: "must be an integer and is required"
          },
          answer_helpfulness: {
            bsonType: "int",
            description: "must be an integer and is required"
          }
        }
      }
    }
  })'

# ensure answer_id is unique
mongosh qa \
  --eval 'db.answers.createIndex( { answer_id: 1 }, { unique: true } )'

# test insert
# mongosh qa \
#   --eval 'db.answers.insertOne({
#     answer_id: 5,
#     question_id: 2,
#     answer_body: "this is a test!",
#     answer_date: "2022-01-04",
#     answerer_name: "McAnswer",
#     answerer_email: "mcAnswer@gmail.com",
#     reported: 0,
#     answer_helpfulness: 0
#   })'

## answers_photos.csv headers: photo_id, answer_id, url
mongosh qa \
  --eval 'db.createCollection("answersPhotos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["photo_id", "answer_id", "url"],
        properties: {
          photo_id: {
            bsonType: "int",
            description: "must be an integer and is required"
          },
          answer_id: {
            bsonType: "int",
            description: "must be a string and is required"
          },
          url: {
            bsonType: "string",
            description: "must be a string and is required"
          }
        }
      }
    }
  })'

# ensure photo_ is unique
mongosh qa \
  --eval 'db.answersPhotos.createIndex( { photo_id: 1 }, { unique: true } )'

# test insert
# mongosh qa \
#   --eval 'db.answersPhotos.insertOne({
#     photo_id: 4,
#     answer_id: 2,
#     url: "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
#   })'

### IMPORT QUERIES

# import all questions
# mongoimport \
#   -d qa \
#   -c questions \
#   --type csv \
#   --file ./database/data/testData/testQuestions.csv \
#   # --file ./database/data/questions.csv \
#   --headerline

# query to show questions collection
# mongosh qa \
#   --eval 'db.questions.find()'

# import all answers
# mongoimport \
#   -d qa \
#   -c answers \
#   --type csv \
#   --file ./database/data/testData/testAnswers.csv \
#   # --file ./database/data/answers.csv \
#   --headerline

# # query to show answers collection
# # mongosh qa \
# #   --eval 'db.answers.find()'

# import all answers photos
# mongoimport \
#   -d qa \
#   -c answersPhotos \
#   --type csv \
#   --file ./database/data/testData/testAnswersPhotos.csv \
#   # --file ./database/data/answers_photos.csv \
#   --headerline

# query to show answersPhotos collection
# mongosh qa \
#   --eval 'db.answersPhotos.find()'
