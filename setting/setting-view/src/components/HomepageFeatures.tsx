/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";
import { getFeatureAPI, patchFeature, postFeature } from "../lib/api/feature";
import SettingHoverBtn from "./SettingUI/SettingHoverBtn/SettingHoverBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { initialJson } from "../data/InitialJson";
import {
  addFeatureState,
  initializeState,
  submitState,
} from "../modules/jsonState";
import { FeatureBasicItemType, FeatureLinkItemType } from "../types/wholeJson";
import AddIcon from "../asset/AddIcon";
import DeleteFeatureIcon from "../asset/DeleteFeatureIcon";

function BasicFeature({
  index,
  title,
  image,
  description,
}: FeatureBasicItemType) {
  const feature = useSelector((state: RootState) => state.jsonReducer.feature);
  const dispatch = useDispatch();
  const [ishover, setIsHover] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const basic = feature.items.basic;

  const onBlur = (
    e: React.ChangeEvent<HTMLHeadElement | HTMLParagraphElement>
  ) => {
    const value = e.target.innerText;
    let key;
    if (e.target.tagName === "H3") {
      key = "title";
    } else {
      key = "description";
    }
    const newState = basic.map((item) => {
      if (item.index === index && key === "title") {
        return { ...item, title: value };
      } else if (item.index === index && key === "description") {
        return { ...item, description: value };
      }
      return item;
    });
    feature.items.basic = newState;
    dispatch(addFeatureState(feature));
    dispatch(submitState(feature, "feature"));
  };
  return (
    <div
      className={clsx("col col--5")}
      role="presentation"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div>
        {ishover ? (
          <div className={styles.absoluteBasicBtn}>
            <button
              className={styles.editBtn}
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              {editMode ? "done" : "edit"}
            </button>
          </div>
        ) : null}
        <div className="text--center">
          <img className={styles.img} alt={title} src={image} />
        </div>
        <div className="text--center padding-horiz--md">
          <h3
            className={styles.basicTitle}
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) => {
              editMode ? onBlur(e) : null;
            }}
          >
            {title}
          </h3>
          <p
            className={clsx("text--center", styles.basicText)}
            contentEditable="true"
            suppressContentEditableWarning
            onBlur={(e) => {
              editMode ? onBlur(e) : null;
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function LinkFeature({ index, title, image, to, href }: FeatureLinkItemType) {
  const feature = useSelector((state: RootState) => state.jsonReducer.feature);
  const dispatch = useDispatch();
  const [ishover, setIsHover] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const link = feature.items.link;

  const onBlurTitle = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const value = e.target.innerText;
    const newState = link.map((item) => {
      if (item.index === index) {
        return { ...item, title: value };
      }
      return item;
    });
    feature.items.link = newState;
    dispatch(addFeatureState(feature));
    dispatch(submitState(feature, "feature"));
  };

  return (
    <div
      className={clsx("linkFeature-item-container")}
      role="presentation"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div>
        {ishover ? (
          <div className={styles.absoluteBtn}>
            <button
              className={styles.editBtn}
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              {editMode ? "done" : "edit"}
            </button>
          </div>
        ) : null}
        <div className={clsx("linkFeature-item-image-div", styles.featureSvg)}>
          <img className={styles.featureSvg} alt={title} src={image} />
        </div>
        <div
          className={clsx(
            "text--center",
            styles.linkFeatureItemTitleDiv,
            styles.textCenter
          )}
        >
          <span
            contentEditable={editMode}
            suppressContentEditableWarning
            className={styles.linkFeatureItemTitle}
            onBlur={editMode ? onBlurTitle : null}
          >
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const beautyState = useSelector((state: RootState) => state.jsonReducer);
  const dispatch = useDispatch();
  const feature = beautyState.feature;

  const linkFeatureItem = beautyState.feature.items.link;
  const basicFeatureItem = beautyState.feature.items.basic;

  const newLinkId = useRef(4);
  const newBasicId = useRef(4);

  const onClickAddFeature = async (option: "link" | "basic") => {
    if (option === "link") {
      const newItem = {
        index: newLinkId.current,
        title: "PUT TITLE HERE",
        image: "/img/link2.png",
        to: "/docs/intro",
        href: "",
      };
      const newState = linkFeatureItem.concat(newItem);
      feature.items.link = newState;
      dispatch(addFeatureState(feature));
      dispatch(submitState(feature, "feature"));
      newLinkId.current++;
    } else {
      const newItem = {
        index: newBasicId.current,
        title: "TITLE HERE",
        image: "",
        description: "설명을 입력하세요.",
      };
      const newState = basicFeatureItem.concat(newItem);
      feature.items.basic = newState;
      dispatch(addFeatureState(feature));
      dispatch(submitState(feature, "feature"));
      newLinkId.current++;
    }
  };

  const onClickDelete = (option: "link" | "basic") => {
    if (option === "link") {
      linkFeatureItem.splice(-1, 1);
      const newState = linkFeatureItem;
      feature.items.link = newState;
      dispatch(submitState(feature, "feature"));
    } else {
      basicFeatureItem.splice(-1, 1);
      const newState = basicFeatureItem;
      feature.items.basic = newState;
      dispatch(submitState(feature, "feature"));
    }
  };

  useEffect(() => {
    const getState = async () => {
      // const data = await getFeatureAPI();
      const { link, basic } = beautyState.feature.items;
      // 추가될 link indexId 값 만들어주는 것
      if (link.length > 0) {
        newLinkId.current = link[link.length - 1].index + 1;
      } else {
        newLinkId.current = 1;
      }
      // 추가될 basic indexId 값 만들어주는 것
      if (basic.length > 0) {
        newBasicId.current = basic[basic.length - 1].index + 1;
      } else {
        newBasicId.current = 1;
      }
      // dispatch(initializeState(wholeJson));
    };
    getState();
  });

  const [linkHover, setLinkHover] = useState(false);
  const [basicHover, setBasicHover] = useState(false);

  return (
    <>
      <SettingHoverBtn section="linkFeature" useDel={true}>
        <section
          onMouseEnter={() => {
            setLinkHover(true);
          }}
          onMouseLeave={() => {
            setLinkHover(false);
          }}
          className={clsx(styles.features, "linkSection")}
          style={{
            backgroundImage: `url(${feature["linkBackground-image"]})`,
          }}
        >
          <div className="container">
            <div className="row">
              {linkFeatureItem.map((props, idx) => (
                <LinkFeature key={idx} {...props} />
              ))}
            </div>
            {linkHover ? (
              <div className={styles.absolute}>
                <button
                  className={styles.addBtn}
                  onClick={() => onClickAddFeature("link")}
                >
                  <AddIcon />
                </button>
                <button
                  className={styles.addBtn}
                  onClick={() => onClickDelete("link")}
                >
                  <DeleteFeatureIcon />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </SettingHoverBtn>
      <SettingHoverBtn section="basicFeature" useDel={true}>
        <section
          onMouseEnter={() => {
            setBasicHover(true);
          }}
          onMouseLeave={() => {
            setBasicHover(false);
          }}
          className={clsx(styles.features, "basicSection")}
          style={{
            backgroundImage: `url(${feature["basicBackground-image"]})`,
          }}
        >
          <div className="container">
            {basicFeatureItem.map((props, idx) => (
              <BasicFeature key={idx} {...props} />
            ))}
            {basicHover ? (
              <div className={styles.absolute}>
                <button
                  className={styles.addBtn}
                  onClick={() => onClickAddFeature("basic")}
                >
                  <AddIcon />
                </button>
                <button
                  className={styles.addBtn}
                  onClick={() => onClickDelete("basic")}
                >
                  <DeleteFeatureIcon />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </SettingHoverBtn>
    </>
  );
}
