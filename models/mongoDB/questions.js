const { Question } = require('./index');

const findAllBy = async (productId, page, count) => {
  try {
    const skipBy = (page - 1) * count;
    const foundQuestions = await Question.find(
      { product_id: productId },
      null,
      { skip: skipBy, limit: count },
    );
    return foundQuestions;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  findAllBy,
};
