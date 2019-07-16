# workflow-setup-with-webpack

A custom workflow setup (NPM, Webpack (different loaders), Babel, Linters...) for a React project

## Workflow requirements

- Compile next-generation JavaScript features
- Handle JSX
- CSS Autoprefixing
- Support image imports
- Optimize code
- Linting

## 1. Set up version control with Git

`git init`  
Creates an empty Git repository

`git add .`  
Add all untracked files in the directory to the staging area

`git commit -m 'First commit of the project'`  
Create a first commit (snapshot of the project) using the files in the staging area

`git remote add orgin https://github.com/ppeelman/workflow-setup-with-webpack.git`  
Add a remote (remote Git repository):

- name: origin
- URL: https://github.com/ppeelman/workflow-setup-with-webpack.git

`git push --set-upstream origin master`  
Push the current branch (master) and set the remote (name: origin) as its upstream

## 2. Initialize NPM

`npm init`

This creates a 'package.json' file, which is a file that

- lists the packages your project depends on
- specifies versions of a package that your project can use using semantic versioning rules
- makes your build reproducible, and therefore easier to share with other developers

Documentation: https://docs.npmjs.com/creating-a-package-json-file

```
{
  "name": "workflow-setup-with-webpack",
  "version": "1.0.0",
  "description": "A custom workflow setup (NPM, Webpack (different loaders), Babel, Linters...) for a React project",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ppeelman/workflow-setup-with-webpack.git"
  },
  "keywords": [
    "workflow",
    "react"
  ],
  "author": "Philippe Peelman",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ppeelman/workflow-setup-with-webpack/issues"
  },
  "homepage": "https://github.com/ppeelman/workflow-setup-with-webpack#readme",
  "devDependencies": {
  },
  "dependencies": {
  }
}

```

## 3. Install webpack

`npm install --save-dev webpack webpack-cli webpack-dev-server`

- **webpack**: core module
- **webpack-cli**: webpack's command line interface (CLI)
- **webpack-dev-server**: serves a webpack app. Updates the browser on changes

## 4. Create a folder structure

```
mkdir src
cd src
echo '' > index.html
```

Create a new folder (src) and a new file (index.html) in that folder

`code index.html`  
Open 'index.html' in Visual Studio Code

`html:5`  
Use the Emmet abbreviation html:5 in Visual studio code to get a boilerplate HTML5 setup

`<div id="root"></div>` or `#root` (Emmet abbreviation)  
Within the body section, create a div with ID 'root' where the React application will be mounted to

```
mkdir assets
mkdir components
mkdir containers
echo '' > index.js
echo '' > index.css
echo '' > app.js
```

Create 3 more folders (assets, components, containers) and 3 more files (index.js, index.css, app.js)

`import './index.css'`
Within the index.js file, import the index.css file (containing some global styles for the project)

## 5. Creating a basic React project

A simple project using react-router, CSS Modules, images etc.
(see files in this project)

## 6. Installing React dependencies

`npm install --save react react-dom react-router-dom`

- **React**
- **React-DOM**
- **React-router-dom**: a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)

## 7. Install and configure Babel

Babel is a JavaScript compiler and is mainly used to compile ECMAScript 2015+ (ES6) code into a backwards compatible version of JavaScript in current and older browsers or environments.

`npm install --save-dev babel-loader @babel/core @babel/preset-react @babel/preset-env`

- **babel-loader**: loader for Webpack
- **@babel/core**: core module for Babel to work
- **@babel/preset-react**: React presets, incl. handling JSX
- **@babel/preset-env**: a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s).

`echo ''>.babelrc`

In the .babelrc file:

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": ["> 1%", "last 2 versions"]
          // Syntax to specify browsers: https://github.com/browserslist/browserslist
          //" > 1%": more than 1% of global market share
          // --- OR ---
          // "last 2 versions": the last 2 versions for each browser
        }
      }
    ],
    "@babel/preset-react"
  ]
}

**Be aware that your file(s) are UTF-8 encoded!** (I had this issue with my IDE for some reason...)
```

## 8. Adding CSS file support

`npm install --save-dev css-loader style-loader postcss-loader`

- **css-loader**: the css-loader interprets @import and url() like import/require() and will resolve them.
- **style-loader**: adds CSS to the DOM by injecting a <style> tag
- **postcss-loader**: loader for webpack to process CSS with PostCSS (to use eg. vendor prefixing)

## 9. Adding image support

`npm install --save-dev url-loader file-loader`

- **url-loader**: transforms files into base64 URIs.
- **file-loader**: the file-loader resolves import/require() on a file into a url and emits the file into the output directory.

## 10. Setting up the webpack config

Create a configuration file for webpack:
`webpack.config.js`

Documentation: https://webpack.js.org/concepts/configuration/  
All configuration options: https://webpack.js.org/configuration/

Contents of the file:

```
const path = require("path");
// Because Node.js is a standard Node.js CommonJS module,
// we can use the CommonJS module specification (eg. require)
// 'path' is a core Node.js module

const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  devtool: "cheap-module-eval-source-map", // enum
  // controls if and how source maps are generated
  // Documentation: https://webpack.js.org/configuration/devtool/
  // What are source maps? https://blog.teamtreehouse.com/introduction-source-maps

  entry: "./src/index.js",
  // An entry point indicates which module webpack should use to begin building out its internal dependency graph.
  // Webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

  output: {
    // The output property tells webpack where to emit the bundles it creates and how to name these files.

    path: path.resolve(__dirname, "dist"),
    // // must be an ABSOLUTE path, so we use __dirname: The directory name of the current module.

    filename: "bundle.js",
    // it is a convention to call this bundle.js, as it is bundled JavaScript code

    chunkFilename: "[id].js",
    // This option determines the name of non-entry chunk files. By default [id].js is used

    publicPath: ""
    // the url to the output directory resolved relative to the HTML page
  },
  resolve: {
    // These options change how modules are resolved.

    extensions: [".js", ".jsx"]
    // If no extension is defined, webpack will look for a file with these extensions (.js, .jsx)
  },
  module: {
    // These options determine how the different types of modules within a project will be treated
    // => everything that can be imported, eg. images, CSS, Sass, JavaScript
    rules: [
      {
        test: /\.js/,
        // A JavaScript regular expression to match a filename (incl. extension)
        // you use '\' to escape the '.' character because we are in a regular expression

        loader: "babel-loader",
        exclude: /node_modules/

        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include
      },
      {
        test: /\.css$/,
        // Regular expression: '$' matches end of input

        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]"
                // How should the classes be named?
                // NAME: name of the class we defined
                // LOCAL: module name (component name)
                // HASH: hash with base 64
              },
              // Enable CSS Modules !

              importLoaders: 1
              // Because we use another loader (postcss-loader) before 'css-loader', we need to let css-loader know by setting 'importLoaders' to 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")({})]
              // Documentation: https://webpack.js.org/loaders/postcss-loader/#autoprefixing
            }
          }
        ]
        // Loaders are applied from right to left (or bottom to top), so we we should write the loader that has to be applied first LAST
        // 1. Use postcss-loader to autoprefix the CSS
        // 2. use css-loader to understand CSS imports
        // 3. use style-loader to inject CSS code into the <style> tag in HTML file
      },
      {
        test: /\.(png|jpe?g|gif)/,
        loader: "url-loader?limit=8000&name=images/[name].[ext]"
        // This loader is using query parameters to configer the loader
        // Use the url-loader if the image size is under 8000 bytes,
        // else use the file-loader which copies the image to a folder (images/[name].[ext]) and provides an URL to use as a reference
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body"
    })
  ]
};

```

## 11. Add a NPM start script

```
"scripts": {
    "start": "webpack-dev-server"
  },
```

Compiles the project and initiates a dev webserver

## 12. Injecting the Script into the index.html file

`npm install -D html-webpack-plugin`

Making it possible to inject our bundled script into the HTML file

In the webpack.config.js file:

```
const HTMLWebpackPlugin = require("html-webpack-plugin");

...

plugins: [
    new HTMLWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body"
    })
  ]
}
```

## 13. Adding a production webpack configuration

###Copy the original 'webpack.config.js' file and rename the new file 'webpack.prod.config.js'

###Add a new plugin:

`npm install uglifyjs-webpack-plugin --save-dev`

```
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

...

  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
```

Documentation: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/

###Modify the NPM script 'build':

`npm install -D rimraf`
Install this CLI tool to delete entire folders

`"build": "rimraf dist && webpack --config webpack.prod.config.js --progress --profile --color"`
Delete first the dist folder and perform then a webpack compilation using the PROD config file
