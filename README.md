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
