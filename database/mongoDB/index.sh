#!/bin/zsh

## split import data into multiple files
awk -v l=50000 '(NR==1){header=$0;next}
                (NR%l==2) {
                  close(file);
                  file=sprintf("%s.%0.5d.csv",FILENAME,++c)
                  sub(/csv[.]/,"",file)
                  print header > file
                }
                {print > file}' ./database/data/testData/testAnswers.csv

awk -v l=5 '(NR==1){header=$0;next}
                (NR%l==2) {
                  close(file);
                  file=sprintf("%s.%0.5d.csv",FILENAME,++c)
                  sub(/csv[.]/,"",file)
                  print header > file
                }
                {print > file}' ./database/data/testData/testQuestions.csv

awk -v l=50000 '(NR==1){header=$0;next}
                (NR%l==2) {
                  close(file);
                  file=sprintf("%s.%0.5d.csv",FILENAME,++c)
                  sub(/csv[.]/,"",file)
                  print header > file
                }
                {print > file}' ./database/data/testData/testAnswersPhotos.csv

## delete folder if exists
rm -rf ./database/data/testData/testAnswers
rm -rf ./database/data/testData/testQuestions
rm -rf ./database/data/testData/testAnswersPhotos

## create folder to put split up data into
mkdir ./database/data/testData/testAnswers
mkdir ./database/data/testData/testQuestions
mkdir ./database/data/testData/testAnswersPhotos

## move all split up files into new folder
mv ./database/data/testData/testAnswers.?*.csv ./database/data/testData/testAnswers
mv ./database/data/testData/testQuestions.?*.csv ./database/data/testData/testQuestions
mv ./database/data/testData/testAnswersPhotos.?*.csv ./database/data/testData/testAnswersPhotos

zsh ./database/mongoDB/initMongo.sh

node ./utility/fileReader

## COUNT VALIDATION

echo '=========================================='

echo 'Number of Rows in questions table'
mongosh qa \
  --eval 'db.questions.find().count()'

echo 'Number of Rows within questions CSV table'
wc -l ./database/data/testData/testQuestions.csv
# wc -l ./database/data/questions.csv

echo '=========================================='

echo 'Number of Rows in answers table'
mongosh qa \
  --eval 'db.answers.find().count()'

echo 'Number of Rows within answers CSV table'
wc -l ./database/data/testData/testAnswers.csv
# wc -l ./database/data/answers.csv

echo '=========================================='

echo 'Number of Rows in answersPhotos table'
mongosh qa \
  --eval 'db.answersPhotos.find().count()'

echo 'Number of Rows within answersPhotos CSV table'
wc -l ./database/data/testData/testAnswersPhotos.csv
# wc -l ./database/data/answers_photos.csv