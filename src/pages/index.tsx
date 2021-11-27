import React, { useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import configJson from "../../setting/setting-view/beauty.saurus.config.json";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.headerTitle)}>
          {configJson.header.title.text}
        </h1>
        <p className={clsx("hero__subtitle", styles.headerTagline)}>
          {configJson.header.tagline.text}
        </p>
        {configJson.header.button.show ? (
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--secondary button--lg",
                styles.linkButton
              )}
              href={configJson.header.button.link}
            >
              {configJson.header.button.text}
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Beauty">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
