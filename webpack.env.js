const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
// const webpack = require("webpack");

// 开发配置
const dev = {
  output: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  optimization: {},
  rules: [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader", "postcss-loader"],
    },
    {
      test: /\.scss$/i,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
    },
    {
      test: /\.js$/,
      enforce: "post", // 延后执行
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, "src"),
      use: [
        {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        "eslint-loader",
      ],
    },
  ],
  externals: {},
};
// 生产配置
const pro = {
  output: {
    assetModuleFilename: "assets/[contenthash][ext][query]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true, //移除空格
        removeComments: true, // 去掉注释
      },
    }),
    //抽离css
    new MiniCssExtractPlugin({
      filename: "css/[contenthash][name].css",
    }),
    //开启gzip
    new CompressionPlugin({
      exclude: /node_modules/,
      threshold: 8192,
    }),
    //关联manifest
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, "dll/manifest.json"),
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // js 压缩
      new TerserPlugin({
        terserOptions: {
          compress: {
            // eslint-disable-next-line camelcase
            drop_console: true,
            // eslint-disable-next-line camelcase
            drop_debugger: true,
          },
        },
      }),
      // 压缩css
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
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
      test: /\.js$/,
      enforce: "post", // 延后执行
      exclude: /(node_modules|bower_components)/,
      include: path.join(__dirname, "src"),
      use: [
        "thread-loader",
        {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        "eslint-loader",
      ],
    },
  ],
  externals: {
    // vue: "vue",
  },
};
module.exports = process.env.NODE_ENV === "development" ? dev : pro;
