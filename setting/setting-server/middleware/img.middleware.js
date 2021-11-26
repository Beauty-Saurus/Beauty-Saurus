const multer = require("multer");
const path = require("path");

const settingStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../setting-view/static/img/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const realStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../../static/img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const settingDir = multer({
  storage: settingStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".svg"
    ) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

const realDir = multer({
  storage: realStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".svg"
    ) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

exports.imgUpload = function (req, res, next) {
  settingDir.single("imgFile")(req, res, next);
  realDir.single("imgFile")(req, res, next);
  next();
};
