module.exports = {
  title           : "Test Site",
  tagline         : "A website for testing",
  url             : "https://your-docusaurus-test-site.com",
  baseUrl         : "/",
  projectName     : "test-site",
  organizationName: "facebook",
  favicon         : "img/favicon.ico",

  plugins: ["docusaurus-plugin-sass"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        blog : {
          path: "./src/blog",
          include: ["*.md"]
        },
        pages: {
          path: "./src/pages",
          include: ["*.md"]
        },
        docs : {
          path       : "../docs",
          sidebarPath: require.resolve("./sidebars.json"),
          editUrl:
            'https://github.com/facebook/create-react-app/edit/master/docusaurus/website',
          include: ["*.md"]
        },
        theme: {
          customCss: require.resolve("./src/stylesheet/custom.scss"),
        },
      },
    ],
  ],


  scripts: ["https://buttons.github.io/buttons.js"],
};
