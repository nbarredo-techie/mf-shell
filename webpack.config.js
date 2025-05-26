const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "terraboost",
    projectName: "mf-shell",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    // Explicitly define externals, especially if outputSystemJS is false
    externals: {
      "react": "react",
      "react-dom": "react-dom",
      "shared-ui": "shared-ui"
    },
  });
};
