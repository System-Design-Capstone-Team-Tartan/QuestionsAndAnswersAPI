const { occurrenceCount } = require('./occurrenceCount');

module.exports.parser = (data) => {
  const parsedData = [];
  for (let i = 0; i < data.length; i += 1) {
    if (occurrenceCount(data[i], '"') === 1) {
      let handleQuotes = data[i];
      for (let j = i + 1; j < data.length; j += 1) {
        handleQuotes += data[j];
        if (data[j].includes('"')) {
          parsedData.push(handleQuotes);
          i = j;
          break;
        }
      }
    } else {
      parsedData.push(data[i]);
    }
  }
  return parsedData;
};
