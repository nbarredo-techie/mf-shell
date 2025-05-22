const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/main.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'mf-shell.js',
      library: {
        // name: '@mf/shell', // Not typically needed for type: 'module'
        type: 'module', // Output as ES Module
      },
      publicPath: '',
      uniqueName: 'mfShell', // Helps avoid conflicts in webpack runtime
    },
    experiments: {
      outputModule: true, // Required for outputting ESM
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Add other loaders for images, fonts, etc., if needed
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    externalsType: 'module', // Treat externals as ES modules
    externals: {
      // These are dependencies expected to be provided by the root application (import map)
      'react': 'react',
      'react-dom': 'react-dom',
      'single-spa': 'single-spa',
      'shared-ui': 'shared-ui', 
      // Add any other shared microfrontends or libraries
      // Example for other @mf modules:
      // /^@mf\/.*$/: (context, request, callback) => callback(null, request),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html', // Path to your template index.html
        inject: 'body',
      }),
      // Add other plugins if needed (e.g., MiniCssExtractPlugin for production CSS)
    ],
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      port: 5174, // Different port from Vite to avoid conflict
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true, // For single-page applications
      hot: true,
    },
    // Optimization settings for production if needed
    // optimization: {
    //   minimize: isProduction,
    // },
  };
};
