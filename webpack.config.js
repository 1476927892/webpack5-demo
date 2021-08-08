const VueLoaderPlugin = require("vue-loader/lib/plugin-webpack5");
const path = require("path");
const EnvConfig = require("./webpack.env");

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : false,
  entry: {
    index: ["./src/index.js", "./src/index.html"],
  },
  output: {
    filename: "js/[contenthash][name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    ...EnvConfig.output,
  },
  plugins: [new VueLoaderPlugin(), ...EnvConfig.plugins],
  optimization: { ...EnvConfig.optimization },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      ...EnvConfig.rules,
    ],
  },
  target: "web",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 1010,
    hot: true,
  },
  externals: { ...EnvConfig.externals },
};
