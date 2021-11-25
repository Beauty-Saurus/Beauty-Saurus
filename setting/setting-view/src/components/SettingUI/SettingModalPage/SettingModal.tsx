import React, { useState } from "react";
import styles from "./SettingModal.module.css";
import * as Input from "../SettingInputs/SettingInputs";

//img, string, color, select, radio

const SettingModal = ({ onClose }) => {
  const [options, setOptions] = useState(["0", "1", "2"]);
  const [current, setCurrent] = useState(2);

  const [color, setColor] = useState("");

  const [text, setText] = useState("");
  const [number, setNumber] = useState("");

  return (
    <div className={styles.modal}>
      <div className={styles.titleWrap}>
        <p className={styles.title}>option</p>
        <button className={styles.closeBtn} onClick={onClose}>
          close
        </button>
      </div>
      <Input.Title>title</Input.Title>
      <Input.Input
        value={text}
        setValue={setText}
        placeholder="title"
      ></Input.Input>
      <Input.Title>logo</Input.Title>
      <Input.Img></Input.Img>
      <Input.Title>main color</Input.Title>
      <Input.Color color={color} setColor={setColor}></Input.Color>
      <Input.Option
        options={options}
        current={current}
        setCurrent={setCurrent}
      />
      <Input.Number
        name="margin"
        unit="px"
        value={number}
        setValue={setNumber}
        placeholder="0"
      ></Input.Number>
    </div>
  );
};

export default SettingModal;
