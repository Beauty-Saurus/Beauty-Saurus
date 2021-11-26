const port = 5001;
const express = require("express");
const app = express();
const createError = require("http-errors");
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
