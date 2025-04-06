# React Project Setup with Webpack and Babel - Without CRA
1. `npm init` - creates package.json file
2. `npm install react react-dom` - installs react and react-dom
3. `npm install --save-dev webpack webpack-cli webpack-dev-server` - installs webpack, webpack-cli and webpack-dev-server
   - **webpack** -
     A module bundler that takes all your JS, JSX, CSS, images, etc., and bundles them into a few optimized files.
     React apps are written in multiple files and modules.
     Webpack bundles them into one or more files (bundle.js) for the browser to consume.
   - **webpack-cli** -
     Command line interface for webpack - used to run webpack and its commands
   - **webpack-dev-server** -  
      Development server for webpack with live reloading and hot module replacement (HMR). - used to run webpack in development mode.
     - Serves your app at localhost:8080
     - Automatically rebuilds and reloads the app when files change.
     - Handles HMR so you don’t need to reload the browser manually.
4. `npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react` -
   install Babel and its tools so that your React code (which uses JSX and modern JavaScript) can be converted into plain JavaScript that all browsers understand

   - **@babel/core** -
     The heart of Babel — the compiler itself.
     - It doesn't do anything on its own.
     - Think of it as the "engine" that receives source code and applies transformations to it.
     - It needs presets or plugins to know how to transform the code.
   - **babel-loader** -
     A Webpack loader that lets you use Babel in your Webpack build process.

     - Webpack doesn’t understand JSX or new JavaScript features.
     - So we tell Webpack: “Hey, for every `.js` or `.jsx` file, use `babel-loader`.”
     - It passes those files to Babel for transformation.
     - Without this, Webpack will throw errors when it sees `JSX` or `import` statements.

   - **@babel/preset-env** -
     A preset that tells Babel: “Transform my code based on the target environments I care about (e.g., Chrome, Firefox, Safari).”
     What it does:
     - Converts ES6+ syntax (like let, const, arrow functions, optional chaining, etc.) into ES5.
     - Automatically includes only the necessary transforms (smart targeting).
   - **@babel/preset-react** -
     The preset that lets Babel understand JSX syntax used in React.
     Without this, Babel will crash when it sees:
     ```jsx
     const element = <h1>Hello</h1>; // JSX
     ```
     Because that’s not valid JavaScript — it needs to be converted into:
     ```jsx
     const element = React.createElement("h1", null, "Hello"); // JavaScript
     ```

5. `npm install --save-dev html-webpack-plugin`
   It's a Webpack plugin that generates an HTML file for your app and injects your JavaScript bundles into it automatically.
   Without this plugin, you'd have to manually:

   - Create your own index.html
   - Manually add a <script src="bundle.js"></script> tag
   - Update that tag every time the bundle filename changes (e.g., bundle.[hash].js for caching)
     That’s tedious and error-prone.

6. Setuup .babelrc file

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

.babelrc file is used to configure Babel
This tells Babel to convert:

- Modern JavaScript → ES5 (@babel/preset-env)
- JSX → JavaScript (@babel/preset-react)

7. Setup webpack.config.js file

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  devServer: {
    static: "./dist",
    hot: true, // Enable HMR
    open: true, // Automatically open in browser,
    port: 3002, // Custom port
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
```

8. Create App.jsx file

```jsx
import React from "react";
import "./App.css";
const App = () => {
  return (
    <main>
      <h1 className="hello">Hello, React without CRA!</h1>
    </main>
  );
};

export default App;
```
And and index.js file:
```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

9. Add below scripts to package.json

```json
"scripts": {
    "start": "webpack serve --config webpack.config.js",
    "build": "webpack --config webpack.config.js",
}
```

Then run `npm start` to start the dev server
The dev server will start at `localhost:8080`

10. To add CSS Support, we need to install
`npm install --save-dev css-loader style-loader`

And add below rules to webpack.config.js

```js
rules: [
  {
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.jsx?$/,
    use: "babel-loader",
    exclude: /node_modules/,
  },
];
```

11. To add the support to access environment variables, we need to install
`npm install --save-dev dotenv-webpack`

And add below code to webpack.config.js

```js
import Dotenv from 'dotenv-webpack';

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv(), // This injects your .env variables into the build
  ],
};
```
