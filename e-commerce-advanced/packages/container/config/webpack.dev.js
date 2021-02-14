const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const PORT = 8080;

const devConfig = {
  mode: "development",
  devServer: {
    port: PORT,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  output: {
    publicPath: `http://localhost:${PORT}/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        authentication: "authentication@http://localhost:8082/remoteEntry.js",
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
