const fs = require("fs");
const filePath = __dirname + "/../../beauty.saurus.config.json";
const configFile = fs.readFileSync(filePath, "utf-8");
const configJSON = JSON.parse(configFile);

exports.setNavbar = function (req, res) {
  // graphql 로 하면 좋겠다...
  // const reqData = req.body;
  const reqData = {
    title: "Beauty-Saurus Fuck test",
    "title-margin": "",
    height: "",
    "background-color": "white",
    position: "",
    "logo-image": "img/logo.svg",
    "logo-alt": "Beauty-Saurus logo image",
    items: [
      {
        name: "Doc1",
        type: "doc",
        color: "",
        position: "left",
      },
      {
        name: "Doc2",
        type: "doc",
        color: "",
        position: "left",
      },
    ],
  };
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

  res.json({
    message: "complete",
    data: configJSON,
  });
};
