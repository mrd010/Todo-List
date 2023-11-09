const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../dist"),
    },
    watchFiles: ["src/*.html"],
    open: true,
    compress: true,
    hot: "only",
    liveReload: false,
    historyApiFallback: true,
  },
});
