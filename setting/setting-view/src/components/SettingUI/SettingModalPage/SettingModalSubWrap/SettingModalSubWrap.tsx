import React from "react";
import styles from "./SettingModalSubWrap.module.css";

//img, string, color, select, radio

const SettingModalSubWrap = ({ title, onClose, children, ...props }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.titleWrap}>
        <p className={styles.title}>{title}</p>
        <button className={styles.closeBtn} onClick={onClose}>
          close
        </button>
      </div>
      {children}
    </div>
  );
};

export default SettingModalSubWrap;
