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
import AddCircleIcon from "../asset/AddCircleIcon";
import AddIcon from "../asset/AddIcon";
import DeleteFeatureIcon from "../asset/DeleteFeatureIcon";

function BasicFeature({
  index,
  title,
  image,
  description,
}: FeatureBasicItemType) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3 contentEditable="true" suppressContentEditableWarning>
          {title}
        </h3>
        <p contentEditable="true" suppressContentEditableWarning>
          {description}
        </p>
      </div>
    </div>
  );
}

type SendBodyOptionType = {
  option: "link" | "basic";
  part: "title" | "image" | "description" | "image";
};

function LinkFeature({ index, title, image, to, href }: FeatureLinkItemType) {
  const [titleState, setTitleState] = useState(title);

  const onBlurTitle = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const value = e.target.innerText;
    setTitleState(value);
    const sendBody = {
      option: "link",
      part: "title",
      index,
    };
    patchFeature(index, value);
  };

  return (
    <div className={clsx("linkFeature-item-container")} role="presentation">
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
          onBlur={onBlurTitle}
          contentEditable="true"
          suppressContentEditableWarning
          className={styles.linkFeatureItemTitle}
        >
          {titleState}
        </span>
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
        image: "/img/link2.png",
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
      const data = await getFeatureAPI();
      const { link, basic } = data.data.data.items;
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
  }, []);

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
        >
          <div className="container">
            <div className="row">
              {linkFeatureItem.map((props) => (
                <LinkFeature key={props.index} {...props} />
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
        <section className={clsx(styles.features, "basicSection")}>
          <div
            className="container"
            onMouseEnter={() => {
              setBasicHover(true);
            }}
            onMouseLeave={() => {
              setBasicHover(false);
            }}
          >
            <div className="row">
              {basicFeatureItem.map((props) => (
                <BasicFeature key={props.index} {...props} />
              ))}
            </div>
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
