module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer:{
    contentBase: './dist',
     hot: true,
  },
  entry: './main.js',
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
