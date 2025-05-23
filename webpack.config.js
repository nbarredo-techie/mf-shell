const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require('webpack'); // Import webpack

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
    externals: ['shared-ui'], // react and react-dom will be federated
    devServer: {
      hot: true, // Ensure HMR is enabled for webpack-dev-server
      port: 8080, // Set fixed port to 8080
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "mf_shell",
        filename: "remoteEntry.js",
        remotes: {
          root_config: "root_config@http://localhost:3000/remoteEntry.js",
        },
        shared: {
          ...defaultConfig.externals,
          react: {
            singleton: true,
            requiredVersion: false,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: false,
          },
          "react-dom/client": {
            singleton: true,
            requiredVersion: false,
          },
          "shared-ui": {
            singleton: true,
          }
        },
      }),
    ],
  });
};
