const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "conatiner",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      // all dependencies which are mentioned in the 'package.json' file will be shared
      // i.e. webpack makes sure that these dependencies are loaded exactly one time in the browser
      shared: packageJson.dependencies,
    }),
  ],
};

// because the 'devConfig' is the second argument,
// the options from its object overwrite the options with the same name from the 'commonConfig' object
module.exports = merge(commonConfig, devConfig);
