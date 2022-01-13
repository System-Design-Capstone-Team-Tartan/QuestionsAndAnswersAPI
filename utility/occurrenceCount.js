module.exports.occurrenceCount = (str, criteria) => {
  let count = 0;
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === criteria) {
      count += 1;
    }
  }
  return count;
};
