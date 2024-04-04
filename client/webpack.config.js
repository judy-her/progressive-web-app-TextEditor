const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate HTML files
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main'],
        filename: 'index.html',
      }),
      // Generate a Web App Manifest
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App',
        description: 'Description of your app',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        crossorigin: 'use-credentials',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons'),
          },
        ],
      }),
      // Inject the service worker into the bundle
      new InjectManifest({
        swSrc: './src/sw.js',
        exclude: [/\.map$/, /manifest\.json$/],
      }),
    ],
    module: {
      rules: [
        // CSS loaders
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Babel loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};

// new HtmlWebpackPlugin() = module.exports = () => {
//   return {
//     mode: 'development',
//     entry: {
//       main: './src/js/index.js',
//       install: './src/js/install.js',
//     },
// output: {
//   filename: '[name].bundle.js',
//   path: path.resolve(__dirname, 'dist'),
// },
//     plugins: [],

//     module: {
//       rules: [],
//     },
//   };
// };
