#!/bin/zsh

# split import data into multiple files
awk -v l=10000  '(NR==1){header=$0;next}
                (NR%l==2) {
                  close(file);
                  file=sprintf("%s.%0.5d.csv",FILENAME,++c)
                  sub(/csv[.]/,"",file)
                  print header > file
                }
                {print > file}' ./database/data/questions.csv

awk -v l=10000  '(NR==1){header=$0;next}
                (NR%l==2) {
                  close(file);
                  file=sprintf("%s.%0.5d.csv",FILENAME,++c)
                  sub(/csv[.]/,"",file)
                  print header > file
                }
                {print > file}' ./database/data/answers.csv

awk -v l=10000  '(NR==1){header=$0;next}
                (NR%l==2) {
                  close(file);
                  file=sprintf("%s.%0.5d.csv",FILENAME,++c)
                  sub(/csv[.]/,"",file)
                  print header > file
                }
                {print > file}' ./database/data/answers_photos.csv

# create directory if exists
rm -rf ./database/data/questions
rm -rf ./database/data/answers
rm -rf ./database/data/answers_photos

# create directory to put split up data into
mkdir ./database/data/questions
mkdir ./database/data/answers
mkdir ./database/data/answers_photos

# move all split up files into the new directory
mv ./database/data/questions.?*.csv ./database/data/questions
mv ./database/data/answers.?*.csv ./database/data/answers
mv ./database/data/answers_photos.?*.csv ./database/data/answers_photos

# initialize mongo database by dropping, mongoimport will exist here as an option
zsh ./database/mongoDB/initMongo.sh

## node scripts to read each directory
node ./utility/insertQuestions
node ./utility/insertAnswers
node ./utility/insertAnswersPhotos

## COUNT VALIDATION

echo '=========================================='

echo 'Number of Rows in questions table'
mongosh qa \
  --eval 'db.questionimports.find().count()'

echo 'Number of Rows within questions CSV table'
wc -l ./database/data/questions.csv

echo '=========================================='

echo 'Number of Rows in answers table'
mongosh qa \
  --eval 'db.answerimports.find().count()'

echo 'Number of Rows within answers CSV table'
wc -l ./database/data/answers.csv

echo '=========================================='

echo 'Number of Rows in answersPhotos table'
mongosh qa \
  --eval 'db.answerphotoimports.find().count()'

echo 'Number of Rows within answersPhotos CSV table'
wc -l ./database/data/answers_photos.csv

# create combined collections for faster reads
zsh ./database/mongoDB/makeCombinedCollection.sh

echo '=========================================='

echo 'Number of questions within combined questions & answers table'
mongosh qa \
  --eval 'db.questions.find().count()'

echo 'Number of Rows within questions CSV table'
wc -l ./database/data/questions.csv

echo '=========================================='

echo 'Number of answers nested within questions in the questions & answers table'

# check to see if all answers have been aggregated by count
mongosh qa \
  --eval 'db.questions.aggregate([
    {
      $project: {
        count: { $size: { $objectToArray: "$answers"} }
      }
    },
    {
      $group: {
        _id: null,
        totalCount: {
          $sum: "$count"
        }
      }
    }
  ])'

echo 'Number of answers within combined answers & photos table'
mongosh qa \
  --eval 'db.answers.find().count()'

echo 'Number of Rows within answers CSV table'
wc -l ./database/data/answers.csv

echo '=========================================='

echo 'Number of photos nested within answers in the answers & questions table'

# check to see if all photos have been aggregated by count
mongosh qa \
  --eval 'db.answers.aggregate([
    {
      $project: {
        count: { $size: "$photos" }
      }
    },
    {
      $group: {
        _id: null,
        totalCount: {
          $sum: "$count"
        }
      }
    }
  ])'

echo 'Number of Rows within answersPhotos CSV table'
wc -l ./database/data/answers_photos.csv