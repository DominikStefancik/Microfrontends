const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const PORT = 8083;

const devConfig = {
  mode: "development",
  devServer: {
    port: PORT,
    historyApiFallback: {
      index: "/index.html",
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  output: {
    publicPath: `http://localhost:${PORT}/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./DashboardApp": "./src/bootstrap",
      },
      // all dependencies which are mentioned in the 'package.json' file will be shared
      // i.e. webpack makes sure that these dependencies are loaded exactly one time in the browser
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

// because the 'devConfig' is the second argument,
// the options from its object overwrite the options with the same name from the 'commonConfig' object
module.exports = merge(commonConfig, devConfig);
