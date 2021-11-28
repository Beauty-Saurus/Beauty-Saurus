import SettingModalWrap from "../SettingModalWrap/SettingModalWrap";
import React, { useState } from "react";
import Inputs from "../../SettingInputs/SettingInputs";
import useInput from "@site/src/hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { submitState } from "@site/src/modules/jsonState";
import { RootState } from "@site/src/modules";
import { FeatureType } from "@site/src/types/wholeJson";
import MenuIcon from "@site/src/asset/MenuItem";
import client from "@site/src/lib/api/client";

const BasicFeatureSetting = ({ onClose, ...props }) => {
  const ConfigJson = useSelector(
    (state: RootState) => state.jsonReducer.feature
  );
  const dispatch = useDispatch();
  const color = useInput(ConfigJson["basicBackground-color"]);
  const [bgImg, setBgImg] = useState("");
  const [items, setItems] = useState(ConfigJson.items.basic);
  const [itemImgs, setItemImgs] = useState(
    new Array(ConfigJson.items.basic.length)
  );

  const initialItem = {
    index: items.length + 1,
    title: "title" + items.length,
    image: "",
    to: "/docs/tutorial-extras/manage-docs-versions",
    href: "",
  };

  const onSave = () => {
    onClose();
    const feature: FeatureType = {
      ...ConfigJson,
      "basicBackground-color": color.value,
      "basicBackground-image":
        bgImg !== ""
          ? "/img/" + bgImg.name
          : ConfigJson["basicBackground-image"],
    };
    feature.items.basic = items.map((item, idx) => {
      item.image = itemImgs[idx] ? "/img/" + itemImgs[idx].name : item.image;
      return item;
    });
    dispatch(submitState(feature, "feature"));

    //img upload
    const imgs = [...itemImgs];
    imgs.push(bgImg);
    console.log("send", imgs);

    const img = new FormData();
    imgs.map((item) => {
      console.log(item);
      if (item) {
        img.append("imgFile", item);
        return img;
      }
    });
    console.log("imgs", img);
    client.post("/api/file/images", img);
  };

  const onItemChange = (idx, key, e) => {
    const newItem = [...items];
    newItem[idx][key] = e.target.value;
    setItems(newItem);
  };

  const onDelClick = (i) => {
    const newItem = items.filter((item, idx) => idx !== i);
    setItems(newItem);
  };

  const item = items.map((item, idx) => {
    return (
      <Inputs.OpenSub
        key={item.index}
        title="items"
        name={item.title}
        icon={<MenuIcon />}
        onDelClick={() => onDelClick(idx)}
      >
        <Inputs.Title>item name</Inputs.Title>
        <Inputs.Input
          value={item.title}
          onChange={(e) => {
            onItemChange(idx, "title", e);
          }}
          placeholder="title"
        />
        <Inputs.Title>item image</Inputs.Title>
        <Inputs.Img
          file={itemImgs[idx]}
          onChange={(e) => {
            const newImg = [...itemImgs];
            newImg[idx] = e.target.files[0];
            setItemImgs(newImg);
          }}
        />
        <Inputs.Title>description</Inputs.Title>
        <Inputs.Input
          value={item.description}
          onChange={(e) => {
            onItemChange(idx, "description", e);
          }}
          placeholder="description"
        />
      </Inputs.OpenSub>
    );
  });
  return (
    <SettingModalWrap onClose={onClose} onSave={onSave} {...props}>
      <Inputs.Title>background</Inputs.Title>
      <Inputs.Color color={color.value} onChange={color.onChange} />
      <Inputs.Img
        file={bgImg}
        onChange={(e) => {
          setBgImg(e.target.files[0]);
        }}
      />

      <Inputs.Title>item</Inputs.Title>
      {item}
      <Inputs.AddSection
        onClick={() => {
          const newItem = [...items];
          newItem.push(initialItem);
          setItems(newItem);
        }}
      />
    </SettingModalWrap>
  );
};

export default BasicFeatureSetting;
