const { occurrenceCount } = require('./occurrenceCount');

module.exports.parser = (rows) => {
  // skip header
  const parsedFileData = [];
  for (let i = 1; i < rows.length; i += 1) {
    if (rows[i].length !== 0) {
      const delimittedRow = rows[i].split(',');
      const parsedRow = [];
      for (let j = 0; j < delimittedRow.length; j += 1) {
        if (occurrenceCount(delimittedRow[j], '"') === 1) {
          let handleQuotes = delimittedRow[j];
          for (let k = j + 1; k < delimittedRow.length; k += 1) {
            if (occurrenceCount(delimittedRow[k], '"') === 1) {
              handleQuotes += delimittedRow[k];
              j += 1;
            }
          }
          parsedRow.push(handleQuotes);
        } else {
          parsedRow.push(delimittedRow[j]);
        }
      }
      parsedFileData.push(parsedRow);
    }
  }
  return parsedFileData;
};
