const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve("index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  target: "node",
  externals: {
    bufferutil: "commonjs bufferutil",
    "utf-8-validate": "commonjs utf-8-validate",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
