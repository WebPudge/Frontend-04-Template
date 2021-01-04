const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: { 
    main:'./src/main.js',
  },
  resolve:{
    extensions:['.js','.vue'],//这几个后缀名的文件后缀可以省略不写
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['@babel/preset-env']
          },
        },
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/*.html", to: "[name].[ext]" },
      ],
    }),
  ]
};
