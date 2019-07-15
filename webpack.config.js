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
  }
};
