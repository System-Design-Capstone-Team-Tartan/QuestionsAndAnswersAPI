// promises require
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fsPromises = require('fs/promises');

// repo require
const path = require('path');
const { parser } = require('./parser');
const { insertMany } = require('../models/mongoDB/questions');

// various paths
const pathToQuestions = path.resolve(__dirname, '../database/data/questions.csv');
const pathToQuestionsSplit = path.resolve(__dirname, '../database/data/questions');

// get total rows in csv import
async function getRowCount() {
  try {
    const { stdout, stderr } = await exec(`wc -l < ${pathToQuestions}`);
    return Number(stdout);
  } catch (e) {
    console.error(e);
  }
}

// get all files in the directory
async function getFiles() {
  try {
    const splitFiles = await fsPromises.readdir(pathToQuestionsSplit);
    return splitFiles;
  } catch (e) {
    console.error(e);
  }
}

// read a file's contents
async function readFileAndParse(fileName) {
  const pathToSplitQuestion = path.resolve(pathToQuestionsSplit, `${fileName}`);
  try {
    const fileContent = await fsPromises.readFile(pathToSplitQuestion, 'utf-8');
    const parsedData = parser(fileContent.split('\n'));
    return parsedData;
  } catch (e) {
    console.error(e);
  }
}

async function handleBatchInserts() {
  const splitFiles = await getFiles();
  const totalRowsToInsert = await getRowCount();
  try {
    let rowsInserted = 0;
    for (let i = 0; i < splitFiles.length; i += 1) {
      const parsedData = await readFileAndParse(splitFiles[i]);
      const bulkInserted = await insertMany(parsedData);
      rowsInserted += bulkInserted.length;
      console.log('Running Process Questions -- Rows Inserted / Total ', rowsInserted, totalRowsToInsert);
    }
    return rowsInserted;
  } catch (e) {
    console.error(e);
  }
}

async function handleEndProcess() {
  console.time();
  const totalRowsToInsert = await getRowCount();
  const totalRowsInserted = await handleBatchInserts();
  if (totalRowsToInsert === totalRowsInserted) {
    console.timeEnd();
    process.exit();
  }
}
handleEndProcess();

// answers_photos: 0 = photo_id, 1 = answer_id, 2 = URL

/**
 * answers:
 * 0 = answer_id,
 * 1 = question_id,
 * 2 = question_body,
 * 3 = question_date, no time stamp, just date
 * 4 = answerer_name,
 * 5 = answerer_email,
 * 6 = question_reported, 0 for false, 1 for true.
 * 7 = question_helpfullness
 */
