import SettingModalWrap from "../SettingModalWrap/SettingModalWrap";
import React, { useEffect, useState } from "react";
import Inputs from "../../SettingInputs/SettingInputs";
import useInput from "@site/src/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@site/src/modules";
import { title } from "@site/docusaurus.config";

const HeaderSetting = ({ onClose, ...props }): JSX.Element => {
  const ConfigJson = useSelector(
    (state: RootState) => state.jsonReducer.header
  );
  const dispatch = useDispatch();
  const paddingTop = useInput(ConfigJson["padding-top"].replace("px", ""));
  const paddingBottom = useInput(
    ConfigJson["padding-bottom"].replace("px", "")
  );
  const backgroundColor = useInput(ConfigJson["background-color"]);
  const backgroundImage = useInput(ConfigJson["background-image"]);
  const headerFont = useInput(ConfigJson["font-family"]);
  const titleFontSize = useInput(
    ConfigJson.title["font-size"].replace("px", "")
  );
  const titleFontColor = useInput(ConfigJson.title["font-color"]);
  const taglineFontSize = useInput(
    ConfigJson.tagline["font-size"].replace("px", "")
  );
  const taglineFontColor = useInput(ConfigJson.tagline["font-color"]);
  const buttonshow = useInput(ConfigJson.button.show);
  const buttonLink = useInput(ConfigJson.button.link);
  const buttonFontSize = useInput(
    ConfigJson.button["font-size"].replace("px", "")
  );
  const buttonFontColor = useInput(ConfigJson.button["font-color"]);
  const buttonBackColor = useInput(ConfigJson.button["background-color"]);
  const [titleElems, setTitleElems] = useState(ConfigJson.title);
  const [taglineElems, setTaglineElems] = useState(ConfigJson.tagline);
  const [buttonElems, setButtonElems] = useState(ConfigJson.button);
  const fontFamily = [
    "Roboto",
    "Arial",
    "Verdana",
    "Franklin Gothic Medium",
    "courier New",
    "Gill Sans",
    "Trebuchet MS",
  ];

  return (
    <SettingModalWrap onClose={onClose} {...props}>
      <Inputs.Title>background-color</Inputs.Title>
      <Inputs.Color
        color={backgroundColor.value}
        onChange={backgroundColor.onChange}
      />
      {/* <Inputs.Title>background-image</Inputs.Title>
       <Inputs.Img /> */}
      <Inputs.Title>top padding</Inputs.Title>
      <Inputs.Number
        name="top 여백"
        unit="px"
        value={paddingTop.value}
        onChange={paddingTop.onChange}
        placeholder={paddingTop.value}
      />
      <Inputs.Number
        name="bottom 여백"
        unit="px"
        value={paddingBottom.value}
        onChange={paddingBottom.onChange}
        placeholder={paddingBottom.value}
      />
      <Inputs.Title>font</Inputs.Title>
      <Inputs.Option
        options={fontFamily}
        current={headerFont.value}
        onChange={headerFont.onChange}
      />
      <Inputs.Title>font size</Inputs.Title>
      <Inputs.Number
        name="title"
        unit="px"
        value={titleFontSize.value}
        onChange={titleFontSize.onChange}
        placeholder={titleFontSize.value}
      />
      <Inputs.Number
        name="sub title"
        unit="px"
        value={taglineFontSize.value}
        onChange={taglineFontSize.onChange}
        placeholder={taglineFontSize.value}
      />
      <Inputs.Number
        name="button"
        unit="px"
        value={buttonFontSize.value}
        onChange={buttonFontSize.onChange}
        placeholder={buttonFontSize.value}
      />
      <Inputs.Title>button url</Inputs.Title>
      <Inputs.Input value={buttonLink.value} onChange={buttonLink.onChange} />
      <Inputs.Title>title color</Inputs.Title>
      <Inputs.Color
        color={titleFontColor.value}
        onChange={titleFontColor.onChange}
      />
      <Inputs.Title>sub title color</Inputs.Title>
      <Inputs.Color
        color={taglineFontColor.value}
        onChange={taglineFontColor.onChange}
      />
      <Inputs.Title>link button font color</Inputs.Title>
      <Inputs.Color
        color={buttonFontColor.value}
        onChange={buttonFontColor.onChange}
      />
      <Inputs.Title>button background-color</Inputs.Title>
      <Inputs.Color
        color={buttonBackColor.value}
        onChange={buttonBackColor.onChange}
      />
    </SettingModalWrap>
  );
};

export default HeaderSetting;
