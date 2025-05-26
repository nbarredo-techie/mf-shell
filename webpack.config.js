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
    // Override the default externals configuration
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "react/jsx-runtime": "React",
      "react-dom/client": "ReactDOM",
      "shared-ui": "SharedUI"
    },
  });
};
