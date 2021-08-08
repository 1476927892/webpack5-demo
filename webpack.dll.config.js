const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    vue: ["vue"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dll"),
    library: "[name][hash]",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name][hash]",
      path: path.resolve(__dirname, "dll/manifest.json"),
    }),
  ],
  mode: "production",
};
