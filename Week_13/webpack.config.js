const path = require('path')
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer:{
    contentBase: './dist',
     hot: true,
  },
  entry: { 
    main:'./main.js',
    'animation.demo':'./animation.demo.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'Yang.createElement',
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
