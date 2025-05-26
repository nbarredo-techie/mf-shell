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
    // Define externals for UMD format (when outputSystemJS: false)
    externals: {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react",
        umd: "react"
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom",
        umd: "react-dom"
      },
      "shared-ui": {
        root: "SharedUI",
        commonjs2: "shared-ui",
        commonjs: "shared-ui",
        amd: "shared-ui",
        umd: "shared-ui"
      }
    },
  });
};
