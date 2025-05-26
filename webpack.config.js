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
    experiments: {
      outputModule: true,
    },
    output: {
      library: {
        type: "module",
      },
      environment: {
        module: true,
      },
    },    // Configure externals for ES modules with import maps
    externals: {
      "react": "react",
      "react-dom": "react-dom", 
      "react/jsx-runtime": "react/jsx-runtime",
      "react/jsx-dev-runtime": "react/jsx-dev-runtime",
      "react-dom/client": "react-dom/client",
      "shared-ui": "shared-ui"
    }
  });
};
