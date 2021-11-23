import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

type headerContentsType = {
  title: string,
  contents: string,
  button: string,
};

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  let [headerContents, setHeaderContents] = useState<headerContentsType>({
    title: '',
    contents: '',
    button: '',
  });
  let [editMode, setEditMode] = useState(true);

  return (
    <header className={styles.heroBanner}>
      <div className={styles.headerContainer}>
        {
          editMode ? 
          <div className={styles.headerInput}>
            <input className={styles.headerTitle} type="text" />
            <input className={styles.headerDesc} type="text" />
          </div> :
          <>
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                Docusaurus Tutorial - 5min ⏱️
              </Link>
            </div>
          </>
        }
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
