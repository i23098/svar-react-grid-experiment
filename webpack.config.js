const path = require('path');
const rootReactJS = __dirname + "/src/react-js";

const webpack = require('webpack');

module.exports = env => ({
  entry: {
    index: [`${rootReactJS}/index.tsx`]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, env.outputDir)
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      react: path.resolve('node_modules/react') // https://github.com/facebook/react/issues/13991#issuecomment-435587809
    }
  },
  module: {
    rules: [{
      test: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/, // Exclude libraries in node_modules ...
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: 'defaults' }],
            ['@babel/preset-react'],
            ['@babel/preset-typescript']
          ]
        }
      }, {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }]
    }, {
      test: /\.(sass|scss|css)$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  mode: 'development',
  devtool: false,
  plugins: [new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor.js']
  })]
});
