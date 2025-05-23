const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

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
    externals: ['shared-ui', 'react', 'react-dom', 'react-dom/client'], // Reverted externals
    devServer: {
      ...defaultConfig.devServer,
      hot: true,
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
      ],
    },
  });
};