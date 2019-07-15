# workflow-setup-with-webpack
A custom workflow setup (NPM, Webpack (different loaders), Babel, Linters...) for a React project

## Workflow requirements
* Compile next-generation JavaScript features
* Handle JSX
* CSS Autoprefixing
* Support image imports
* Optimize code
* Linting

## 1. Set up version control with Git
`git init`  
Creates an empty Git repository


`git add .`  
Add all untracked files in the directory to the staging area


`git commit -m 'First commit of the project'`  
Create a first commit (snapshot of the project) using the files in the staging area


`git remote add orgin https://github.com/ppeelman/workflow-setup-with-webpack.git`  
Add a remote (remote Git repository):
* name: origin
* URL: https://github.com/ppeelman/workflow-setup-with-webpack.git


`git push --set-upstream origin master`  
Push the current branch (master) and set the remote (name: origin) as its upstream



## 2. Initialize NPM
`npm init`

This creates a 'package.json' file, which is a file that

* lists the packages your project depends on
* specifies versions of a package that your project can use using semantic versioning rules
* makes your build reproducible, and therefore easier to share with other developers

Documentation: https://docs.npmjs.com/creating-a-package-json-file

## 3. Install webpack
`npm install --save-dev webpack webpack-dev-server`

## 4. Create a folder structure
~~~~
mkdir src
cd src
echo '' > index.html
~~~~
Create a new folder (src) and a new file (index.html) in that folder

`code index.html`  
Open 'index.html' in Visual Studio Code

`html:5`  
Use the Emmet abbreviation html:5 in Visual studio code to get a boilerplate HTML5 setup

`<div id="root"></div>` or `#root` (Emmet abbreviation)  
Within the body section, create a div with ID 'root' where are React application will be mounted to

~~~~
mkdir assets
mkdir components
mkdir containers
echo '' > index.js
echo '' > index.css
echo '' > app.js
~~~~  
Create 3 more folders (assets, components, containers) and 3 more files (index.js, index.css, app.js)

`import './index.css'`
Within the index.js file, import the index.css file (containing some global styles for the project)

## 5. Creating a basic React project
A simple project using react-router, CSS Modules, images etc.
(see files in this project)

## 6. Installing React dependencies
`npm install --save react react-dom react-router-dom`   
* React
* React-DOM
* React-router-dom   

## 7. Setting up the basic webpack config
Create a configuration file for webpack:
`webpack.config.js`

Documentation: https://webpack.js.org/concepts/configuration/
All configuration options: https://webpack.js.org/configuration/

Contents of the file:

~~~~
const path = require("path");
// Because Node.js is a standard Node.js CommonJS module,
// we can use the CommonJS module specification (eg. require)
// 'path' is a core Node.js module

module.exports = {
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
      }
    ]
  }
};

~~~~


## 8. Install and configure Babel
`npm install --save-dev babel-loader @babel/core @babel/preset-react @babel/preset-env`

Setting up a NPM 'start' script:


