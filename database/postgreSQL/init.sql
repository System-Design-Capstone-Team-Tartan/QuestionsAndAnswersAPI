-- question.csv headers question_id, product_id, body, question_date, asker_name, asker_email, reported, question_helpfulness

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  question_id serial,
  product_id text NOT NULL,
  question_body varchar(1000) NOT NULL,
  question_date timestamp NOT NULL default now(),
  asker_name varchar(60) NOT NULL,
  asker_email varchar(60) NOT NULL,
  reported integer NOT NULL default 0,
  question_helpfulness integer NOT NULL default 0,
  PRIMARY KEY (question_id)
);

\copy questions FROM './database/data/testData/testQuestions.csv' csv header;
-- \copy questions FROM './database/data/questions.csv' csv header;

-- answers.csv headers id, question_id, body, date, answerer_name, answerer_email, reported, helpful
-- what if an answer exists for a question that doesn't exist. Do we ignore these?

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id serial,
  question_id serial,
  body varchar(1000) NOT NULL,
  date timestamp NOT NULL default now(),
  answerer_name varchar(60) NOT NULL,
  answerer_email varchar(60) NOT NULL,
  reported integer NOT NULL default 0,
  helpful integer NOT NULl default 0,
  PRIMARY KEY(answer_id),
  FOREIGN KEY(question_id)
    REFERENCES questions(id)
);

\copy answers FROM './database/data/testData/testAnswers.csv' csv header;
-- \copy answers FROM './database/data/answers.csv' csv header;

-- answers_photos.csv headers id, answer_id, url

DROP TABLE IF EXISTS answersPhotos;

CREATE TABLE answersPhotos (
  id serial,
  answer_id serial,
  url text,
  PRIMARY KEY(id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(answer_id)
);

\copy answersPhotos FROM './database/data/testData/testAnswersPhotos.csv' csv header;
-- \copy answersPhotos FROM './database/data/answers_photos.csv' csv header;