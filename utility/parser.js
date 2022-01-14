const { occurrenceCount } = require('./occurrenceCount');

module.exports.parser = (row) => {
  const delimittedRow = row.split(',');
  const parsedData = [];
  for (let i = 0; i < delimittedRow.length; i += 1) {
    if (occurrenceCount(delimittedRow[i], '"') === 1) {
      let handleQuotes = delimittedRow[i];
      for (let j = i + 1; j < delimittedRow.length; j += 1) {
        if (occurrenceCount(delimittedRow[j], '"') === 1) {
          handleQuotes += delimittedRow[j];
          i += 1;
        }
      }
      parsedData.push(handleQuotes);
    } else {
      parsedData.push(delimittedRow[i]);
    }
  }
  return parsedData;
};
