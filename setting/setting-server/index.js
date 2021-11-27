const port = 5001;
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const controller = require("./controller");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const imgMiddleware = require("./middleware/img.middleware");
const imgsMiddleware = require("./middleware/images.middleware");
const mdMiddleware = require("./middleware/markdown.middleware");

const swaggerSpec = YAML.load(__dirname + "/swagger/openapi.yaml");

const corsOptions = {
  origin: [
    "http://localhost/",
    "http://localhost:3000",
    "http://localhost:3001",
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

app.post("/api/upload/markdown", mdMiddleware.mdUpload, controller.setMarkdown);
// config patch api
app.post("/api/config", controller.setConfig);
app.post("/api/navbar/items", controller.setNavbarItems);
app.post("/api/upload/images", imgsMiddleware.imgUpload, controller.setImgs);
// logo 나 feature 이미지 수정할때 이 경로로 일단 먼저 올려줘야함
app.post("/api/upload/img", imgMiddleware.imgUpload, controller.setImg);
// reset all api
app.post("/api/reset", controller.reset);
// feature config api
app.get("/api/feature", controller.getFeature);
// navbar config api
app.get("/api/navbar", controller.getNavbar);
app.post("/api/navbar", controller.setNavbar);

app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:${port}`)
);
