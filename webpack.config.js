var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

// const devWebpack = {
//   mode: 'development',
//   entry: path.join(APP_PATH, 'index.js'),
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'main.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   },
//   plugins: []
// };

// const buildWebpack = {
//   mode: 'production',
//   entry: path.join(APP_PATH, 'index.js'),
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'main.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ExtractTextPlugin.extract({
//           fallback: 'style-loader',
//           use: ['css-loader']
//         })
//       }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin({
//       filename: '[name].css'
//     })
//   ]
// }

// module.exports = buildWebpack;

module.exports = {
  mode: TARGET === 'build' ? 'production' : 'development',
  entry: path.join(APP_PATH, 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: TARGET === 'build'
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
          : ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: TARGET === 'build'
    ? [
      new ExtractTextPlugin({
        filename: '[name].css'
      })
    ]
    : []
}