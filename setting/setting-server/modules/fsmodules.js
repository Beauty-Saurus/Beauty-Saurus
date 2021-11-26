const fs = require("fs");
const filePath = __dirname + "/../../../beauty.saurus.config.json";
const configFile = fs.readFileSync(filePath, "utf-8");
const configJSON = JSON.parse(configFile);

function applyEntries(reqData, targetJSON) {
  const reqEntries = Object.entries(reqData);
  reqEntries.forEach((entry) => {
    const [key, value] = entry;
    console.log(key, value);
    if (typeof value == "object") applyEntries(value, targetJSON[key]);
    else targetJSON[key] = reqData[key];
  });
  return targetJSON;
}

function updateConfig(reqData) {
  if (!fs.existsSync(filePath))
    throw Error("beauty.saurus.config file doesn't exists!");
  const targetJSON = configJSON;

  console.log("targetJSON", targetJSON);
  console.log("reqData", reqData);
  applyEntries(reqData, targetJSON);
  fs.writeFileSync(filePath, JSON.stringify(targetJSON, null, 2));
}

function updateConfigbyKey(reqData, key) {
  if (!fs.existsSync(filePath))
    throw Error("beauty.saurus.config file doesn't exists!");
  const targetJSON = configJSON[key];

  applyEntries(reqData, targetJSON);

  configJSON[key] = targetJSON;
  fs.writeFileSync(filePath, JSON.stringify(configJSON, null, 2));
}

function getConfig() {
  if (!fs.existsSync(filePath))
    res.send({
      error: "beauty.saurus.config file doesn't exists!",
    });
  return configJSON;
}

function getConfigbyKey(key) {
  if (!fs.existsSync(filePath))
    res.send({
      error: "beauty.saurus.config file doesn't exists!",
    });
  const targetJSON = configJSON[key];
  return targetJSON;
}

module.exports = {
  applyEntries,
  updateConfig,
  updateConfigbyKey,
  getConfig,
  getConfigbyKey,
};
