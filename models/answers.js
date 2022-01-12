// date must be a string in YYYY-mm-dd format;


// TODO: Move this to model queries
// script to simulate a join between answers and answers' photos
// mongosh qa --eval 'db.answers.aggregate([
  // {
    // "$lookup": {
      // "from": "answersPhotos",
      // "localField": "answer_id",
      // "foreignField": "answer_id",
      // "as": "photos"
    // }
  // }
// ])'