const customConfig = require("../../beauty.saurus.config.json");

class NavItem {
  constructor(type, docId, position, label) {
    this.type = type;
    this.docId = docId;
    this.position = position;
    this.label = label;
  }

  getNavItem() {
    return {
      type: this.type,
      docId: this.docId,
      position: this.position,
      label: this.label,
    };
  }
}

exports.getNavItemsObj = function () {
  const navItems = customConfig.navbar.items;
  let navItemsRepo = [];

  navItems.forEach((item) => {
    const navObj = new NavItem(
      item.type,
      item.name + "/" + item.name,
      item.position,
      item.name
    );
    navItemsRepo.push(navObj);
  });

  console.log("navItemsRepo", navItemsRepo);
  return navItemsRepo;
};

// function applycustomNavItems() {
//   // back 에서 navItems[i].name 의 폴더를 만들어줘야 한다.
//   const navItems = customConfig.navbar.items;
//   console.log(typeof navItems);
// }

// applycustomNavItems();

exports.applycustomCss = function () {
  const root = document.querySelector(":root");
  console.log("customConfig", customConfig);

  //navbar configuration
  root.getElementsByClassName("navbar__logo")[0].style.margin =
    customConfig.navbar["title-margin"];
  root.style.setProperty(
    "--ifm-navbar-background-color",
    customConfig.navbar["background-color"]
  );
  root.style.setProperty("--ifm-navbar-height", customConfig.navbar["height"]);

  //header configuration

  //feature configuration
  const { feature } = customConfig;

  root.getElementsByClassName("linkSection")[0].style.backgroundColor =
    feature["linkBackground-color"];
  root.getElementsByClassName(
    "linkSection"
  )[0].style.backgroundImage = `url(${feature["linkBackground-image"]})`;
  root.getElementsByClassName("linkSection")[0].style.height =
    feature["linkHeight"];
  root.getElementsByClassName("basicSection")[0].style.backgroundColor =
    feature["basicBackground-color"];
  root.getElementsByClassName(
    "basicSection"
  )[0].style.backgroundImage = `url(${feature["basicBackground-image"]})`;
  root.getElementsByClassName("basicSection")[0].style.height =
    feature["basicHeight"];
};
