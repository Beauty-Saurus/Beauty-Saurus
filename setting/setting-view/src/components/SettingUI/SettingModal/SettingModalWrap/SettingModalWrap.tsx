import React, { Children, useState } from "react";
import styles from "./SettingModalWrap.module.css";

//img, string, color, select, radio

const SettingModal = ({ onClose, children, ...props }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.titleWrap}>
        <p className={styles.title}>option</p>
        <button className={styles.closeBtn} onClick={onClose}>
          close
        </button>
      </div>
      {children}
    </div>
  );
};

export default SettingModal;
