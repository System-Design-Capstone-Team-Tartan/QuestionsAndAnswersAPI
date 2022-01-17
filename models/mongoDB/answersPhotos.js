const { AnswersPhotos } = require('./index');

const insertMany = async (answersPhotos) => {
  const answersPhotosToInsert = answersPhotos.map((answersPhoto) => {
    const answersPhotoSchema = {
      photo_id: answersPhoto[0],
      answer_id: answersPhoto[1],
      url: answersPhoto[2],
    };
    return answersPhotoSchema;
  });
  try {
    const bulkInserted = AnswersPhotos.insertMany(
      answersPhotosToInsert,
      {
        limit: 10000, // 1000 seems to be the most optimal
        ordered: false,
        lean: false,
      },
    );
    return bulkInserted;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  insertMany,
};
