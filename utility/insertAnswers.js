/* eslint-disable no-await-in-loop */ // await insert into database before next
/* eslint-disable consistent-return */ // no return in catch blocks to break script
/* eslint-disable no-console */ // console is intended show process times and errors

// promises require
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fsPromises = require('fs/promises');

// process statistics
const v8 = require('v8');

// repo require
const path = require('path');
const { parser } = require('./parser');
const { insertMany } = require('../models/mongoDB/forImport/answers');

// various paths
const pathToAnswers = path.resolve(__dirname, '../database/data/answers.csv');
const pathToAnswersSplit = path.resolve(__dirname, '../database/data/answers');

// get total rows in csv import
const getRowCount = async () => {
  try {
    const { stdout } = await exec(`wc -l < ${pathToAnswers}`);
    return Number(stdout);
  } catch (error) {
    console.error(error.stderr);
  }
};

// get all files in the directory
const getFiles = async () => {
  try {
    const splitFiles = await fsPromises.readdir(pathToAnswersSplit);
    return splitFiles;
  } catch (error) {
    console.error(error);
  }
};

// read a file's contents
const readFileAndParse = async (fileName) => {
  const pathToSplitAnswers = path.resolve(pathToAnswersSplit, `${fileName}`);
  try {
    const fileContent = await fsPromises.readFile(pathToSplitAnswers, 'utf-8');
    const parsedData = parser(fileContent.split('\n'));
    return parsedData;
  } catch (error) {
    console.error(error);
  }
};

const handleBatchInserts = async () => {
  const splitFiles = await getFiles();
  const totalRowsToInsert = await getRowCount();
  try {
    let rowsInserted = 0;
    for (let i = 0; i < splitFiles.length; i += 1) {
      const parsedData = await readFileAndParse(splitFiles[i]);
      const bulkInserted = await insertMany(parsedData);
      rowsInserted += bulkInserted.length;
      console.log('Running Process Answers -- Rows Inserted / Total ', rowsInserted, totalRowsToInsert);
    }
    return rowsInserted;
  } catch (error) {
    console.error(error);
  }
};

const handleEndProcess = async () => {
  try {
    console.time();
    const totalRowsToInsert = await getRowCount();
    const totalRowsInserted = await handleBatchInserts();
    // process check
    if (totalRowsToInsert === totalRowsInserted) {
      console.timeEnd();
      const stats = v8.getHeapSpaceStatistics();
      const statisticList = [];
      for (let i = 0; i < stats.length; i += 1) {
        const statistic = stats[i];
        statisticList.push({
          'Space Name': statistic.space_name,
          'Space Size': statistic.space_size,
          'Used Space Size': statistic.space_used_size,
          'Space Available': statistic.space_available_size,
          'Physical Space Size': statistic.physical_space_size,
        });
      }
      console.table(statisticList);
      process.exit();
    }
  } catch (error) {
    console.error(error);
  }
};
handleEndProcess();
