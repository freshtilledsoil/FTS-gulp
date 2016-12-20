var path = require('path');    
var webpack = require('webpack');



var config =  {
  entry: {
    'app': './src/assets/js/app.js',
    'app.min': './src/assets/js/app.js',
  },
  // devtool: 'source-map',
  output: { filename: '[name].js' },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node-modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ]
};


if (process.env.NODE_ENV === 'production') {

  [].push.apply(config.plugins, [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false,
      minimize: true
    })
  ]);

}

module.exports = config;
