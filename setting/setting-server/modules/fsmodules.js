const fs = require("fs");
const path = require("path");
const filePath = path.normalize(
  __dirname + "/../../setting-view/beauty.saurus.config.json"
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

async function countDocsFiles(navName) {
  const dirName = path.normalize(
    __dirname + `/./../../setting-view/docs/${navName}`
  );
  const fileCount = fs.readdirSync(dirName).length;
  //   console.log("fileCount", fileCount);
  return fileCount;
}

function copyMarkdownFile(filePath, dest) {
  try {
    fs.copyFileSync(filePath, dest);
  } catch (err) {
    throw Error("Markdown file does not copied!!!!! oh my GOD!!!!");
  }
  console.log("Markdown file copied successfully!!!!! yeah!!!!!!!");
}

function deleteMarkdownFile(navName, filename) {
  const filePaths = [
    path.normalize(
      __dirname + `/./../../setting-view/docs/${navName}/${filename}`
    ),
    path.normalize(__dirname + `/./../../../docs/${navName}/${filename}`),
  ];

  filePaths.forEach((filePath) => {
    fs.unlinkSync(filePath);
  });
}

function createMarkdownFile(filePaths, dests, positionNum) {
  const dataBuf = `---\nsidebar_position: ${positionNum}\n---\n\n`;
  filePaths.forEach((filePath, i) => {
    fs.readFile(filePath, (err, data) => {
      if (err) throw new Error("Can't read markdown file!");
      const originData = data.toString();

      fs.writeFileSync(filePath, dataBuf, { encoding: "utf8" });
      fs.appendFileSync(filePath, originData);

      copyMarkdownFile(filePath, dests[i]);
    });
  });
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
    const settingDocs = __dirname + `/./../../setting-view/docs/${item.name}`;
    const realDocs = __dirname + `/./../../../docs/${item.name}`;
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

module.exports = {
  updateConfig,
  updateConfigbyKey,
  countDocsFiles,
  deleteMarkdownFile,
  createMarkdownFile,
  createSidebarName,
  getConfig,
  getConfigbyKey,
};
