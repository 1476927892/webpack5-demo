//注意注释部分不能同时使用
module.exports = {
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        // corejs: 3,
        corejs: false,
        regenerator: false,
      },
    ],
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        // useBuiltIns: false,
        corejs: {
          version: 3,
        },
        useBuiltIns: "usage", //按需加载
      },
    ],
  ],
};
