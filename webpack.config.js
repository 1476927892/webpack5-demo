const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  // mode: "development",
  mode: "production",
  // devtool: "inline-source-map",
  // devServer: {
  //   contentBase: "./dist",
  // },
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "js/[contenthash][name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[contenthash][ext][query]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true, //移除空格
        removeComments: true, //去掉注释
      },
    }),
    //抽离css
    new MiniCssExtractPlugin({
      filename: "css/[contenthash][name].css",
    }),
  ],
  optimization: {
    // splitChunks: {
    //   chunks: "all",
    // },
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
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
      {
        test: /\.js$/,
        // 优先执行
        //  enforce: 'pre',

        enforce: "post", // 延后执行
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, "src"),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 1010,
  },
};
