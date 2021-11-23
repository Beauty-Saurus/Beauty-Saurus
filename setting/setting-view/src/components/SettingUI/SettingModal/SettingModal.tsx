import React from "react";
import styles from "./SettingModal.module.css";

//img, string, color, select, radio
const SettingInput = ({ title }) => {
  return (
    <div className={styles.settingInput}>
      <p className={styles.inputTitle}>{title}</p>
      <div className={styles.form}>
        <input className={styles.input}></input>
        <button className={styles.submit}>ok</button>
      </div>
    </div>
  );
};

const SettingModal = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.titleWrap}>
        <p className={styles.title}>option</p>
        <button className={styles.closeBtn} onClick={onClose}>
          close
        </button>
      </div>
      <SettingInput title="title" />
      <SettingInput title="color" />
    </div>
  );
};

export default SettingModal;
