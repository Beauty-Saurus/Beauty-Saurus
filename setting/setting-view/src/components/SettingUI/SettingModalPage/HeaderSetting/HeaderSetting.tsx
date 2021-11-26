import SettingModalWrap from "../SettingModalWrap/SettingModalWrap";
import React, { useState } from "react";
import Inputs from "../../SettingInputs/SettingInputs";
import useInput from "@site/src/hooks/useInput";

const HeaderSetting = ({ onClose, ...props }) => {
  const color = useInput("");

  return (
    <SettingModalWrap onClose={onClose} {...props}>
      <Inputs.Title>color</Inputs.Title>
      <Inputs.Color color={color.value} onChange={color.onChange} />
    </SettingModalWrap>
  );
};

export default HeaderSetting;
