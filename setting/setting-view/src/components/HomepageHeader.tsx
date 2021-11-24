import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './HomepageHeader.module.css';
import { Link } from '@docusaurus/router';

type headerContentsType = {
    title: string,
    tagline: string,
};

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    let [headerContents, setHeaderContents] = useState<headerContentsType>({
        title: siteConfig.title,
        tagline: siteConfig.tagline,
    });
    // let [inputContents, setInputContents] = useState<headerContentsType>({
    //   title: "siteConfig.title",
    //   tagline: "siteConfig.tagline",
    // });
    let [buttonContext, setButtonContext] = useState<string>("어디론가 버튼");
    let [buttonShow, setButtonShow] = useState(true);
    let [editMode, setEditMode] = useState(true);
    const { title, tagline } = headerContents;


    const handleInputchange = (e) => {
        const { value, name } = e.target;

        // setInputContents(
        //   {
        //     ...inputContents,
        //     [name]: value,
        //   }
        // );
        setHeaderContents(
            {
                ...headerContents,
                [name]: value,
            }
        );
    };

    const handleButtonChange = (e: React.ChangeEvent<HTMLSpanElement>) => {
        const value = e.target.innerText;
        console.log(value);
        setButtonContext(value);
    }


    return (
        <header className={styles.heroBanner}>
            <div className={styles.headerContainer}>
                {
                    editMode
                        ? <div className={styles.headerInput}>
                            <input className={styles.headerTitle} name="title" value={title} type="text" placeholder="타이틀을 입력해주세요." onChange={handleInputchange} />
                            <input className={styles.headerDesc} name="tagline" value={tagline} type="text" placeholder="내용을 입력해주세요." onChange={handleInputchange} />
                            {
                                buttonShow
                                    ? <div className={styles.buttonDiv} contentEditable="true" placeholder="내용을 입력해주세요." onBlur={handleButtonChange}>
                                        {buttonContext}
                                        {/* `<input className={styles.buttoncontext} name="buttonContext" value={buttonContext} placeholder="내용을 입력해주세요." onChange={handleButtonChange}/> */}
                                    </div>
                                    : null
                            }
                        </div>
                        : <>
                            <h1 className="hero__title">{headerContents.title}</h1>
                            <p className="hero__subtitle">{headerContents.tagline}</p>
                            {
                                buttonShow
                                    ? <div className={styles.buttons}>
                                        <Link
                                            className="button button--secondary button--lg"
                                            to="/docs/intro">
                                            {buttonContext}
                                        </Link>
                                    </div>
                                    : null
                            }
                        </>
                }
                <div className={styles.buttonSection}>
                    {
                        editMode
                            ? <button className="button button--secondary button--lg" onClick={() => { setEditMode(!editMode) }}>Done</button>
                            : <button className="button button--secondary button--lg" onClick={() => { setEditMode(!editMode) }}>Edit</button>
                    }
                </div>
            </div>
        </header>
    );
}

export default HomepageHeader
