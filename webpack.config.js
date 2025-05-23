const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  // Ensure webpackConfigEnv.isDev is correctly set based on argv.mode
  // This helps singleSpaDefaults configure HMR and output formats correctly for development
  const effectiveWebpackConfigEnv = {
    ...webpackConfigEnv,
    isDev: argv.mode === 'development',
  };

  const defaultConfig = singleSpaDefaults({
    orgName: "terraboost",
    projectName: "mf-shell",
    webpackConfigEnv: effectiveWebpackConfigEnv, // Use the corrected env
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: ['shared-ui', 'react', 'react-dom'], // Added react and react-dom
    devServer: {
      hot: true, // Ensure HMR is enabled for webpack-dev-server
    },
  });
};
