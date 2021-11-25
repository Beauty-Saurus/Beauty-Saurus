import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import SettingHoverBtn from "../components/SettingUI/SettingHoverBtn/SettingHoverBtn";
import { createStore } from "redux";
import rootReducer from "../modules";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <SettingHoverBtn useDel={true}>
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              Docusaurus Tutorial - 5min ⏱️
            </Link>
          </div>
        </div>
      </header>
    </SettingHoverBtn>
  );
}

// rootReducer 아까 만든 리듀서를 가지고 전역 store를 만드는거, composeWithDevTools는 개발자도구에 redux탭으로 관리하게해주는거
const store = createStore(rootReducer, composeWithDevTools());

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Provider store={store}>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Description will go into a meta tag in <head />"
        >
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
    </Provider>
  );
}
