import React, { useState } from "react";
import HeaderSetting from "../SettingModalPage/HeaderSetting/HeaderSetting";
import NavSetting from "../SettingModalPage/NavSetting/NavSetting";
import SettingModal from "../SettingModalPage/SettingModal";
import styles from "./SettingHover.module.css";

interface Props {
  section?: "nav" | "header";
  useDel?: boolean;
  children: any;
}

const SettingHoverBtn = ({ section, useDel, children, ...props }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [isDel, setIsDel] = useState(true);
  //const [isSet, setIsSet] = useState(false);
  const [isSet, setIsSet] = useState(section === "nav" ? true : false);

  const onDelClick = () => {
    alert("섹션을 삭제하시겠습니까?");
    setIsDel(false);
  };
  const onSetClick = () => {
    setIsSet(!isSet);
    setIsShow(false);
  };

  const onClose = () => {
    setIsSet(false);
    setIsShow(false);
  };
  let Setting;
  if (section === "nav") {
    Setting = <NavSetting {...props} onClose={onClose} />;
  } else if (section === "header") {
    Setting = <HeaderSetting {...props} onClose={onClose} />;
  } else {
    Setting = <SettingModal {...props} onClose={onClose} />;
  }
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
          <button className={styles.Btn} onClick={onSetClick}>
            setting
          </button>
          {useDel ? (
            <button className={styles.Btn} onClick={onDelClick}>
              del
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      {isDel ? children : ""}
      {isSet ? Setting : ""}
    </div>
  );
};

export default SettingHoverBtn;
