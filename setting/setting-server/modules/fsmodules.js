const fs = require("fs");
const path = require("path");
const filePath = path.join(
  __dirname,
  "..",
  "..",
  "setting-view",
  "beauty.saurus.config.json"
);
const configFile = fs.readFileSync(filePath, "utf-8");
const configJSON = JSON.parse(configFile);

function applyEntries(reqData, targetJSON) {
  const reqEntries = Object.entries(reqData);
  reqEntries.forEach((entry) => {
    const [key, value] = entry;
    if (!Array.isArray(value) && typeof value == "object")
      applyEntries(value, targetJSON[key]);
    else targetJSON[key] = reqData[key];
  });
  return targetJSON;
}

function updateConfig(reqData) {
  if (!fs.existsSync(filePath))
    throw Error("beauty.saurus.config file doesn't exists!");
  const targetJSON = configJSON;

  applyEntries(reqData, targetJSON);
  fs.writeFileSync(filePath, JSON.stringify(targetJSON, null, 2));
}

function writePosition(filePath, positionNum) {
  fs.writeFileSync(filePath, `---\nsidebar_position:${positionNum}\n---`);
}

function writeId(filePath, id) {
  fs.writeFileSync(filePath, `---\nid:${id}\n---`);
}

function writeIdPosition(filePath, positionNum, id) {
  fs.writeFileSync(
    filePath,
    `---\nid: ${id}\nsidebar_position: ${positionNum}\n---`
  );
}

function createSidebarName(reqData) {
  const navItems = reqData["items"]; //array
  console.log("__dirname", __dirname);
  console.log("__filename", __filename);

  navItems.forEach((item) => {
    const settingDocs = path.join(
      __dirname,
      "..",
      "..",
      "setting-view",
      "docs",
      item.name
    );
    const realDocs = path.join(
      __dirname + "..",
      "..",
      "..",
      "docs",
      "item.name"
    );
    fs.mkdirSync(settingDocs, { recursive: true });
    fs.mkdirSync(realDocs, { recursive: true });
    writeIdPosition(settingDocs + `/${item.name}.md`, 1, item.name);
    writeIdPosition(realDocs + `/${item.name}.md`, 1, item.name);
  });
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

function reset(reqData) {
  fs.writeFileSync(filePath, JSON.stringify(reqData, null, 2));
  //fs.writeFileSync("./hi.json", JSON.stringify({ hi: "hi" }, null, 2));
  console.log("reqData", reqData);
  console.log("filePath", filePath);
}

module.exports = {
  applyEntries,
  updateConfig,
  updateConfigbyKey,
  createSidebarName,
  getConfig,
  getConfigbyKey,
  reset,
};
