import customConfig from "../../setting/setting-view/beauty.saurus.config.json";

// 이 부분은 이제 setting-view 의 applycustomCss 와 맞춰주어야 한다.
export function applycustomCss() {
  window.onload = function () {
    const root = document.querySelector(":root") as HTMLElement;
    // console.log("customConfig", customConfig);
    //navbar configuration
    (<HTMLElement>root.getElementsByClassName("navbar__logo")[0]).style.margin =
      customConfig.navbar["title-margin"];
    root.style.setProperty(
      "--ifm-navbar-background-color",
      customConfig.navbar["background-color"]
    );
    root.style.setProperty(
      "--ifm-navbar-height",
      customConfig.navbar["height"]
    );
    root.style.setProperty(
      "--ifm-fontcolor-navbar-title",
      customConfig.navbar.itemFontColor
    );
    root.style.setProperty(
      "--ifm-navbar-link-color",
      customConfig.navbar.itemFontColor
    );

    //header configuration
    const { header } = customConfig;
    // root.getElementsByClassName(
    //   "heroBanner_src-components-HeaderContents-module"
    // )[0].style.backgroundColor = "#000000";
    root.style.setProperty("--ifm-padding-header-top", header["padding-top"]);
    root.style.setProperty(
      "--ifm-padding-header-bottom",
      header["padding-bottom"]
    );
    root.style.setProperty(
      "--ifm-color-header-background",
      header["background-color"]
    );
    root.style.setProperty(
      "--ifm-fontfamily-header-title",
      header["font-family"]
    );
    root.style.setProperty(
      "--ifm-fontsize-header-title",
      header.title["font-size"]
    );
    root.style.setProperty(
      "--ifm-fontcolor-header-title",
      header.title["font-color"]
    );
    root.style.setProperty(
      "--ifm-fontsize-header-tagline",
      header.tagline["font-size"]
    );
    root.style.setProperty(
      "--ifm-fontcolor-header-tagline",
      header.tagline["font-color"]
    );
    root.style.setProperty(
      "--ifm-fontsize-header-button",
      header.button["font-size"]
    );
    root.style.setProperty(
      "--ifm-fontcolor-header-button",
      header.button["font-color"]
    );
    root.style.setProperty(
      "--ifm-color-header-button",
      header.button["background-color"]
    );

    //feature configuration
    const { feature } = customConfig;

    //근데 세팅도큐에서는 이렇게 할게 아니라 스테이트를 읽어와야겠네.
    //초기값만 json에서 읽어와서 initialState에 넣어줘야될듯.
    (<HTMLElement>(
      root.getElementsByClassName("linkSection")[0]
    )).style.backgroundColor = feature["linkBackground-color"];
    (<HTMLElement>(
      root.getElementsByClassName("linkSection")[0]
    )).style.backgroundImage = `url(${feature["linkBackground-image"]})`;
    (<HTMLElement>root.getElementsByClassName("linkSection")[0]).style.height =
      feature["linkHeight"];
    (<HTMLElement>(
      root.getElementsByClassName("basicSection")[0]
    )).style.backgroundColor = feature["basicBackground-color"];
    (<HTMLElement>(
      root.getElementsByClassName("basicSection")[0]
    )).style.backgroundImage = `url(${feature["basicBackground-image"]})`;
    (<HTMLElement>root.getElementsByClassName("basicSection")[0]).style.height =
      feature["basicHeight"];

    root.style.setProperty(
      "--ifm-fontcolor-feature-title",
      feature.itemFontColor
    );
  };
}
