const multer = require("multer");
const path = require("path");

const settingStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./../setting-view/docs/${req.body.navName}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const realStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./../../docs/${req.body.navName}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const settingDir = multer({
  storage: settingStorage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== ".md") {
      return callback(new Error("Only Markdwon are allowed"));
    }
    callback(null, true);
  },
});

const realDir = multer({
  storage: realStorage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== ".md") {
      return callback(new Error("Only Markdwon are allowed"));
    }
    callback(null, true);
  },
});

exports.mdUpload = function (req, res, next) {
  settingDir.single("dropFile")(req, res, next);
  realDir.single("dropFile")(req, res, next);
  next();
};
