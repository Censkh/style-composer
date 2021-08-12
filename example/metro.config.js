const path = require("path");
const {
        applyConfigForLinkedDependencies,
      } = require("@carimus/metro-symlinked-deps");

module.exports = applyConfigForLinkedDependencies(
  {},
  {
    projectRoot           : __dirname,
    resolveNodeModulesAtRoot : true,
    additionalWatchFolders: [path.resolve(__dirname, "node_modules/style-composer")]
  },
);
