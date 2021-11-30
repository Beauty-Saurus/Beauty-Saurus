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
import { Redirect, useHistory } from "@docusaurus/router";

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

function BasicFeature({ title, image, description }: basicFeatureItem) {
  return (
    <div className={clsx("col col--5")}>
      <div className="text--center">
        <img className={styles.img} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md basicFont">
        <h3 className={styles.basicTitle}>{title}</h3>
        <p className={clsx("text--center", styles.basicText, "basicFontDesc")}>
          {description}
        </p>
      </div>
    </div>
  );
}

function LinkFeature({
  index,
  title,
  image,
  to = null,
  href,
}: linkFeatureItem) {
  const history = useHistory();

  const onClickLink = (to: string) => {
    history.push(to);
    // return <Redirect to={to} />;
  };
  return (
    <div
      className={clsx("linkFeature-item-container")}
      role="presentation"
      onClick={
        to
          ? () => onClickLink(to)
          : href
          ? () => (location.href = "https://github.com/Chloekkk/Beauty-Saurus")
          : () => onClickLink("/")
      }
    >
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
        <span className={styles.linkFeatureItemTitle}>{title}</span>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <section
        className={clsx(styles.features, "linkSection")}
        style={{
          backgroundImage: `url(${feature["linkBackground-image"]})`,
          backgroundColor: feature["linkBackground-color"],
        }}
      >
        <div className="container">
          <div className="row">
            {linkFeatureList.map((props) => (
              <LinkFeature key={props.index} {...props} />
            ))}
          </div>
        </div>
      </section>
      <section
        className={clsx(styles.features, "basicSection")}
        style={{
          backgroundImage: `url(${feature["basicBackground-image"]})`,
          backgroundColor: feature["basicBackground-color"],
        }}
      >
        <div className="container">
          {basicFeatureList.map((props) => (
            <BasicFeature key={props.index} {...props} />
          ))}
        </div>
      </section>
    </>
  );
}
