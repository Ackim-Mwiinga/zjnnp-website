const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  // Set the mode to production for better optimization
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      process: require.resolve('process/browser'),
      util: require.resolve('util/'),
      url: require.resolve('url/'),
      assert: require.resolve('assert/'),
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib'),
    },
  },

  // Entry point for the application
  entry: './src/index.js',

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },

  // Optimization settings for production
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },

  // Module rules for handling different file types
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          }
        ]
      },
      // Keep existing rules below this
      {
        test: /\.(js|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader for transpiling
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Enable React and modern JavaScript
            plugins: ['react-refresh/babel'], // Add React Refresh for hot reloading
          },
        },
      },
      {
        test: /\.css$/i, // Match CSS files
        use: ['style-loader', 'css-loader'], // Use Style and CSS loaders
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Match image files
        type: 'asset/resource', // Handle them as assets
      },
    ],
  },

  // Plugins for additional functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use the HTML template
    }),
    new ReactRefreshWebpackPlugin(), // Enable React Refresh for hot reloading
  ],

  // DevServer configuration for live reloading and debugging
  devServer: {
    static: './dist', // Serve files from the dist directory
    hot: true, // Enable hot module replacement
    historyApiFallback: true, // Support React Router
    port: 3000, // Specify the port for the server
  },

  // Resolve extensions for imports
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
