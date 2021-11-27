import SettingModalWrap from "../SettingModalWrap/SettingModalWrap";
import React, { useState } from "react";
import Inputs from "../../SettingInputs/SettingInputs";
import useInput from "@site/src/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { submitState } from "@site/src/modules/jsonState";
import { WholeJSONType } from "@site/src/types/wholeJson";
import { RootState } from "@site/src/modules";

const NavSetting = ({ onClose, ...props }) => {
  const ConfigJson = useSelector(
    (state: RootState) => state.jsonReducer.navbar
  );
  const marginArr = ConfigJson["title-margin"].split(" ");
  const title = useInput(ConfigJson.title);
  const titleMarginLeft = useInput(marginArr[3].replace("px", ""));
  const titleMarginRight = useInput(marginArr[1].replace("px", ""));
  const height = useInput(ConfigJson.height.replace("px", ""));
  const bgColor = useInput(ConfigJson["background-color"]);
  const positionIdx = useInput(0);
  const [item, setItem] = useState(ConfigJson.items);
  //const logoImg = useInput("");

  const position = ["sticky", "transation"];

  const dispatch = useDispatch();

  const onItemChange = (idx, key, e) => {
    const newItem = [...item];
    newItem[idx][key] = e.target.value;
    setItem(newItem);
  };

  const onDelClick = (i) => {
    const newItem = item.filter((item, idx) => idx !== i);
    setItem(newItem);
  };

  const onSave = () => {
    onClose();
    const navbar = {
      title: title.value,
      "title-margin": `0px ${titleMarginRight.value}px 0px ${titleMarginLeft.value}px`,
      height: height.value + "px",
      "background-color": bgColor.value,
      position: position[positionIdx.value],
      "logo-image": "img/logo.svg",
      "logo-alt": "Beauty-Saurus logo image",
      item: item,
    };
    dispatch(submitState(navbar, "navbar"));
  };

  const initialItem = {
    name: "doc",
    type: "doc",
    color: "",
    position: "right",
  };

  const itemArr = item?.map((item, idx) => {
    return (
      <Inputs.OpenSub
        title={"docs"}
        key={idx}
        idx={idx}
        onDelClick={() => onDelClick(idx)}
        {...item}
      >
        <Inputs.Title>name</Inputs.Title>
        <Inputs.Input
          value={item.name}
          onChange={(e) => {
            onItemChange(idx, "name", e);
          }}
          placeholder="name"
        />
        <Inputs.Title>position</Inputs.Title>
        <Inputs.Option
          options={["left", "center", "right"]}
          current={item.position}
          onChange={(e) => {
            // console.log(e.target.value);
            onItemChange(idx, "position", e);
          }}
        />
      </Inputs.OpenSub>
    );
  });

  return (
    <SettingModalWrap onClose={onClose} onSave={onSave} {...props}>
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

      <Inputs.Title>docs</Inputs.Title>
      {itemArr}
      <Inputs.AddSection
        onClick={() => {
          const newItem = [...item];
          newItem.push(initialItem);
          setItem(newItem);
        }}
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
