import { WholeJSONType } from "../types/wholeJson";

export const initialJson: WholeJSONType = {
  meta: {
    title: "Beauty-Saurus",
    tagline: "Beauty-Saurus is beautiful",
    url: "http://naver.com",
    favicon: "img/favicon.ico",
    organizationName: "Beauty-Saurus",
    projectName: "Beauty-Saurus",
  },
  navbar: {
    title: "Beauty-Saurus Fuck test",
    "title-margin": "",
    height: "",
    "background-color": "white",
    position: "",
    "logo-image": "img/logo.svg",
    "logo-alt": "Beauty-Saurus logo image",
    itemFontColor: "#000000",
    items: [
      {
        name: "Doc1",
        type: "doc",
        position: "left",
      },
      {
        name: "Doc2",
        type: "doc",
        position: "left",
      },
    ],
  },
  header: {
    "padding-top": "64px",
    "padding-bottom": "64px",
    "background-color": "#A487AA",
    "background-image": "",
    "font-family": "Roboto",
    title: {
      text: "Beautysaurus",
      "font-size": "48px",
      "font-color": "#1C1E21",
    },
    tagline: {
      text: "Beautysaurus are beautyful!",
      "font-size": "24px",
      "font-color": "#1C1E21",
    },
    button: {
      show: "true",
      text: "move page!",
      link: "http://naver.com",
      "font-size": "19px",
      "font-color": "#1C1E21",
      "background-color": "#FFFFFF",
    },
  },
  feature: {
    basicHeight: "",
    "basicBackground-color": "skyblue",
    "basicBackground-image": "/img/rose.png",
    linkHeight: "",
    "linkBackground-color": "gray",
    "linkBackground-image": "/img/cloud.jpeg",
    itemFontColor: "#ffffff",
    items: {
      basic: [
        {
          index: 1,
          title: "Easy to Use",
          image: "/img/undraw_docusaurus_mountain.svg",
          description:
            "Docusaurus was designed from the ground up to be easily installed and used to get your website up and running quickly.",
        },
        {
          index: 2,
          title: "Focus on What Matters",
          image: "/img/undraw_docusaurus_tree.svg",
          description:
            "Docusaurus was designed from the ground up to be easily installed and used to get your website up and running quickly.",
        },
        {
          index: 3,
          title: "Powered by React",
          image: "/img/undraw_docusaurus_react.svg",
          description:
            "Docusaurus was designed from the ground up to be easily installed and used to get your website up and running quickly.",
        },
      ],
      link: [
        {
          index: 1,
          title: "Easy to Use",
          image: "/img/rose.png",
          to: "/docs/intro",
          href: "",
        },
        {
          index: 2,
          title: "Focus on What Matters",
          image: "/img/light.jpeg",
          to: "/docs/tutorial-basics/create-a-page",
          href: "",
        },
        {
          index: 3,
          title: "Powered by React",
          image: "/img/wall.jpeg",
          to: "/docs/tutorial-extras/manage-docs-versions",
          href: "",
        },
      ],
    },
  },
  footer: {
    "background-color": "",
    "background-image": "",
    sections: [
      {
        title: "",
        "font-size": "",
        "font-color": "",
        items: [
          {
            name: "",
            "font-size": "",
            "font-color": "",
            to: "",
            href: "",
          },
          {
            name: "",
            "font-size": "",
            "font-color": "",
            to: "",
            href: "",
          },
        ],
      },
    ],
  },
};
