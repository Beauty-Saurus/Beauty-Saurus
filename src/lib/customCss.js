import customConfig from "../../beauty.saurus.config.json";

export function applycustomCss() {
  const root = document.querySelector(":root");
  console.log("customConfig", customConfig);

  //navbar configuration
  //   root.getElementsByClassName("navbar__logo")[0].style.margin = "0 0 0 0";
  root.style.setProperty("--ifm-navbar-background-color", "pink");

  //header configuration

  //feature configuration
}
