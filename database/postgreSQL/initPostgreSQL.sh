#!/bin/zsh

dropdb qa

createdb qa

psql qa -f init.sql

echo 'Number of Rows in questions table'
psql -d qa -c "SELECT count(*) from questions;"

echo 'Number of Rows within questions CSV table'
wc -l ../data/testQuestions.csv

echo '=========================================='

echo 'Number of Rows in answers table'
psql -d qa -c "SELECT count(*) from answers;"

echo 'Number of Rows within answers CSV table'
wc -l ../data/testAnswers.csv

echo '=========================================='

echo 'Number of Rows in answersPhotos table'
psql -d qa -c "SELECT count(*) from answersPhotos;"

echo 'Number of Rows within answersPhotos CSV table'
wc -l ../data/testAnswersPhotos.csv