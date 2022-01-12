-- question.csv headers question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness

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

\copy questions FROM '../data/testQuestions.csv' csv header;

-- answers.csv headers answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness
-- what if an answer exists for a question that doesn't exist. Do we ignore these?

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  answer_id serial,
  question_id serial,
  answer_body varchar(1000) NOT NULL,
  answer_date timestamp NOT NULL default now(),
  answerer_name varchar(60) NOT NULL,
  answerer_email varchar(60) NOT NULL,
  reported integer NOT NULL default 0,
  answer_helpfulness integer NOT NULl default 0,
  PRIMARY KEY(answer_id),
  FOREIGN KEY(question_id)
    REFERENCES questions(question_id)
);

\copy answers FROM '../data/testAnswers.csv' csv header;

-- answers_photos.csv headers photo_id, answer_id, url

DROP TABLE IF EXISTS answersPhotos;

CREATE TABLE answersPhotos (
  photo_id serial,
  answer_id serial,
  url text,
  PRIMARY KEY(photo_id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(answer_id)
);

\copy answersPhotos FROM '../data/testAnswersPhotos.csv' csv header;