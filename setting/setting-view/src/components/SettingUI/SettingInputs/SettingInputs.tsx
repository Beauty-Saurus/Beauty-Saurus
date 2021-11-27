import AddCircleIcon from "@site/src/asset/AddCircleIcon";
import DeleteIcon from "@site/src/asset/DeleteIcon";
import DocsIcon from "@site/src/asset/DocsIcon";
import SettingIcon from "@site/src/asset/SettingIcon";
import UploadIcon from "@site/src/asset/UploadIcon";
import React, { useRef, useState } from "react";
import SettingModalSubWrap from "../SettingModalPage/SettingModalSubWrap/SettingModalSubWrap";
import styles from "./SettingInput.module.css";

interface OptionProps {
  options: Array<string>;
  current: number | string;
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

const Img = ({ file, onChange, ...props }) => {
  const refFile = useRef();

  const openFile = () => {
    refFile.current.click();
  };
  return (
    <div className={styles.darkForm} {...props}>
      <input
        placeholder="첨부파일 (png, svg, jpge)"
        value={file ? file.name : ""}
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
    <button
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
        value={color}
      ></input>
    </button>
  );
};

const Option = ({ options, current, onChange, ...props }: OptionProps) => {
  let option;
  if (typeof current === "string") {
    option = options.map((item) => (
      <option value={item} key={item}>
        {item}
      </option>
    ));
  } else {
    option = options.map((item, idx) => (
      <option value={idx} key={item}>
        {item}
      </option>
    ));
  }
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

const OpenSub = ({ children, icon, onDelClick, name, title, ...props }) => {
  const [isSet, setIsSet] = useState(false);
  const [hoverDel, setHoverDel] = useState(false);
  return (
    <div
      className={styles.darkForm}
      style={{ backgroundColor: "#787878" }}
      {...props}
    >
      <button
        className={styles.ButtonText}
        onMouseEnter={() => {
          setHoverDel(true);
        }}
        onMouseLeave={() => {
          setHoverDel(false);
        }}
        onClick={onDelClick}
      >
        {hoverDel ? <DeleteIcon /> : icon}
      </button>
      <p className={styles.Text} style={{ color: "white" }}>
        {name}
      </p>
      <button
        className={styles.ButtonText}
        onClick={() => {
          setIsSet(!isSet);
        }}
      >
        <SettingIcon />
      </button>
      {isSet ? (
        <SettingModalSubWrap
          title={title}
          onClose={() => {
            setIsSet(false);
          }}
        >
          {children}
        </SettingModalSubWrap>
      ) : (
        ""
      )}
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
