import SettingModalWrap from "../SettingModalWrap/SettingModalWrap";
import React, { useState } from "react";
import Inputs from "../../SettingInputs/SettingInputs";
import useInput from "@site/src/hooks/useInput";

const NavSetting = ({ onClose, ...props }) => {
  const title = useInput("");
  const titleMarginLeft = useInput(0);
  const titleMarginRight = useInput(0);
  const height = useInput(0);
  const bgColor = useInput("");
  const positionIdx = useInput(0);
  //const logoImg = useInput("");
  //const Item = useInput();

  const position = ["sticky", "transation"];

  return (
    <SettingModalWrap onClose={onClose} {...props}>
      <Inputs.Title>title</Inputs.Title>
      <Inputs.Input
        value={title.value}
        onChange={title.onChange}
        placeholder="title name"
      ></Inputs.Input>

      <Inputs.Title>logo</Inputs.Title>
      <Inputs.Img></Inputs.Img>

      <Inputs.Title>title margin</Inputs.Title>
      <Inputs.Number
        name="margin-left"
        unit="px"
        value={titleMarginLeft.value}
        onChange={titleMarginLeft.onChange}
        placeholder="0"
      ></Inputs.Number>
      <Inputs.Number
        name="margin-right"
        unit="px"
        value={titleMarginRight.value}
        onChange={titleMarginRight.onChange}
        placeholder="0"
      ></Inputs.Number>
      <Inputs.Title>height</Inputs.Title>
      <Inputs.Number
        name="height"
        unit="px"
        value={height.value}
        onChange={height.onChange}
        placeholder="0"
      ></Inputs.Number>
      <Inputs.Title>background</Inputs.Title>
      <Inputs.Color
        color={bgColor.value}
        onChange={bgColor.onChange}
      ></Inputs.Color>
      <Inputs.Option
        options={position}
        current={positionIdx.value}
        onChange={positionIdx.onChange}
      ></Inputs.Option>
    </SettingModalWrap>
  );
};

export default NavSetting;
