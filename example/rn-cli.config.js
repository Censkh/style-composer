const path = require("path");

const specialModules = ["react", "react-native", "expo-font", "@babel/runtime"];
const extraNodeModules = specialModules.reduce((modules, module) => {
  modules[module] = path.resolve(__dirname, "node_modules/" + module);
  return modules;
}, {});

const blacklistRegexes = [
  /C:[\/\\]Users[\/\\]09jwa[\/\\]Documents[\/\\]style-composer[\/\\]node_modules[\/\\]react[\/\\].*/,
  /C:[\/\\]Users[\/\\]09jwa[\/\\]Documents[\/\\]style-composer[\/\\]node_modules[\/\\]react-native[\/\\].*/,
  /C:[\/\\]Users[\/\\]09jwa[\/\\]Documents[\/\\]style-composer[\/\\]node_modules[\/\\]expo-font[\/\\].*/,
  /C:[\/\\]Users[\/\\]09jwa[\/\\]Documents[\/\\]style-composer[\/\\]node_modules[\/\\]@babel\/runtime[\/\\].*/
];
const watchFolders = [
  path.resolve("C:\\Users\\09jwa\\Documents\\style-composer")
];

const metroVersion = require("metro/package.json").version;
const metroVersionComponents = metroVersion.match(/^(\d+)\.(\d+)\.(\d+)/);
if (metroVersionComponents[1] === "0" && parseInt(metroVersionComponents[2], 10) >= 43) {
  module.exports = {
    resolver: {
      extraNodeModules,
      blacklistRE: require("metro-config/src/defaults/blacklist")(blacklistRegexes)
    },
    watchFolders
  };
} else {
  module.exports = {
    extraNodeModules,
    getBlacklistRE : () => require("metro/src/blacklist")(blacklistRegexes),
    getProjectRoots: () => [path.resolve(__dirname)].concat(watchFolders)
  };
}


