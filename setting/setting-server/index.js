const port = 5000;
const express = require("express");
const app = express();
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");
const controller = require("./controller");

const corsOptions = {
  origin: ["http://localhost/", "http://localhost:3000"],
  credentials: true,
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(
  logger(":method :url :status :res[content-length] - :response-time ms :date")
);

// navbar config
app.get("/navbar", controller.setNavbar);

// create 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
