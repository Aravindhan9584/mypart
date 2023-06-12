const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;

  return err;
};

module.exports = { createError };

// var Storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "upload");
//   },
//   filename: (req, file, cb) => {
//     null, file.originalname;
//   },
// });
