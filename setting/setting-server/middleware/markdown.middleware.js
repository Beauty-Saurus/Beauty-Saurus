const multer = require("multer");
const path = require("path");
const settingPath = path.normalize(__dirname + "/../../setting-view/docs");
const realPath = path.normalize(__dirname + "/../../../docs");
const mdFormData = { navName: "", positionNum: 0, filename: "" };
const mdFileName = { settingFilename: "", realFilename: "" };

const settingStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    mdFormData.positionNum = req.body.positionNum;
    mdFormData.navName = req.body.navName;
    mdFormData.filename = file.originalname;
    // console.log(mdFormData);
    cb(null, `${settingPath}/${req.body.navName}`);
  },
  filename: function (req, file, cb) {
    const filename = new Date().valueOf() + file.originalname;
    mdFileName.settingFilename = filename;
    const filePath = path.normalize(
      `${settingPath}/${mdFormData.navName}/${mdFileName.settingFilename}`
    );
    const dest = path.normalize(
      `${realPath}/${mdFormData.navName}/${mdFileName.settingFilename}`
    );
    req.filename = filename;
    req.filePath = filePath;
    req.dest = dest;
    req.positionNum = mdFormData.positionNum;
    cb(null, filename);
  },
});

exports.settingDir = multer({
  storage: settingStorage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== ".md") {
      return callback(new Error("Only Markdwon are allowed"));
    }
    callback(null, true);
  },
});
