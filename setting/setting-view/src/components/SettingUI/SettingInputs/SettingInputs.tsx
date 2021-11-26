import AddCircleIcon from "@site/src/asset/AddCircleIcon";
import DocsIcon from "@site/src/asset/DocsIcon";
import SettingIcon from "@site/src/asset/SettingIcon";
import UploadIcon from "@site/src/asset/UploadIcon";
import React, { useRef, useState } from "react";
import styles from "./SettingInput.module.css";

interface OptionProps {
  options: Array<string>;
  current: number;
  onChange: any;
}

const Input = ({ type = "text", value, onChange, placeholder, ...props }) => {
  return (
    <div className={styles.form} {...props}>
      <input
        type={type}
        className={styles.inputText}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

const Number = ({ name, unit, value, onChange, placeholder, ...props }) => {
  return (
    <div className={styles.form} {...props}>
      <p className={styles.Text} style={{ color: "grey", width: "70%" }}>
        {name}
      </p>
      <input
        type="number"
        className={styles.inputNumber}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
      <p className={styles.Text} style={{ color: "grey" }}>
        {unit}
      </p>
    </div>
  );
};

const Img = ({ props }) => {
  const refFile = useRef();
  const [filename, setFilename] = useState("");

  const openFile = () => {
    refFile.current.click();
  };

  const onChange = () => {
    setFilename(refFile.current.files[0].name);
  };

  return (
    <div className={styles.form} {...props}>
      <input
        placeholder="첨부파일"
        value={filename}
        className={styles.inputText}
        readOnly
      ></input>
      <label onClick={openFile} style={{ display: "flex", cursor: "pointer" }}>
        <UploadIcon />
      </label>
      <input
        onChange={onChange}
        type="file"
        id="input-file"
        ref={refFile}
        style={{ display: "none" }}
      ></input>
    </div>
  );
};

const Color = ({ color, onChange, ...props }) => {
  const colorRef = useRef();
  return (
    <div
      className={styles.darkForm}
      style={{ cursor: "pointer" }}
      onClick={() => {
        colorRef.current.click();
      }}
      {...props}
    >
      <input
        className={styles.Text}
        style={{ color: "white" }}
        readOnly
        disabled
        placeholder="color"
        value={color}
      ></input>
      <input
        className={styles.color}
        onChange={onChange}
        ref={colorRef}
        type="color"
      ></input>
    </div>
  );
};

const Option = ({ options, current, onChange, ...props }: OptionProps) => {
  const option = options.map((item, idx) => (
    <option value={idx} key={item}>
      {item}
    </option>
  ));
  return (
    <div className={styles.form} {...props}>
      <select
        className={styles.select}
        value={current}
        name="hi"
        onChange={onChange}
      >
        {option}
      </select>
    </div>
  );
};

const Title = ({ children }) => {
  return <p className={styles.inputTitle}>{children}</p>;
};

const OpenSub = ({ name, idx, ...props }) => {
  return (
    <div
      className={styles.darkForm}
      style={{ backgroundColor: "#787878" }}
      {...props}
    >
      <DocsIcon />
      <p className={styles.Text} style={{ color: "white" }}>
        {name}
      </p>
      <button className={styles.ButtonText}>
        <SettingIcon />
      </button>
    </div>
  );
};

const AddSection = ({ onClick, ...props }) => {
  return (
    <button
      style={{ justifyContent: "center", cursor: "pointer" }}
      className={styles.buttonForm}
      {...props}
      onClick={onClick}
    >
      <AddCircleIcon />
    </button>
  );
};

const Inputs = {
  Input,
  Number,
  Img,
  Color,
  Option,
  Title,
  OpenSub,
  AddSection,
};

export default Inputs;
