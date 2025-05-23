const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require('webpack'); // Import webpack
// Assuming mf-shell also has a package.json for its own dependencies
// const deps = require('./package.json').dependencies;

module.exports = (webpackConfigEnv, argv) => {
  const isLocal = webpackConfigEnv && (webpackConfigEnv.isLocal || webpackConfigEnv.isDev);
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
    outputSystemJS: false, // Recommended to be false for Module Federation
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: ['shared-ui'], // react, react-dom, react-dom/client are now federated
    devServer: {
      ...defaultConfig.devServer,
      hot: true,
      port: 8080,
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: "mf_shell",
        filename: "remoteEntry.js",
        remotes: {
          // Conditional remote URL
          root_config: "root_config@https://white-pond-0db5ebd10.6.azurestaticapps.net/remoteEntry.js",
        },
        exposes: {
          // If mf-shell exposes any modules, define them here
        },
        shared: { 
          react: {
            singleton: true,
            // requiredVersion: deps.react, // Ideally, specify version from mf-shell's package.json
            requiredVersion: false, // Or keep false if strictly relying on root_config's version
          },
          "react-dom": {
            singleton: true,
            // requiredVersion: deps["react-dom"],
            requiredVersion: false,
          },
          "react-dom/client": {
            singleton: true, 
            requiredVersion: false,
          }, 
        },
      }),
    ],
  });
};