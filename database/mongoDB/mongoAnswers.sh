#!/bin/bash

# ensure id's align between csv's.

# drop current database 'test'
mongosh qa \
  --eval 'db.dropDatabase()'

# import all questions
mongoimport \
  -d qa \
  -c questions \
  --type csv \
  --file ../data/questions.csv \
  --headerline

# import all answers
mongoimport \
  -d qa \
  -c answers \
  --type csv \
  --file ../data/answers.csv \
  --headerline

# import all answers photos
mongoimport \
  -d qa \
  -c answersPhotos \
  --type csv \
  --file ../data/answers_photos.csv \
  --headerline

# TODO: Move this to model queries
# script to simulate a join between answers and answers' photos
# mongosh qa --eval 'db.answers.aggregate([
#   {
#     "$lookup": {
#       "from": "answersPhotos",
#       "localField": "answer_id",
#       "foreignField": "answer_id",
#       "as": "photos"
#     }
#   }
# ])'

## question.csv headers question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness

## answers.csv headers answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness

## answers_photos.csv headers photo_id, answer_id, url