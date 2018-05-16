const path = require('path');

let extendedPath = path.resolve(__dirname, 'dist');
if (process.env.EXTERNAL_D3_C3) {
  extendedPath = `${extendedPath}/external_d3_c3/`;
}

module.exports = {
  entry: ['./lib/index.js'],

  target: process.env.TARGET ? `${process.env.TARGET}` : 'web',

  output: {
    path: extendedPath,
    filename: `keen-dataviz${
      process.env.OPTIMIZE_MINIMIZE ? '.min' : ''
    }.js`,
    library: `${!process.env.LIBRARY ? '' : process.env.LIBRARY}`,
    libraryTarget: 'umd',
  },

  module: {

    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'lib'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        loader: 'babel-loader',
      },

      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],

  },

  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.json', '.jsx'],
  },

  optimization: {
    minimize: !!process.env.OPTIMIZE_MINIMIZE,
  },

  devtool: 'source-map',

  context: __dirname,

  // stats: 'verbose',

  plugins: [
  ],

  mode: !process.env.ENV ? 'development' : process.env.ENV,

  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    open: true,
    inline: true,
    hot: false,
    watchContentBase: true,
  },

  externals: !process.env.EXTERNAL_D3_C3 ? {} : {
    c3: true,
    d3: true,
  },

};
