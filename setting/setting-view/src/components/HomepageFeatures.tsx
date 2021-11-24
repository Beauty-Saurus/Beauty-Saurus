/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";
import { getFeature, patchFeature, postFeature } from "../lib/api/feature";
import SettingHoverBtn from "./SettingUI/SettingHoverBtn/SettingHoverBtn";

export type basicFeatureItem = {
  index: number;
  title: string;
  image: string;
  description?: string;
};


export type linkFeatureItem = {
  index: number;
  title: string;
  image: string;
  to?: string;
  href?: string;
};

function BasicFeature({ index, title, image, description }: basicFeatureItem) {
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
}

function LinkFeature({ index, title, image, to, href }: linkFeatureItem) {
  const [titleState, setTitleState] = useState(title);

  const onBlurTitle = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const value = e.target.innerText;
    setTitleState(value);
    const sendBody = {
      option: "link",
      part: "title",
      index
    };
    patchFeature(index, value);
  };

  return (
    <div
      className={clsx("linkFeature-item-container")}
      role="presentation"
    >
      <div className="linkFeature-item-image-div">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className={clsx("text--center", "linkFeature-item-title-div")}>
        <span onBlur={onBlurTitle} contentEditable="true" className="linkFeature-item-title">{titleState}</span>
      </div>
    </div>
  );
}


export default function HomepageFeatures(): JSX.Element {
  const [linkFeatureState, setLinkFeatureState] = useState<linkFeatureItem[]>([]);
  const [basicFeatureState, setBasicFeatureState] = useState<basicFeatureItem[]>([]);

  const newLinkId = useRef(4);
  const newBasicId = useRef(4);

  const onClickAddFeature = async (option: string) => {
    if (option === "link") {
      const newItem = {
        "index": newLinkId.current,
        "title": "제목을 입력하세요.",
        "image": "/img/rose.png",
        "to": "/docs/intro",
        "href": ""
      };
      const newState = linkFeatureState.concat(newItem);
      postFeature(newState, "link");
      setLinkFeatureState(newState);
      newLinkId.current++;
    } else {
      const newItem = {
        "index": newBasicId.current,
        "title": "제목을 입력하세요.",
        "image": "/img/undraw_docusaurus_mountain.svg",
        "description": "설명을 입력하세요."
      };
      const newState = basicFeatureState.concat(newItem);
      postFeature(newState, "basic");
      setBasicFeatureState(newState);
      newLinkId.current++;
    }
  };

  useEffect(() => {
    const getState = async () => {
      const data = await getFeature();
      const { link, basic } = data.data.feature.items;
      // 추가될 link indexId 값 만들어주는 것
      if (link.length > 0) {
        newLinkId.current = link[link.length - 1].index + 1;
      }
      else {
        newLinkId.current = 1;
      }
      // 추가될 basic indexId 값 만들어주는 것
      if (basic.length > 0) {
        newBasicId.current = basic[basic.length - 1].index + 1;
      }
      else {
        newBasicId.current = 1;
      }
      setLinkFeatureState(link);
      setBasicFeatureState(basic);
    }
    getState();
  }, []);

  return (
    <>
<SettingHoverBtn useDel={true}>
      <section className={clsx(styles.features, "linkSection")}>
        <div className="container">
          <button onClick={() => onClickAddFeature("link")}>feature 추가</button>
          <div className="row">
            {linkFeatureState.map((props) => (
              <LinkFeature key={props.index} {...props} />

            ))}
          </div>
        </div>
      </section>
            </SettingHoverBtn>
<SettingHoverBtn useDel={true}>

      <section className={clsx(styles.features, "basicSection")}>
        <div className="container">
          <button onClick={() => onClickAddFeature("basic")}>feature 추가</button>
          <div className="row">
            {basicFeatureState.map((props) => (
              <BasicFeature key={props.index} {...props} />
            ))}
          </div>
        </div>
      </section>
              </SettingHoverBtn>
    </>

  );
}
