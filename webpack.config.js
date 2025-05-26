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
    },    // Use single-spa defaults and add JSX runtime + shared-ui externals
    externals: [
      ...defaultConfig.externals,
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "shared-ui"
    ],
  });
};
