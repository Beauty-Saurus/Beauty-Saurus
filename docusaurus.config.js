// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const fs = require("fs");
const beautyConfig = require("./setting/setting-view/beauty.saurus.config.json");
const bsmodules = require("./src/lib/bsmodules");

class NavItem {
  constructor(type, docId, position, label) {
    this.type = type;
    this.docId = docId;
    this.position = position;
    this.label = label;
  }

  getNavItem() {
    return {
      type: this.type,
      docId: this.docId,
      position: this.position,
      label: this.label,
    };
  }
}

function getNavItemsObj() {
  const navItems = beautyConfig.navbar.items;
  let navItemsRepo = [];

  navItems.forEach((item) => {
    const navObj = new NavItem(
      item.type,
      item.name + "/" + item.name,
      item.position,
      item.name
    );
    navItemsRepo.push(navObj);
  });

  console.log(
    "sdfasdfsdf" +
      fs
        .readFileSync("./setting/setting-view/beauty.saurus.config.json")
        .toString()
  );
  //   console.log("navItemsRepo", navItemsRepo);
  //   console.log("navItems", navItems);
  return navItemsRepo;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: beautyConfig.meta.title,
  tagline: beautyConfig.meta.tagline,
  url: beautyConfig.meta.url,
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: beautyConfig.meta.favicon,
  organizationName: beautyConfig.meta.organizationName, // Usually your GitHub org/user name.
  projectName: beautyConfig.meta.projectName, // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/facebook/docusaurus/edit/main/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/edit/main/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: beautyConfig.navbar["title"],
        logo: {
          alt: beautyConfig.navbar["logo-alt"],
          src: beautyConfig.navbar["logo-image"],
        },
        items: getNavItemsObj(),
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/facebook/docusaurus",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
