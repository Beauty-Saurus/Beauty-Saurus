const fs = require("fs");
const filePath = __dirname + "/../../beauty.saurus.config.json";
const configFile = fs.readFileSync(filePath, "utf-8");
const configJSON = JSON.parse(configFile);

exports.setNavbar = function (req, res) {
  // graphql 로 하면 좋겠다...
  const reqData = req.body;
  console.log("reqData", reqData);

  if (!fs.existsSync(filePath))
    res.send({
      error: "beauty.saurus.config file doesn't exists!",
    });
  const navbarJSON = configJSON.navbar;
  const reqKeys = Object.keys(reqData);

  reqKeys.forEach((key) => {
    if (key === "items") return;
    navbarJSON[key] = reqData[key];
  });
  configJSON.navbar = navbarJSON;
  //   console.log(configJSON);
  fs.writeFileSync(filePath, JSON.stringify(configJSON, null, 2));

  res.send({
    message: "[post] api/navbar - Success",
  });
};

exports.getNavbar = function (req, res) {
  if (!fs.existsSync(filePath))
    res.send({
      error: "beauty.saurus.config file doesn't exists!",
    });
  const navbarJSON = configJSON.navbar;

  res.json({
    message: "[get] api/navbar - Success",
    data: navbarJSON,
  });
};
