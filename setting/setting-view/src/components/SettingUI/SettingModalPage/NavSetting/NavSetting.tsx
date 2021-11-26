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
  const [item, setItem] = useState([
    {
      id: 0,
      name: "docA",
      type: "doc",
      color: "",
      position: "left",
    },
    {
      id: 1,
      name: "docB",
      type: "doc",
      color: "",
      position: "left",
    },
  ]);

  const onChange = (idx, key, e) => {
    const newItem = [...item];
    newItem[idx][key] = e.target.value;
    setItem(newItem);
  };

  const initialItem = {
    name: "docA",
    type: "doc",
    color: "",
    position: "left",
  };

  const position = ["sticky", "transation"];
  //initial value 받아오기

  const itemArr = item?.map((item, idx) => {
    return <Inputs.OpenSub key={idx} idx={idx} {...item}></Inputs.OpenSub>;
  });

  return (
    <SettingModalWrap onClose={onClose} {...props}>
      <Inputs.Title>docs</Inputs.Title>
      {itemArr}
      <Inputs.AddSection
        onClick={() => {
          const newItem = [...item];
          newItem.push(initialItem);
          setItem(newItem);
        }}
      />
      <Inputs.Title>title</Inputs.Title>
      <Inputs.Input
        value={title.value}
        onChange={title.onChange}
        placeholder="title name"
      />

      <Inputs.Title>logo</Inputs.Title>
      <Inputs.Img />

      <Inputs.Title>title margin</Inputs.Title>
      <Inputs.Number
        name="margin-left"
        unit="px"
        value={titleMarginLeft.value}
        onChange={titleMarginLeft.onChange}
        placeholder="0"
      />
      <Inputs.Number
        name="margin-right"
        unit="px"
        value={titleMarginRight.value}
        onChange={titleMarginRight.onChange}
        placeholder="0"
      />
      <Inputs.Title>height</Inputs.Title>
      <Inputs.Number
        name="height"
        unit="px"
        value={height.value}
        onChange={height.onChange}
        placeholder="0"
      ></Inputs.Number>
      <Inputs.Title>background</Inputs.Title>
      <Inputs.Color color={bgColor.value} onChange={bgColor.onChange} />
      <Inputs.Option
        options={position}
        current={positionIdx.value}
        onChange={positionIdx.onChange}
      />
    </SettingModalWrap>
  );
};

export default NavSetting;
