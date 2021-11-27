import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./HeaderContents.module.css";
import { Link } from "@docusaurus/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { HeaderType } from "../types/wholeJson";
import clsx from "clsx";
import SettingHoverBtn from "./SettingUI/SettingHoverBtn/SettingHoverBtn";
import { submitState } from "../modules/jsonState";

type headerContentsType = {
  title: string;
  tagline: string;
  buttonText: string;
};

function HeaderContents(): JSX.Element {
  const beautyState = useSelector((state: RootState) => state.jsonReducer);
  const dispatch = useDispatch();

  const HeaderItems = beautyState.header;
  const HeaderTitleText = HeaderItems.title.text;
  const HeaderTaglineText = HeaderItems.tagline.text;
  const HeaderButtonText = HeaderItems.button.text;
  const HeaderButtonShow = HeaderItems.button.show;

  const [itemsText, setItemsText] = useState({
    title: HeaderTitleText,
    tagline: HeaderTaglineText,
    buttonText: HeaderButtonText,
  });
  const [buttonShow, setButtonShow] = useState(HeaderButtonShow);
  const [editMode, setEditMode] = useState(false);
  const [ishover, setIsHover] = useState(false);

  const onSave = () => {
    const headerInputs = {
      title: {
        text: itemsText.title,
      },
      tagline: {
        text: itemsText.tagline,
      },
      button: {
        text: itemsText.buttonText,
      },
    };
    editMode ? dispatch(submitState(headerInputs, "header")) : null;
    setEditMode(!editMode);
  };

  const handleHeaderChange = (
    e: React.ChangeEvent<HTMLSpanElement>,
    key: string
  ) => {
    const value = e.target.innerText;
    setItemsText({
      ...itemsText,
      [key]: value,
    });
  };

  return (
    <SettingHoverBtn useDel={true} section="header">
      <header
        className={styles.heroBanner}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <div>
          {ishover ? (
            <button className={styles.editBtn} onClick={onSave}>
              {editMode ? "done" : "edit"}
            </button>
          ) : null}
          {editMode ? (
            <div className={styles.headerInput}>
              <h1
                className={clsx("hero__title", styles.editText)}
                contentEditable="true"
                placeholder="타이틀을 입력해주세요."
                onBlur={(e) => handleHeaderChange(e, "title")}
              >
                {itemsText.title}
              </h1>
              <p
                className={clsx("hero__subtitle", styles.editText)}
                contentEditable="true"
                placeholder="내용을 입력해주세요."
                onBlur={(e) => handleHeaderChange(e, "tagline")}
              >
                {itemsText.tagline}
              </p>
              {buttonShow ? (
                <div
                  className={styles.buttonDiv}
                  contentEditable="true"
                  placeholder="내용을 입력해주세요."
                  onBlur={(e) => handleHeaderChange(e, "buttonText")}
                >
                  {itemsText.buttonText}
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <h1 className="hero__title">{itemsText.title}</h1>
              <p className="hero__subtitle">{itemsText.tagline}</p>
              {buttonShow ? (
                <div className={styles.buttons}>
                  <Link
                    className="button button--secondary button--lg"
                    to="/docs/intro"
                  >
                    {itemsText.buttonText}
                  </Link>
                </div>
              ) : null}
            </>
          )}
        </div>
      </header>
    </SettingHoverBtn>
  );
}

export default HeaderContents;
