module.exports = {
  title           : "Style Composer",
  tagline         : "The tagline of my site",
  url             : "https://your-docusaurus-test-site.com",
  baseUrl         : "/style-composer/",
  onBrokenLinks   : "throw",
  favicon         : "img/favicon.ico",
  organizationName: "Censkh", // Usually your GitHub org/user name.
  projectName     : "style-composer", // Usually your repo name.
  themeConfig     : {
    navbar: {
      title: "My Site",
      logo : {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to            : "docs/getting-started",
          activeBasePath: "docs",
          label         : "Docs",
          position      : "left",
        },
        {
          href    : "https://github.com/censkh/style-composer",
          label   : "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style    : "dark",
      links    : [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to   : "docs/getting-started",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href : "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href : "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href : "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href : "https://github.com/censkh/style-composer",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  themes          : [
    "@docusaurus/theme-live-codeblock",
  ],
  plugins         : ["docusaurus-plugin-sass", "docusaurus-plugin-react-native-web"],
  presets         : [
    [
      "@docusaurus/preset-classic",
      {
        docs : {
          path       : "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl    :
            "https://github.com/facebook/docusaurus/edit/master/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      },
    ],
  ],
};
