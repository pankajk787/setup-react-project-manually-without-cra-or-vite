// Load Node's built-in 'path' module to resolve file and folder paths
const path = require('path');

// Plugin to generate an HTML file and inject the bundled JavaScript into it
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Plugin to load environment variables from a .env file into your app
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Entry point — the main file where Webpack starts bundling
  entry: './src/index.js',

  // Output — where Webpack puts the final bundled files
  output: {
    // The filename for the bundle
    filename: 'bundle.js',

    // The output directory (absolute path)
    path: path.resolve(__dirname, 'dist'),

    // Clean the output directory before each build
    clean: true,
  },

  // Set the mode to development for better debugging and fast rebuilds
  mode: 'development',

  // Configure the development server
  devServer: {
    // Serve static files from the "dist" folder
    static: './dist',

    // Enable Hot Module Replacement (live updates in browser without full reload)
    hot: true,

    // Automatically open the app in the browser
    open: true,

    // Port to run the development server on
    port: 3002,
  },

  // Define how different types of modules (files) should be handled
  module: {
    rules: [
      {
        // Match all .css files
        test: /\.css$/i,

        // Apply these loaders in reverse order: css-loader first, then style-loader
        use: ['style-loader', 'css-loader'], // css-loader allows importing CSS into JS, style-loader injects styles into the DOM
      },
      {
        // Match both .js and .jsx files
        test: /\.jsx?$/,

        // Use Babel to transpile ES6+/JSX to plain JavaScript
        use: 'babel-loader',

        // Skip node_modules for performance
        exclude: /node_modules/,
      },
    ],
  },

  // Automatically resolve these file extensions when importing
  resolve: {
    extensions: ['.js', '.jsx'], // So you can write `import App from './App'` instead of './App.jsx'
  },

  // Add plugins to enhance the build process
  plugins: [
    // Generate an HTML file from a template and auto-inject the JS bundle
    new HtmlWebpackPlugin({
      template: './public/index.html', // Uses this HTML as a template
    }),

    // Load environment variables from a .env file into process.env
    new Dotenv(),
  ],
};
