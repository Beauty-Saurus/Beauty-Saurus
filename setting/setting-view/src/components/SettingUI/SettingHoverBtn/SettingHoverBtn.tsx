import React, { useState } from "react";
import SettingModal from "../SettingModal/SettingModal";
import styles from "./SettingHover.module.css";

interface Props {
  useDel?: boolean;
  children: any;
}

const SettingHoverBtn = ({ useDel, children }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const [isDel, setIsDel] = useState(true);
  //const [isSet, setIsSet] = useState(false);
  const [isSet, setIsSet] = useState(true);

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
      {isSet ? <SettingModal onClose={onClose} /> : ""}
    </div>
  );
};

export default SettingHoverBtn;
