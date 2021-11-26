const port = 5001;
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const controller = require("./controller");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerSpec = YAML.load(__dirname + "/swagger/openapi.yaml");
const corsOptions = {
  origin: [
    "http://localhost/",
    "http://localhost:3000",
    "http://localhost:5001",
  ],
  credentials: true,
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(
  logger(":method :url :status :res[content-length] - :response-time ms :date")
);

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
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const settingDir = multer({
  storage: settingStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
const realDir = multer({
  storage: realStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

function imgUpload(req, res, next) {
  settingDir.single("imgFile")(req, res, next);
  realDir.single("imgFile")(req, res, next);
  next();
}
// const md_dir = multer({ dest: "../setting-view/docs" });

// logo 나 feature 이미지 수정할때 이 경로로 일단 먼저 올려줘야함
app.post("/api/uploadImg", imgUpload, (req, res) => {
  console.log(req.file);
  res.send({
    message: "[post] api/uploadImg - Success",
  });
});
// config patch api
app.post("/api/config", controller.setConfig);
// reset all api
app.post("/api/reset", controller.reset);
// feature config api
app.get("/api/feature", controller.getFeature);
// navbar config api
app.get("/api/navbar", controller.getNavbar);
app.post("/api/navbar", controller.setNavbar);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);
