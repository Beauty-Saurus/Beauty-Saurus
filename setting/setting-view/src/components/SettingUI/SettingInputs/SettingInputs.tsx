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
      <label className={styles.inputFileLabel} onClick={openFile}>
        upload
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
      className={styles.colorForm}
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

const Inputs = { Input, Number, Img, Color, Option, Title };

export default Inputs;
