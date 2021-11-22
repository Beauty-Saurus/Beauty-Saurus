import React, { useState } from "react";
import styles from "./Setting.module.css";

interface Props {
  children: any;
}

const SettingHoverBtn = ({ children }: Props) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div
      className={styles.section}
      onMouseEnter={() => {
        setIsShow(true);
      }}
      onMouseLeave={() => {
        setIsShow(false);
      }}
    >
      {isShow ? (
        <div className={styles.BtnWrap}>
          <button className={styles.Btn}>setting</button>
          <button className={styles.Btn}>del</button>
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default SettingHoverBtn;
