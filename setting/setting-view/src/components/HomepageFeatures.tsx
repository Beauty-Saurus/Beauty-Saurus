/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";
import {
  getFeatureAPI,
  patchFeature,
  postFeature,
  resetSettingsAPI,
} from "../lib/api/feature";
import SettingHoverBtn from "./SettingUI/SettingHoverBtn/SettingHoverBtn";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { initialJson } from "../data/InitialJson";
import {
  addFeatureState,
  initializeState,
  newSubmitState,
  submitState,
} from "../modules/jsonState";
import wholeJson from "../../beauty.saurus.config.json";
import { FeatureBasicItemType, FeatureLinkItemType } from "../types/wholeJson";

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
        <h3 contentEditable="true">{title}</h3>
        <p contentEditable="true">{description}</p>
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
      <div className="linkFeature-item-image-div">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className={clsx("text--center", "linkFeature-item-title-div")}>
        <span
          onBlur={onBlurTitle}
          contentEditable="true"
          className="linkFeature-item-title"
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

  const onClickAddFeature = async (option: string) => {
    if (option === "link") {
      const newItem = {
        index: newLinkId.current,
        title: "제목을 입력하세요.",
        image: "/img/rose.png",
        to: "/docs/intro",
        href: "",
      };
      const newState = linkFeatureItem.concat(newItem);
      feature.items.link = newState;
      dispatch(addFeatureState(feature));
      // dispatch(submitState(feature, "feature"));
      // postFeature(newState, "link");
      // setLinkFeatureState(newState);
      newLinkId.current++;
    } else {
      const newItem = {
        index: newBasicId.current,
        title: "제목을 입력하세요.",
        image: "/img/undraw_docusaurus_mountain.svg",
        description: "설명을 입력하세요.",
      };
      const newState = basicFeatureItem.concat(newItem);
      postFeature(newState, "basic");
      // setBasicFeatureState(newState);
      newLinkId.current++;
    }
  };

  // maybe move reset button to other component
  const onClickReset = () => {
    dispatch(initializeState(initialJson));
  };

  const onClickSave = () => {
    const test = {
      title: "nonono",
      tagline: "Beauty-Saurus is beautiful",
      url: "http://naver.com",
      favicon: "img/favicon.ico",
      organizationName: "Beauty-Saurus",
      projectName: "Beauty-Saurus",
    };
    dispatch(newSubmitState(test));
    // dispatch(initializeState(initialJson));
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

  return (
    <>
      <SettingHoverBtn useDel={true}>
        <section className={clsx(styles.features, "linkSection")}>
          <div className="container">
            <button onClick={() => onClickAddFeature("link")}>
              feature 추가
            </button>
            <button onClick={onClickReset}>전체 Reset</button>
            <button onClick={onClickSave}>Save</button>
            <div className="row">
              {linkFeatureItem.map((props) => (
                <LinkFeature key={props.index} {...props} />
              ))}
            </div>
          </div>
        </section>
      </SettingHoverBtn>
      <SettingHoverBtn useDel={true}>
        <section className={clsx(styles.features, "basicSection")}>
          <div className="container">
            <button onClick={() => onClickAddFeature("basic")}>
              feature 추가
            </button>
            <div className="row">
              {basicFeatureItem.map((props) => (
                <BasicFeature key={props.index} {...props} />
              ))}
            </div>
          </div>
        </section>
      </SettingHoverBtn>
    </>
  );
}
