/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";
import beautyConfig from "../../setting/setting-view/beauty.saurus.config.json";
import { useHistory } from "@docusaurus/router";

const { feature } = beautyConfig;
const { basic, link } = feature.items;

type basicFeatureItem = {
  index: number;
  title: string;
  image: string;
  description?: string;
};

type linkFeatureItem = {
  index: number;
  title: string;
  image: string;
  to?: string;
  href?: string;
};

const basicFeatureList: basicFeatureItem[] = basic;
const linkFeatureList: linkFeatureItem[] = link;

function BasicFeature({ index, title, image, description }: basicFeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function LinkFeature({ index, title, image, to, href }: linkFeatureItem) {
  const history = useHistory();

  const onClickLink = (to: string) => {
    history.push(to);
  };
  return (
    <div
      className={clsx("linkFeature-item-container")}
      role="presentation"
      onClick={() => onClickLink(to)}
    >
      <div className="linkFeature-item-image-div">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className={clsx("text--center", "linkFeature-item-title-div")}>
        <span className="linkFeature-item-title">{title}</span>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <section className={clsx(styles.features, "linkSection")}>
        <div className="container">
          <div className="row">
            {linkFeatureList.map((props) => (
              <LinkFeature key={props.index} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section className={clsx(styles.features, "basicSection")}>
        <div className="container">
          <div className="row">
            {basicFeatureList.map((props) => (
              <BasicFeature key={props.index} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
