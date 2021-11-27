import React from "react";
import styles from "./SettingModalWrap.module.css";

//img, string, color, select, radio

const SettingModalWrap = ({ onClose, onSave, children, ...props }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.titleWrap}>
        <p className={styles.title}>option</p>
        <div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            style={{ color: "grey" }}
          >
            cancel
          </button>
          <button className={styles.closeBtn} onClick={onSave}>
            save
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SettingModalWrap;
