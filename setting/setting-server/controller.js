const fsmodules = require("./modules/fsmodules");
const constant = require("./modules/constant");

exports.getConfig = function (req, res) {
  const configJSON = fsmodules.getConfig();
  res.json({
    message: "[get] api/config - Success",
    data: configJSON,
  });
};

exports.setConfig = function (req, res) {
  const reqData = req.body;
  fsmodules.updateConfig(reqData);
  res.send({
    message: "[post] api/config - Success",
  });
};

exports.setNavbar = function (req, res) {
  const reqData = req.body;
  fsmodules.updateConfigbyKey(reqData, constant.NAVBAR);
  res.send({
    message: "[post] api/navbar - Success",
  });
};

exports.getNavbar = function (req, res) {
  const navbarJSON = fsmodules.getConfigbyKey(constant.NAVBAR);
  res.json({
    message: "[get] api/navbar - Success",
    data: navbarJSON,
  });
};

exports.setHeader = function (req, res) {
  const reqData = req.body;
  fsmodules.updateConfig(reqData, constant.HEADER);
  res.send({
    message: "[post] api/header - Success",
  });
};

exports.getHeader = function (req, res) {
  const headerJSON = fsmodules.getConfigbyKey(constant.HEADER);
  res.json({
    message: "[get] api/header - Success",
    data: headerJSON,
  });
};
