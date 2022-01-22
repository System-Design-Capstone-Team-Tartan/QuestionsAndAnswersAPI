/* eslint-disable no-console */ // console is intended show process times and errors
/* eslint-disable consistent-return */ // no return in catch blocks to break script
const { AnswerPhotoImport } = require('../index');

const insertMany = async (answersPhotos) => {
  try {
    const answersPhotosToInsert = answersPhotos.map((answersPhoto) => {
      const answersPhotoSchema = {
        id: answersPhoto[0],
        answer_id: answersPhoto[1],
        url: answersPhoto[2].replaceAll('"', ''),
      };
      return answersPhotoSchema;
    });
    const bulkInserted = await AnswerPhotoImport.insertMany(
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
